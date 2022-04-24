import { array, either, option, record, string } from "fp-ts";
import { constant, flow, pipe } from "fp-ts/lib/function";
import { contramap } from "fp-ts/lib/Ord";
import { createContext, useContext, useReducer } from "react";
import { ImageFile } from "../types/ImageFile";
import { Issue } from "../types/Issue";
import { RedditSecret, TwitterSecret } from "../types/Secret";
import { Subreddit } from "../types/Subreddit";
import {
  Action,
  advance,
  advancePage,
  enterRedditSecret,
  enterSubreddit,
  enterTwitterSecret,
  pickedFiles,
  pickFiles,
  publishedToReddit,
  publishedToTwitter,
  publishToReddit,
  publishToTwitter,
  redditSecret,
  subredditName,
  twitterSecret,
} from "./action";
import { decode, report } from "./errorReporter";
import {
  credentials,
  CredentialsPage,
  credentialsPage,
  filePickerPage,
  filePickers,
  Model,
  preview,
  previewPage,
  publishDiscord,
  publishDiscordPage,
  publishReddit,
  publishRedditPage,
  publishTwitter,
  publishTwitterPage,
  welcome,
  welcomePage,
} from "./model";

export function reducer(model: Model, action: Action): Model {
  function evaluateCredentials(model: CredentialsPage) {
    return pipe(
      // validate the secret keys
      {
        reddit: RedditSecret.decode(model.redditKey),
        twitter: TwitterSecret.decode(model.twitterKey),
      },
      record.sequence(either.Applicative),
      either.mapLeft(report),

      // return the current page with the error message if there is one
      either.mapLeft((error): Model => {
        return { ...model, error };
      })
    );
  }

  // Generic AdvancePageAction handlers
  if (action.type === advance && model.type === welcome) {
    return credentialsPage();
  }

  if (action.type === advance && model.type === credentials) {
    return pipe(
      evaluateCredentials(model),

      // if the keys are valid, go to the next page
      either.map(filePickerPage),

      either.toUnion
    );
  }

  if (action.type === advance && model.type === preview) {
    return publishRedditPage(model.context);
  }

  if (action.type === advance && model.type === publishDiscord) {
    return welcomePage();
  }

  // PickFilesAction handler
  if (action.type === pickFiles && model.type === filePickers) {
    const issue = decode(Issue)(action.config);

    // Create a sorting function that sorts by the file's name
    const byName = pipe(
      string.Ord,
      contramap((f: File) => f.name)
    );

    const images = pipe(
      // Find all image files in the list of the chosen files
      action.files,
      array.map(decode(ImageFile)),
      // Filter out any image files that failed to decode
      array.filterMap(option.fromEither),
      // Then sort the list of image files by name
      array.sort(byName)
    );

    return pipe(
      issue,
      either.map((issue) => ({ ...model.context, issue, images })),
      either.map(previewPage),
      either.mapLeft((error) => ({ ...model, error })),
      either.toUnion
    );
  }

  // InputAction handlers that update the model with the new input data
  if (action.type === enterRedditSecret && model.type === credentials) {
    const next = { ...model, redditKey: action.content, error: undefined };
    return pipe(
      evaluateCredentials(next),
      either.map(constant(next)),
      either.toUnion
    );
  }

  if (action.type === enterTwitterSecret && model.type === credentials) {
    const next = { ...model, twitterKey: action.content, error: undefined };
    return pipe(
      evaluateCredentials(next),
      either.map(constant(next)),
      either.toUnion
    );
  }

  if (action.type === enterSubreddit && model.type === publishReddit) {
    const next = { ...model, subreddit: action.content, error: undefined };

    return pipe(
      // Validate the subreddit name
      action.content,
      decode(Subreddit),

      // Then return the new model
      either.map(() => next),
      either.mapLeft((error) => ({ ...next, error })),
      either.toUnion
    );
  }

  // Publishing handlers
  if (action.type === publishedToReddit && model.type == publishReddit) {
    return publishTwitterPage({ ...model.context, redditUrl: action.url });
  }

  if (action.type === publishedToTwitter && model.type == publishTwitter) {
    return publishDiscordPage({ ...model.context, twitterUrl: action.url });
  }

  return model;
}

export type App = ReturnType<typeof useAppReducer>;

export function useAppReducer() {
  const [state, dispatch] = useReducer(reducer, welcomePage());

  return {
    state,
    withRedditSecret: flow(redditSecret, dispatch),
    withTwitterSecret: flow(twitterSecret, dispatch),
    withSubreddit: flow(subredditName, dispatch),
    pickFiles: flow(pickedFiles, dispatch),
    publishToReddit: flow(publishToReddit, dispatch),
    publishToTwitter: flow(publishToTwitter, dispatch),
    next: flow(advancePage, dispatch),
  };
}

export const context = createContext<App>(undefined!!);

export function useApp() {
  return useContext(context);
}
