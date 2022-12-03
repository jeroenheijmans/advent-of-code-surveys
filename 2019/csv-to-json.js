import fs from 'fs';
import { parse } from 'csv-parse';

const options = {
  delimiter: ',',
  escape: '"',
  columns: true,
};

const raw = fs.readFileSync('2019/results-raw.csv', { encoding: 'utf8' });

const columns = {
  'Timestamp': {
    header: 'Timestamp',
    postProcess: x => (new Date(x)).toISOString(),
  },
  'Have/will you get at least one ⭐ in Advent of Code 2019?': {
    header: 'Participates_in_2019',
    answers: {
      'No': 'No',
      'Yes, (mostly) in december 2019': 'Dec',
      'Yes, (mostly) after 2019': 'Later',
    }
  },
  'Did you participate in 2015?': {
    header: 'Participates_in_2015',
    answers: {
      'Yes, (mostly) in december 2015': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'No': 'No',
    },
  },
  'Did you participate in 2016?': {
    header: 'Participates_in_2016',
    answers: {
      'Yes, (mostly) in december 2016': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'No': 'No',
    },
  },
  'Did you participate in 2017?': {
    header: 'Participates_in_2017',
    answers: {
      'Yes, (mostly) in december 2017': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'No': 'No',
    },
  },
  'Did you participate in 2018?': {
    header: 'Participates_in_2018',
    answers: {
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'No': 'No',
    },
  },
  'Primary language(s) for AoC 2019?': {
    header: 'Languages',
     multi: true,
     answers: {
      "25 different languages": "Different language every day",
      "25 Languages challenge": "Different language every day",
      "A different language every day": "Different language every day",
      "different language each day": "Different language every day",
      "Each day a different language": "Different language every day",
      "awk": "AWK",
      "Awk": "AWK",
      "brainfuck": "Brainfuck",
      "Clojure": "Clojure/ClojureScript",
      "common lisp": "Common Lisp",
      "custom": "Custom Language",
      "Custom language": "Custom Language",
      "dart": "Dart",
      "Dart!": "Dart",
      "elm": "Elm",
      "Frink ( https://frinklang.org/ )": "Frink",
      "FORTRAN": "Fortran",
      "Gamemaker Language": "GameMaker",
      "GameMaker Language": "GameMaker",
      "google spreadsheet": "Google Sheets",
      "Intcode": "IntCode",
      "Janet (janet-lang-org)": "Janet",
      "Idris2": "Idris",
      "Intersystems IRIS object script": "Intersystems Objectscript",
      "JQ": "jq",
      "minecraft commands": "Minecraft",
      "minecraft function": "Minecraft",
      "my own": "My own language!",
      "my own programming language!": "My own language!",
      "My own programming language!": "My own language!",
      "my own scripting language (unpublished)": "My own language!",
      "own scripting language": "My own language!",
      "nim": "Nim",
      "N/A": "n/a",
      "ocaml": "OCaml",
      "Ocaml": "OCaml",
      "OCamL": "OCaml",
      "pen": "Pen & Paper",
      "Pen": "Pen & Paper",
      "Paper probably": "Pen & Paper",
      "Perl": "Perl 5", // The years where this was asked on the survey it clearly meant Perl 5
      "Perl 6": "Raku",
      "Perl 6 / Raku": "Raku",
      "PeopleCode for 2018": "PeopleCode",
      "pony": "Pony",
      "Ponylang": "Pony",
      "processing": "Processing",
      "q/kdb+": "Q/KDB+",
      "REXX": "Rexx",
      "rockstar": "Rockstar",
      "scratch": "Scratch",
      "scheme": "Scheme",
      "SCHEME": "Scheme",
      "smalltalk": "Smalltalk",
      "SmileBasic for 3DS": "SmileBASIC",
      "The 3DS game: SmileBasic 4": "SmileBASIC",
      'Some kind of SCHEME dialect': 'SCHEME dialect',
      'Some kind of SCHEME dialect, probably racket': 'Scheme dialect',
      'Squeam (a Lisp dialect I made up)': 'Squeam (own Lisp dialect)',
      'Racket/Scheme': 'Scheme/Racket', // So that they sort together
      'probably racket': 'Racket',
      'tcl': 'Tcl',
      'Tcl for each + a different language each day': 'Tcl',
      'TCL should come in the list': 'Tcl;Each day a different language',
      'Typescript': 'TypeScript',
      "q": "Q",
      "Unreal Engine 4": "Unreal Engine",
      "Unreal Engine 4 (Blueprints)": "Unreal Engine",
      "V (vlang.io)": "V",
      "vim": "Vim",
      "Vim keystrokes": "Vim",
      "Vim Script": "Vim",
      "vim": "Vim",
      'Wolfram Language / Mathematica': 'Wolfram;Mathematica',
      'WolfLang': 'Wolfram',
      "zig": "Zig",
     },
     preProcess: answer => {
       return answer.replace(',', ';').replace(' and ', ';');
     },
     postProcess: answer => {
       if (!answer) return '';
       if (answer.length > 40) return answer.substring(0, 32) + '...';
       return answer;
     }
  },
  'Primary IDE(s) for AoC 2019?': {
    header: 'IDEs',
    multi: true,
    answers: {
      'Application Designer for 2018': 'Application Designer',
      'BBedit': 'BBEdit',
      'Browser': 'Browser (Console)',
      'browser': 'Browser (Console)',
      'browser console': 'Browser (Console)',
      'Browser Console': 'Browser (Console)',
      'Browser\'s console': 'Browser (Console)',
      'Console in web browser': 'Browser (Console)',
      'chrome browser console': 'Chrome',
      'chrome console': 'Chrome',
      'Chrome console': 'Chrome',
      'Chrome debugger': 'Chrome',
      'Chrome dev console (:': 'Chrome',
      'chrome dev tools': 'Chrome',
      'Chrome dev tools': 'Chrome',
      'Chrome Developer Tools': 'Chrome',
      'Chrome DevTools': 'Chrome',
      'Chrome DevTools...': 'Chrome',
      'CodeBlocks': 'Code::Blocks',
      'Codeblocks': 'Code::Blocks',
      'Code Blocks': 'Code::Blocks',
      'code::blocks': 'Code::Blocks',
      'CodeBlocks and Dr. Java': 'Code::Blocks',
      'clion': 'CLion',
      'Clion': 'CLion',
      'Codepen': 'CodePen',
      'codepen.io': 'CodePen',
      'Coderunner': 'CodeRunner',
      'dataspell': 'DataSpell',
      'Dr. Racket': 'DrRacket',
      'drracket': 'DrRacket',
      'Drracket': 'DrRacket',
      'Dyalog APL': 'Dyalog RIDE',
      'Dyalog APL IDE': 'Dyalog RIDE',
      'Dyalog RIDE': 'Dyalog RIDE',
      'Ride': 'Dyalog RIDE',
      'RIDE': 'Dyalog RIDE',
      'emacs': 'Emacs',
      'Firefox Console': 'Firefox',
      'Firefox Developer Tools': 'Firefox',
      'geany': 'Geany',
      'gedit + console': 'Gedit',
      'gedit': 'Gedit',
      "google colabs": "Google Colab",
      "Colab": "Google Colab",
      "Google colab": "Google Colab",
      "Google CoLab": "Google Colab",
      "Google Collaborate": "Google Colab",
      'Goland': 'GoLand',
      'google sheets': 'Google Sheets',
      'Google Sheets in Chrome Browser': 'Google Sheets',
      'helix': 'Helix',
      'Jetbrains Rider': 'Rider',
      'JetBrains Rider': 'Rider',
      'Jupyter Notebook': 'IPython / Jupyter',
      'Jupyter': 'IPython / Jupyter',
      "jsfiddle": "JSFiddle",
      "kakoune": "Kakoune",
      "Kate": "KATE",
      "kilo": "Kilo",
      "LabVIEW 2018": "LabVIEW",
      "Lazarus/Free Pascal": "Lazarus",
      "micro": "Micro",
      "micro: https://micro-editor.github.io/": "Micro",
      "my own": "My own editor",
      "own text editor": "My own editor",
      "no IDE": "No IDE",
      "None": "No IDE",
      "nano": "Nano",
      "Notepad.exe": "Notepad",
      "ObservableHQ": "Observable",
      "observablehq.com": "Observable",
      "Onivim2": "OniVim2",
      "PowerShell CLI": "PowerShell",
      "Powershell ISE": "PowerShell",
      "PowerShell ISE": "PowerShell",
      "Processing ide": "Processing",
      "Processing IDE": "Processing",
      "Pen and Paper probably": "Pen & Paper",
      "Pharo Smalltalk": "Pharo",
      'pycharm': 'PyCharm',
      'Pycharm': 'PyCharm',
      'pythonista': 'Pythonista',
      'Pythonista 3 on iPad Pro': 'Pythonista',
      'Python IDLE': 'IDLE',
      'python IDLE': 'IDLE',
      'python idle': 'IDLE',
      'qt creator': 'Qt',
      'Qt Creator': 'Qt',
      'QT Creator': 'Qt',
      'qtcreator': 'Qt',
      'QtCreator': 'Qt',
      'SAPIEN Powershell Studio': 'Sapien PowerShell Studio',
      'Idle': 'IDLE',
      'idle': 'IDLE',
      'iDLE': 'IDLE',
      'Swift playground iOS': 'Swift playground',
      'Swift Playgrounds for iPad': 'Swift playground',
      'Swift Playgrounds on iPad/Mac': 'Swift playground',
      'Terminal emulator': 'Terminal',
      'tio.run': 'TIO.run',
      'Linqpad': 'LINQPad',
      'LinqPad': 'LINQPad',
      'LinqPAD': 'LINQPad',
      'MATLAB': 'Matlab',
      'matlab': 'Matlab',
      'matlab?': 'Matlab',
      "neovim": "Neovim",
      "NeoVim": "Neovim",
      "Replit": "Repl.it",
      "repl.it": "Repl.it",
      "Vscode neovim": "Neovim",
      'vim and a shell': 'Vim',
      'Visual Studio Code': 'VS Code',
      "Specifially VSCodium": "VSCodium",
      "VS Codium": "VSCodium",
      "vscodium": "VSCodium",
      "VSCodium": "VSCodium",
      "Visual Studio Codium": "VSCodium",
      "VSCodium (marked VSCode too for simplicity)": "VSCodium",
      "webstorm": "WebStorm",
      "Webstorm": "WebStorm",
      "Mathematica Notebook": "Mathematica",
      "Wolfram Mathematica": "Mathematica",
      "Wolfram Notebook": "Mathematica",
      'Wolfram Notebook / Mathematica Notebook': 'Wolfram Notebook;Mathematica Notebook',
      "ZeroBrane Studio": "ZeroBrane",
    },
    preProcess: answer => {
      return answer.replace(',', ';');
    },
    postProcess: answer => {
      if (!answer) return '';
      if (answer.length > 40) return answer.substring(0, 32) + '...';
      return answer;
    }
  },
  'Primary OS for AoC 2019?': {
    header: 'OS',
    answers: {
      'Chrome OS': 'ChromeOS',
      'Chromebook': 'ChromeOS',
      'ChromeOS (technically a linux distro, but not really)': 'ChromeOS',
      'Chrome os (chromebook) ': 'ChromeOS',

      'Linux on Chrome OS': 'ChromeOS (Linux)',

      'openbsd': 'OpenBSD',

      'Running a linux command line VM in windows...  Mark that how you want.': 'Linux', // Well don't mind if I do!
      'windows for development, commodore 64 (emulator) for running the programs': 'Windows', // So sorry for stripping this cool answer (just to make the data viz look okay)! Will promise next year to include "Cool remarks about your setup?" question for this shizzl...
      'Windows / Linux 50/50': 'Combi of Windows/Linux',
      'Windows+Linux': 'Combi of Windows/Linux',
      'Windows + Linux': 'Combi of Windows/Linux',
      'Windows and Linux': 'Combi of Windows/Linux',
      'Combi of Windows/Linux': 'Combi of Windows/Linux',
      '50/50 Linux and Windows': 'Combi of Windows/Linux',

      // A bunch of WSL variants:
      'Windows + Linux Subsystem': 'WSL',
      'Windows + Windows Subsystem for Linux': 'WSL',
      'Windows including WSL': 'WSL',
      'WSL ubuntu': 'WSL',
      'Windows Subsystem for Linux': 'WSL',
      'Windows with WSL': 'WSL',
      'wsl': 'WSL',
      'WSL2': 'WSL',
      'WSL 2.0': 'WSL',
      'WSL in windows': 'WSL',
      'Wsl in Windows': 'WSL',
      'WSL on Windows. So both lol': 'WSL',
      'WSL-Ubuntu': 'WSL',
      'WSL on Windows (Windows/Linux combo)': 'WSL',
      'Windows with WSL2': 'WSL',
      'WSL (ubuntu)': 'WSL',
      'Ubuntu WSL2 on Windows 11': 'WSL',
      'Windows (WSL)': 'WSL',
      'WSL in Windows': 'WSL',
      'Wsl in Windows ': 'WSL',
      'Windows Subsystem for Linux (w/ Ubuntu 20.04)': 'WSL',
      'Windows 10 using WSL to run programs': 'WSL',
      'Ubuntu in WSL2 on windows': 'WSL',
      'WSL 2': 'WSL',
      'Windows + WSL2': 'WSL',
      'Windows + WSL': 'WSL',
      'Windows Subsystem for Linux + Debian': 'WSL',
      'Windows/WSL2': 'WSL',
      'WSL2 on Windows10': 'WSL',
      'WSL2 Ubuntu, so both Windows and Linux? idk': 'WSL',
      'WSL2': 'WSL',
      'WSL2 (I\'m not sure whether it counts as Windows or Linux)': 'WSL',
      'Using WSL (so Windows). Ideally Linux.': 'WSL',
      'Windows Subsystem for Linux (Ubuntu 20)': 'WSL',
      'Windows + Ubuntu via WSL': 'WSL',
      'Windows running Linux through the WSL? So, is that both? If not, put me down for Windows.': 'WSL',

      'Ipad os': 'iPad OS',
      'IPadOS': 'iPad OS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
      'both Windows & macOS': 'Combi of Windows/macOS',
      'Windows and MacOS': 'Combi of Windows/macOS',
      'ios': 'iOS',
      'Linux or Chrome OS': 'Combi of Linux/ChromeOS',
      '': '(Blank)',
    },
  },
  'Do you go for the *global* leaderboard?': {
    header: 'Global_Leaderboard_Participation',
    answers: {
      'Yes, and I have a shot some/most days': 'Yes, I will likely get points',
      'Yes, and I might get on once or maybe twice': 'Yes, I might get points',
      'Yes, but probably won\'t make it any day': 'Yes, but no points expected',
      'No, my timezone makes that problematic': 'No, timezone is problematic',
      'No, too stressful': 'No, too stressful',
      'No, not interested': 'No, not interested',
      'Prefer not to say': 'Prefer not to say',
      '': '',
    },
  },
  'How many *private* leaderboards are you active in?': {
    header: 'Private_Leaderboard_Count',
    answers: {
      '5 or more': '5+',
    },
  },
  'I participate in AoC...': {
    header: 'Reason_for_participating',
    multi: true,
    answers: {
      'for the fun': 'for fun',
      'for the challenge': 'for a challenge',
      'to make or top the leaderboards': 'for leaderboards',
      'to learn to code': 'learn to code',
      'to learn an additional language': 'learn new language',
      'to improve my skills': 'improve skills',
      'to add to my resumé': 'add to resumé',
      'because I\'m forced to participate': 'forced to participate',
      '(prefer not to say)': 'prefer not to say',
    },
    preProcess: answer => {
      if (/\S+@\w+\.\w+/.test(answer)) return "<anonymized>"; // answers with e-mail addresses I'd rather anonimize
      return answer;
    },
  },
};

function callback(err, records) {
  let id = 100001;
  const result = records.map(record => {
    var item = { Id: id++ };
    Object.getOwnPropertyNames(record)
      .forEach(prop => {
        const info = columns[prop];
        const newProp = typeof info === 'string' ? columns[prop] : columns[prop].header;
        const preProcess = info.preProcess || (a => a.trim());
        const postProcess = info.postProcess || (a => a.trim());

        item[newProp] = info.hasOwnProperty('answers') ? info.answers[record[prop]] || record[prop] : record[prop];

        item[newProp] = preProcess(item[newProp]);

        if (info.multi) {
          item[newProp] = item[newProp]
            .split(';')
            .map(x => x.trim())
            .map(x => info.hasOwnProperty('answers') ? info.answers[x] || x : x)
            .map(x => x.trim())
            .map(x => postProcess(x))
            .filter(x => !!x && x.length > 0);
        } else {
          item[newProp] = postProcess(item[newProp].trim());
        }
      });
    return item;
  });

  // console.log(result);
  
  console.log("Records:", result.length);
  console.log("Distinct languages:", new Set(result.map(r => r.Languages).flat()).size);
  console.log("Distinct IDEs:", new Set(result.map(r => r.IDEs).flat()).size);

  fs.writeFileSync('2019/results-sanitzed.json', JSON.stringify(result, null, 2), { encoding: 'utf8' });
}

parse(raw, options, callback);
