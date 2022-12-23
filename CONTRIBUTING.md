# Contributing to Advent of Code Surveys

Please get in touch (an issue, or on Twitter) before undertaking big things.
I have not had the time to set up a proper process or guidelines for contributions.
Further instructions forthcoming.

## CSV source files

The `.csv` files are in the `.gitignore` pattern.
Reason for this is that I want to prevent as much as possible to have things like inappropriate content or accidental PII in the results.
If you want to develop against real data, here's the format with a sample row of my own data from 2022:

```csv
"Timestamp","Have/will you get at least one ⭐ in Advent of Code 2022?","Did you participate in 2015? (first edition, ""star-powered machine"" theme)","Did you participate in 2016? (""Easter Bunny HQ"" theme)","Did you participate in 2017? (""naughty or nice list"" theme)","Did you participate in 2018? (""time travel"" theme)","Did you participate in 2019? (""spacecraft"" theme)","Did you participate in 2020? (""tropical island vacation"" theme)","Did you participate in 2021? (""ocean"" theme)","Primary language(s) for AoC 2022?","Primary IDE(s) for AoC 2022?","Primary OS for AoC 2022?","Do you go for the *global* leaderboard?","How many *private* leaderboards are you active in?","I participate in AoC..."
"2022/11/30 10:39:41 PM GMT+1","Yes, (mostly) in december 2022","No","No","Yes, (mostly) in december 2017","Yes, (mostly) in december 2018","Yes, (mostly) in december 2019","Yes, but (mostly) only later on","Yes, (mostly) in december 2021","JavaScript;Kotlin","Visual Studio Code","ChromeOS","Yes, but probably won't make it any day","3","for the fun;for the challenge;for Santa!;to make or top the leaderboards;to learn to code;to learn an additional language;to improve my skills"
```

## Developing locally

Use your favorite dev server (e.g. `npm install -g serve` and `serve ./`) to serve the root folder.
Then open e.g. `http://localhost:3000/src` and things should just work.

## Quality Control

This is a pet project.
There are no automated tests of any sort at the moment.
Make sure if you submit suggestions you've tested it manually.

## Creating a release

Run `build.ps1` (only tested on Windows, at the time of writing) to completely recreate the `docs` folder.
This folder is served from the `main` branch, by GitHub pages.
You can test-run a build by serving `./docs` with your test server.

The `main` branch on GitHub will serve that `docs` folder on GitHub pages automatically.
