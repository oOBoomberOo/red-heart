import { ImageFile } from "../types/ImageFile";
import { Issue } from "../types/Issue";
import { Secret } from "../types/Secret";

export const welcome: unique symbol = Symbol();
export const credentials: unique symbol = Symbol();
export const filePickers: unique symbol = Symbol();
export const preview: unique symbol = Symbol();
export const publishReddit: unique symbol = Symbol();
export const publishTwitter: unique symbol = Symbol();
export const publishDiscord: unique symbol = Symbol();

export type WelcomePage = {
  readonly type: typeof welcome;
};

export type CredentialsPage = {
  readonly type: typeof credentials;
  redditKey: string;
  twitterKey: string;
  error?: string;
};

export type FilePickerPage = {
  readonly type: typeof filePickers;
  files: File[];
  error?: string;
  context: {
    reddit: Secret;
    twitter: Secret;
  };
};

export type PreviewPage = {
  readonly type: typeof preview;
  context: {
    reddit: Secret;
    twitter: Secret;
    images: ImageFile[];
    issue: Issue;
  };
};

export type PublishRedditPage = {
  readonly type: typeof publishReddit;
  subreddit: string;
  error?: string;
  context: {
    reddit: Secret;
    twitter: Secret;
    images: ImageFile[];
    issue: Issue;
  };
};

export type PublishTwitterPage = {
  readonly type: typeof publishTwitter;
  context: {
    reddit: Secret;
    twitter: Secret;
    images: ImageFile[];
    issue: Issue;
    redditUrl: string;
  };
};

export type PublishDiscordPage = {
  readonly type: typeof publishDiscord;
  context: {
    reddit: Secret;
    twitter: Secret;
    images: ImageFile[];
    issue: Issue;
    redditUrl: string;
    twitterUrl: string;
  };
};

export type Model =
  | WelcomePage
  | CredentialsPage
  | FilePickerPage
  | PreviewPage
  | PublishRedditPage
  | PublishTwitterPage
  | PublishDiscordPage;

export function welcomePage(): WelcomePage {
  return { type: welcome };
}

export function credentialsPage(): CredentialsPage {
  return {
    type: credentials,
    redditKey: "",
    twitterKey: "",
    error: `Please enter your API keys`,
  };
}

export function filePickerPage(
  context: FilePickerPage["context"],
  files: File[] = []
): FilePickerPage {
  return { type: filePickers, files, context };
}

export function previewPage(context: PreviewPage["context"]): PreviewPage {
  return { type: preview, context };
}

export function publishRedditPage(
  context: PublishRedditPage["context"],
  subreddit: string = "Holonews"
): PublishRedditPage {
  return { type: publishReddit, subreddit: subreddit, context };
}

export function publishTwitterPage(
  context: PublishTwitterPage["context"]
): PublishTwitterPage {
  return { type: publishTwitter, context };
}

export function publishDiscordPage(
  context: PublishDiscordPage["context"]
): PublishDiscordPage {
  return { type: publishDiscord, context };
}
