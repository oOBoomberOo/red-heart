export const enterRedditSecret: unique symbol = Symbol();
export const enterTwitterSecret: unique symbol = Symbol();
export const pickFiles: unique symbol = Symbol();
export const enterSubreddit: unique symbol = Symbol();
export const publishedToReddit: unique symbol = Symbol();
export const publishedToTwitter: unique symbol = Symbol();
export const advance: unique symbol = Symbol();

type EnterRedditSecretAction = {
  readonly type: typeof enterRedditSecret;
  content: string;
};

type EnterTwitterSecretAction = {
  readonly type: typeof enterTwitterSecret;
  content: string;
};

type PickFilesAction = {
  readonly type: typeof pickFiles;
  files: File[];
  config: string;
};

type EnterSubredditNameAction = {
  readonly type: typeof enterSubreddit;
  content: string;
};

type PublishRedditAction = {
  readonly type: typeof publishedToReddit;
  url: string;
};

type PublishTwitterAction = {
  readonly type: typeof publishedToTwitter;
  url: string;
};

type AdvancePageAction = { readonly type: typeof advance };

export type Action =
  | EnterRedditSecretAction
  | EnterTwitterSecretAction
  | PickFilesAction
  | EnterSubredditNameAction
  | PublishRedditAction
  | PublishTwitterAction
  | AdvancePageAction;

export function redditSecret(content: string): EnterRedditSecretAction {
  return {
    type: enterRedditSecret,
    content,
  };
}

export function twitterSecret(content: string): EnterTwitterSecretAction {
  return {
    type: enterTwitterSecret,
    content,
  };
}

export function subredditName(content: string): EnterSubredditNameAction {
  return {
    type: enterSubreddit,
    content,
  };
}

export function pickedFiles(files: File[], config: string): PickFilesAction {
  return {
    type: pickFiles,
    files,
    config,
  };
}

export function publishToReddit(url: string): PublishRedditAction {
  return {
    type: publishedToReddit,
    url,
  };
}

export function publishToTwitter(url: string): PublishTwitterAction {
  return {
    type: publishedToTwitter,
    url,
  };
}

export function advancePage(): AdvancePageAction {
  return {
    type: advance,
  };
}
