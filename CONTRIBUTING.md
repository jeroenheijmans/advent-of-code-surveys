# Contributing to Advent of Code Surveys

Please get in touch (an issue, or on Twitter) before undertaking big things.
I have not had the time to set up a proper process or guidelines for contributions.
Further instructions forthcoming.

## Developing locally

Use your favorite dev server (e.g. `npm install -g serve` and `serve ./`) to serve the root folder.
Then open e.g. `http://localhost:3000/src` and things should just work.

## Creating a release

Run `build.ps1` (only tested on Windows, at the time of writing) to completely recreate the `docs` folder.
This folder is served from the `main` branch, by GitHub pages.
You can test-run a build by serving `./docs` with your test server.
