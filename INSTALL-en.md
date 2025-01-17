# Installation

English | [日本語](INSTALL-ja.md)

## Environment variable

Static contents around the front end are created by executing the `yarn build` command after giving environment variables.
When changing the information of the connection destination of API, .env must be rewritten appropriately.

.env:

| Environment variable                 | Explanation                                                       |
| ------------------------------------ | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_PATH`          | Base path for API URLs (デフォルト: 同一オリジン "")              |
| `NEXT_PUBLIC_BASE_PATH`              | Base path for static content URLs (デフォルト: "")                |
| `NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL` | 学習活動の送信間隔 (秒) (デフォルト: `10`)                        |
| `NEXT_PUBLIC_VIDEO_MAX_HEIGHT`       | max-height for scroll-following video player (デフォルト: `40vh`) |
| `NEXT_PUBLIC_NO_EMBED`               | Do not allow anyone to embed. Disabled by default.                |

## Build front-ends

### Prerequisites

As of 2021-09-03, confirm the build in the following environment.

- Node.js v16.8.0
- Yarn 1.22.11

### Build

Execute the following command.

```sh
yarn && yarn build
```

### Storybook

To confirm some UI on the browser, execute the following command after executing `yarn`.

```sh
yarn storybook
```

## Customization

### Logo

Customize the logo image which layout in AppBar be able by overwrite the `./public/logo.png` .

Consider the logo image will be resized in a range of width 100px / height 48px with keeping aspect ratio.

### Favicon

Customize the favicon image which layout in tab be able by overwrite the `./public/favicon.ico` .

The sizes are as follows.

- 16px × 16px
- 32px × 32px
- 48px × 48px

### Video player

Some video player has scroll-follow and has been applied height limitation by css.

To change value of the height limitation, Set value of [<length> Data Type](https://developer.mozilla.org/en-US/docs/Web/CSS/Length) to `NEXT_PUBLIC_VIDEO_MAX_HEGIHT`.

To disable the height limitation, Set "unset" to `NEXT_PUBLIC_VIDEO_MAX_HEIGHT`.
