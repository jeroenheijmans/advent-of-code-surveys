import fs from 'fs';

export const csvOptions = {
  delimiter: ',',
  escape: '"',
  columns: true,
};

const columns = {
  'Timestamp': {
    header: 'Timestamp',
    postProcess: x => (new Date(x)).toISOString(),
  },

  ///////////////////////////////////
  // Variants pre-2022:
  'Have/will you get at least one ⭐ in Advent of Code 2018?': {
    header: 'Participates_in_2018',
    answers: {
      'No': 'No',
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, (mostly) after 2018': 'Later',
    }
  },
  'Have/will you get at least one ⭐ in Advent of Code 2019?': {
    header: 'Participates_in_2019',
    answers: {
      'No': 'No',
      'Yes, (mostly) in december 2019': 'Dec',
      'Yes, (mostly) after 2019': 'Later',
    }
  },
  'Have/will you get at least one ⭐ in Advent of Code 2020?': {
    header: 'Participates_in_2020',
    answers: {
      'No': 'No',
      'Yes, (mostly) in december 2020': 'Dec',
      'Yes, (mostly) after 2020': 'Later',
    }
  },
  'Have/will you get at least one ⭐ in Advent of Code 2021?': {
    header: 'Participates_in_2021',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2021': 'Dec',
      'Yes, (mostly) after 2021': 'Later',
    }
  },
  ///////////////////
  'Did you participate in 2015?': {
    header: 'Participates_in_2015',
    answers: {
      'Yes, (mostly) in december 2015': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'No': 'No',
    },
  },
  'Did you participate in 2015? (first edition)': {
    header: 'Participates_in_2015',
    answers: {
      'Yes, (mostly) in december 2015': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2016?': {
    header: 'Participates_in_2016',
    answers: {
      'Yes, (mostly) in december 2016': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2017?': {
    header: 'Participates_in_2017',
    answers: {
      'Yes, (mostly) in december 2017': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2018?': {
    header: 'Participates_in_2018',
    answers: {
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2019?': {
    header: 'Participates_in_2019',
    answers: {
      'Yes, (mostly) in december 2019': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2020?': {
    header: 'Participates_in_2020',
    answers: {
      'Yes, (mostly) in december 2020': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },

  /////////////////////////////////
  // 2022 and beyond:
  'Have/will you get at least one ⭐ in Advent of Code 2022?': {
    header: 'Participates_in_2022',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2022': 'Dec',
      'Yes, (mostly) after 2022': 'Later',
    }
  },
  'Did you participate in 2015? (first edition, "star-powered machine" theme)': {
    header: 'Participates_in_2015',
    answers: {
      'Yes, (mostly) in december 2015': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2016? ("Easter Bunny HQ" theme)': {
    header: 'Participates_in_2016',
    answers: {
      'Yes, (mostly) in december 2016': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2017? ("naughty or nice list" theme)': {
    header: 'Participates_in_2017',
    answers: {
      'Yes, (mostly) in december 2017': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2018? ("time travel" theme)': {
    header: 'Participates_in_2018',
    answers: {
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2019? ("spacecraft" theme)': {
    header: 'Participates_in_2019',
    answers: {
      'Yes, (mostly) in december 2019': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2020? ("tropical island vacation" theme)': {
    header: 'Participates_in_2020',
    answers: {
      'Yes, (mostly) in december 2020': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },
  'Did you participate in 2021? ("ocean" theme)': {
    header: 'Participates_in_2021',
    answers: {
      'Yes, (mostly) in december 2021': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
    },
  },

  ////////////////////////////////////
  // Shared between years:
  'Primary language(s) for AoC {YEAR}?': {
    header: 'Languages',
     multi: true,
     answers: {
      "awk": "AWK",
      "Awk": "AWK",
      "Basic": "BASIC",
      "bqn": "BQN",
      "brainfuck": "Brainfuck",
      "Clojure": "Clojure/ClojureScript",
      "common lisp": "Common Lisp",
      "Custom language": "Custom Language",
      "custom": "Custom Language",
      "Dart!": "Dart",
      "dart": "Dart",
      "25 different languages": "Different language every day",
      "25 Languages challenge": "Different language every day",
      "A different language every day, chosen on that day.": "Different language every day",
      "A different language every day": "Different language every day",
      "different language each day": "Different language every day",
      "Each day a different language": "Different language every day",
      "New language every day": "Different language every day",
      "one day, one lang": "Different language every day",
      "One Language per day": "Different language every day",
      "Trying to do a different language every day, haven't decided what languages": "Different language every day",
      "elm": "Elm",
      "emojiC": "Emojicode",
      "emojicode": "Emojicode",
      "FORTRAN": "Fortran",
      "Frink ( https://frinklang.org/ )": "Frink",
      "Gamemaker Language": "GameMaker",
      "GameMaker Language": "GameMaker",
      "google spreadsheet": "Google Sheets",
      "Idris2": "Idris",
      "Intcode": "IntCode",
      "Intersystems IRIS object script": "Intersystems Objectscript",
      "Janet (janet-lang-org)": "Janet",
      "JQ": "jq",
      "k": "K",
      "minecraft commands": "Minecraft",
      "minecraft function": "Minecraft",
      "my own programming language!": "My own language!",
      "My own programming language!": "My own language!",
      "My own programming language": "My own language!",
      "my own scripting language (unpublished)": "My own language!",
      "my own, unpublished language": "My own language!",
      "my own": "My own language!",
      "own scripting language": "My own language!",
      "N/A": "n/a",
      "nim": "Nim",
      "ocaml": "OCaml",
      "Ocaml": "OCaml",
      "OCamL": "OCaml",
      "Pen and Paper probably": "Pen & Paper",
      "pen": "Pen & Paper",
      "Pen": "Pen & Paper",
      "PeopleCode for 2018": "PeopleCode",
      "Perl": "Perl 5", // The years where this was asked on the survey it clearly meant Perl 5
      "pony": "Pony",
      "Ponylang": "Pony",
      "processing": "Processing",
      "q": "Q",
      "Kdb+ / Q": "Q/KDB+",
      "q/kdb+": "Q/KDB+",
      "probably racket": "Racket",
      "Racket/Scheme": "Racket",
      "Scheme/Racket": "Racket",
      "Perl 6 / Raku": "Raku",
      "Perl 6": "Raku",
      "REXX": "Rexx",
      "rockstar": "Rockstar",
      "Some kind of SCHEME dialect, probably racket": "Scheme dialect",
      "Some kind of SCHEME dialect": "SCHEME dialect",
      "scheme": "Scheme",
      "SCHEME": "Scheme",
      "scratch": "Scratch",
      "smalltalk": "Smalltalk",
      "SmileBasic for 3DS": "SmileBASIC",
      "The 3DS game: SmileBasic 4": "SmileBASIC",
      "Squeak Smalltalk IDE": "Squeak",
      "Squeam (a Lisp dialect I made up)": "Squeam (own Lisp dialect)",
      "TCL should come in the list": "Tcl;Each day a different language",
      "Tcl for each + a different language each day": "Tcl",
      "tcl": "Tcl",
      "TCL": "Tcl",
      "Typescript": "TypeScript",
      "Unreal Engine 4 (Blueprints)": "Unreal Engine",
      "Unreal Engine 4": "Unreal Engine",
      "V (vlang.io)": "V",
      "Vim keystrokes": "Vim",
      "Vim Script": "Vim",
      "vim": "Vim",
      "vim": "Vim",
      "Wolfram Language / Mathematica": "Wolfram;Mathematica",
      "WolfLang": "Wolfram",
      "zig": "Zig",
     },
     preProcess: answer => {
       // Manually fixing some cases is dumb, but still scalable currently
       // so let's not try and be too smart about it. In the spirit of AoC:
       answer = answer.replace("Ada;D, Nim", "Ada;D;Nim");
       answer = answer.replace("also, Befunge-93, CMake, Idris, OCaml, and others TBD", "Befunge-93;CMake;Idris;OCaml");
       answer = answer.replace("APL, BQN, K, Lil", "APL;BQN;K;Lil");
       answer = answer.replace("APL, BQN", "APL;BQN");
       answer = answer.replace("APL, GFORTH", "APL;GFORTH");
       answer = answer.replace("APL, Logo", "APL;Logo");
       answer = answer.replace("APL;BQN, K, Lil", "APL;BQN;K;Lil");
       answer = answer.replace("BASIC, Pascal, Smalltalk, REXX, TCL, SAIL, Groovy", "BASIC;Pascal;Smalltalk;REXX;TCL;SAIL;Groovy");
       answer = answer.replace("BQN, Idris2", "BQN;Idris2");
       answer = answer.replace("bqn, smalltalk", "bqn;smalltalk");
       answer = answer.replace("bqn, smalltalk", "bqn;smalltalk");
       answer = answer.replace("dc, Smalltalk", "dc;Smalltalk");
       answer = answer.replace("emojiC, portaLANG, BQN", "emojiC;portaLANG;BQN");
       answer = answer.replace("Factor, Red, QB64", "Factor;Red;QB64");
       answer = answer.replace("fennel, hy", "Fennel;hy");
       answer = answer.replace("Forth, BASIC", "Forth;BASIC");
       answer = answer.replace("google spreadsheet, and emacs", "Google Sheets;Emacs");
       answer = answer.replace("Haxe,Pascal,Carbon,Jakt,Vale,Coq,LDPL,Haxe", "Haxe;Pascal;Carbon;Jakt;Vale;Coq;LDPL;Haxe");
       answer = answer.replace("jq, terraform, dhall", "jq;terraform;dhall");
       answer = answer.replace("k and q", "k;q");
       answer = answer.replace("lex,yacc", "lex,yacc");
       answer = answer.replace("Lisp, Awk", "Lisp;Awk");
       answer = answer.replace("Ocaml, Pony", "Ocaml;Pony");
       answer = answer.replace("Odin, Elm", "Odin;Elm");
       answer = answer.replace("Picat, Clean", "Picat;Clean");
       answer = answer.replace("sed, awk", "sed;awk");
       answer = answer.replace("Smalltalk, dc", "Smalltalk;dc");
       answer = answer.replace("Tailspin, Dart", "Tailspin;Dart");
       answer = answer.replace("vim and brainfuck", "vim;brainfuck");
       answer = answer.replace("zig, GNU Smalltalk, OCaml, Turing, Dart", "zig;GNU Smalltalk;OCaml;Turing;Dart");

       if (answer.includes(' and ')) {
         console.warn("  => DANGER! Language with 'and':", answer);
       }
       if (answer.includes(', ')) {
         console.warn("  => DANGER! Language with ', ':", answer);
       }

       return answer.trim();
     },
     postProcess: answer => {
       if (!answer) return '';
       if (answer.length > 280) return answer.substring(0, 270) + '...';
       return answer;
     }
  },
  'Primary IDE(s) for AoC {YEAR}?': {
    header: 'IDEs',
    multi: true,
    answers: {
      "Application Designer for 2018": "Application Designer",
      "BBedit": "BBEdit",

      "browser console": "Browser (Console)",
      "Browser Console": "Browser (Console)",
      "browser": "Browser (Console)",
      "Browser": "Browser (Console)",
      "Browser\"s console": "Browser (Console)",
      "Chrome/Firefox console (direct in webpage)": "Browser (Console)",
      "console in browser": "Browser (Console)",
      "Console in web browser": "Browser (Console)",

      "chrome browser console": "Chrome",
      "chrome console": "Chrome",
      "Chrome console": "Chrome",
      "Chrome debugger": "Chrome",
      "Chrome dev console (:": "Chrome",
      "chrome dev tools": "Chrome",
      "Chrome dev tools": "Chrome",
      "Chrome Developer Tools": "Chrome",
      "Chrome DevTools...": "Chrome",
      "Chrome DevTools": "Chrome",
      "Google Chrome Console": "Chrome",

      "clion": "CLion",
      "Clion": "CLion",
      
      "Code Blocks": "Code::Blocks",
      "code::blocks": "Code::Blocks",
      "CodeBlocks and Dr. Java": "Code::Blocks",
      "Codeblocks": "Code::Blocks",
      "CodeBlocks": "Code::Blocks",
      
      "codepen.io": "CodePen",
      "Codepen": "CodePen",
      "Coderunner": "CodeRunner",
      "Comma IDE": "Comma",
      "dataspell": "DataSpell",
      "Dataspell": "DataSpell",
      "Dr. Racket": "DrRacket",
      "drracket": "DrRacket",
      "Drracket": "DrRacket",

      "Dyalog APL IDE": "Dyalog RIDE",
      "Dyalog APL": "Dyalog RIDE",
      "Dyalog RIDE": "Dyalog RIDE",
      "Ride": "Dyalog RIDE",
      "RIDE": "Dyalog RIDE",

      "emacs": "Emacs",

      "Devtools (Firefox)": "Firefox",
      "Firefox Console": "Firefox",
      "Firefox Developer Tools": "Firefox",

      "GameMaker Studio 2": "GameMaker",
      "geany": "Geany",
      "gedit + console": "Gedit",
      "gedit": "Gedit",
      "Goland": "GoLand",

      "Colab": "Google Colab",
      "Google colab": "Google Colab",
      "Google CoLab": "Google Colab",
      "Google Colaboratory": "Google Colab",
      "google colabs": "Google Colab",
      "Google Collaborate": "Google Colab",

      "Google Sheets in Chrome Browser": "Google Sheets",
      "google sheets": "Google Sheets",

      "Helix (https://helix-editor.com/)": "Helix",
      "Helix editor": "Helix",
      "helix": "Helix",
      "https://github.com/helix-editor/helix": "Helix",

      "idle": "IDLE",
      "iDLE": "IDLE",
      "Idle": "IDLE",
      "python idle": "IDLE",
      "python IDLE": "IDLE",
      "Python IDLE": "IDLE",

      "Jupyter Notebook": "IPython / Jupyter",
      "jupyter": "IPython / Jupyter",
      "Jupyter": "IPython / Jupyter",

      "jdoodle.com": "JDoodle",
      "JDoodle.com": "JDoodle",
      "jqt": "JQT",
      "Jqt": "JQT",
      "jsfiddle": "JSFiddle",
      "JsFiddle": "JSFiddle",
      "kakoune": "Kakoune",
      "Kate": "KATE",
      "Studio for kdb+": "KDB Studio",
      "kilo": "Kilo",
      "https://play.kotlinlang.org/": "Kotlin Playground",
      "LabVIEW 2018": "LabVIEW",
      "Lazarus/Free Pascal": "Lazarus",
      "lapce": "Lapce",

      "Linqpad": "LINQPad",
      "LinqPad": "LINQPad",
      "LinqPAD": "LINQPad",

      "Mathematica Notebook": "Mathematica",
      "Wolfram Mathematica": "Mathematica",
      "Wolfram Notebook": "Mathematica",

      "matlab?": "Matlab",
      "matlab": "Matlab",
      "MATLAB": "Matlab",

      "micro: https://micro-editor.github.io/": "Micro",
      "micro": "Micro",
      "my own": "My own editor",
      "own text editor": "My own editor",
      "nano": "Nano",

      "neovim": "Neovim",
      "NeoVim": "Neovim",
      "Vscode neovim": "Neovim",

      "no IDE, just a shell": "No IDE",
      "no IDE": "No IDE",
      "None": "No IDE",

      "Notepad.exe": "Notepad",

      "https://observablehq.com": "Observable",
      "https://observablehq.com/": "Observable",
      "observablehq.com": "Observable",
      "ObservableHQ": "Observable",

      "Onivim2": "OniVim2",
      "https://www.onlinegdb.com/": "OnlineGDB",
      "https://www.onlinegdb.com/online_c++_compiler": "OnlineGDB",
      "Online GDB": "OnlineGDB",
      "Nova": "Panic Nova",
      "Pen and Paper probably": "Pen & Paper",
      "Pharo Smalltalk": "Pharo",

      "PowerShell CLI": "PowerShell",
      "Powershell ISE": "PowerShell",
      "PowerShell ISE": "PowerShell",
      
      "Processing ide": "Processing",
      "Processing IDE": "Processing",
      "pycharm": "PyCharm",
      "Pycharm": "PyCharm",
      "Pythonista 3 on iPad Pro": "Pythonista",
      "pythonista": "Pythonista",

      "qt creator": "Qt",
      "Qt Creator": "Qt",
      "QT Creator": "Qt",
      "qtcreator": "Qt",
      "QtCreator": "Qt",

      "repl.it": "Repl.it",
      "Replit": "Repl.it",
      "Jetbrains Rider": "Rider",
      "JetBrains Rider": "Rider",
      "Roblox Studio (yes i actually used it)": "Roblox Studio",
      "SAPIEN Powershell Studio": "Sapien PowerShell Studio",
      "spacemacs": "Spacemacs",

      "Anaconda/spyder": "Spyder",
      "Spyder, included in anaconda python3 distributio": "Spyder",
      "Spyder, included in anaconda python3 distribution": "Spyder",

      "StackBlitz Web Editor": "StackBlitz",

      "Swift playground iOS": "Swift playground",
      "Swift Playgrounds for iPad": "Swift playground",
      "Swift Playgrounds on iPad/Mac": "Swift playground",

      "Terminal emulator": "Terminal",
      "tio.run": "TIO.run",
      "Unreal Engine 4 Blueprint Graph": "Unreal Engine",
      "Unreal Engine 4": "Unreal Engine",
      "vim and a shell": "Vim",
      "Visual Studio Code": "VS Code",

      "Codium": "VSCodium",
      "Specifially VSCodium": "VSCodium",
      "Visual Studio Codium": "VSCodium",
      "VS Codium": "VSCodium",
      "VSCodium (marked VSCode too for simplicity)": "VSCodium",
      "vscodium": "VSCodium",
      "VSCodium": "VSCodium",

      "webstorm": "WebStorm",
      "Webstorm": "WebStorm",
      "Wing 101": "Wing",
      "Wing IDE": "Wing",
      "Wolfram Notebook / Mathematica Notebook": "Wolfram Notebook;Mathematica Notebook",
      "ZeroBrane Studio": "ZeroBrane",
    },
    preProcess: answer => {
      // Manually fixing some cases is dumb, but still scalable currently
      // so let's not try and be too smart about it. In the spirit of AoC:
      answer = answer.replace("Browser Console, Node REPL", "Browser Console;Node REPL");
      answer = answer.replace("CLion, Chrome DevTools", "CLion;Chrome DevTools");
      answer = answer.replace("https://pythontutor.com, https://www.online-python.com/, https://regex101.com/, and Python's own compiler", "https://pythontutor.com;https://www.online-python.com/;https://regex101.com/;Python's own compiler");
      answer = answer.replace("JDoodle, Vista TN3270 Terminal", "JDoodle;Vista TN3270 Terminal");
      answer = answer.replace("JSFiddle, CodePen", "JSFiddle;CodePen");
      answer = answer.replace("MATLAB, Spyder", "MATLAB;Spyder");
      answer = answer.replace("NEdit, QPython", "NEdit;QPython");
      answer = answer.replace("nvim, geany", "nvim;geany");
      answer = answer.replace("Qt, gedit + console", "Qt;gedit + console");
      answer = answer.replace("Spacemacs, drracket", "Spacemacs;drracket");

      if (answer.includes(', ')) {
        console.warn("  => DANGER! IDE with ', ':", answer);
      }

      return answer;
    },
    postProcess: answer => {
      if (!answer) return '';
      if (answer.length > 280) return answer.substring(0, 270) + '...';
      return answer;
    }
  },
  'Primary OS for AoC {YEAR}?': {
    header: 'OS',
    answers: {
      'Chrome os (chromebook) ': 'ChromeOS',
      'Chrome OS': 'ChromeOS',
      'Chromebook': 'ChromeOS',
      'ChromeOS (technically a linux distro, but not really)': 'ChromeOS',

      'Linux on Chrome OS': 'ChromeOS (Linux)',

      'openbsd': 'OpenBSD',

      '50/50 Linux and Windows': 'Combi of Windows/Linux',
      'Combi of Windows/Linux': 'Combi of Windows/Linux',
      'Running a linux command line VM in windows...  Mark that how you want.': 'Linux', // Well don't mind if I do!
      'Windows / Linux 50/50': 'Combi of Windows/Linux',
      'Windows + Linux': 'Combi of Windows/Linux',
      'Windows and Linux': 'Combi of Windows/Linux',
      'windows for development, commodore 64 (emulator) for running the programs': 'Windows', // So sorry for stripping this cool answer (just to make the data viz look okay)! Will promise next year to include "Cool remarks about your setup?" question for this shizzl...
      'Windows+Linux': 'Combi of Windows/Linux',

      // A bunch of WSL variants:
      'Ubuntu in WSL2 on windows': 'WSL',
      'Ubuntu WSL2 on Windows 11': 'WSL',
      'Using WSL (so Windows). Ideally Linux.': 'WSL',
      'Windows (WSL)': 'WSL',
      'Windows + Linux Subsystem': 'WSL',
      'Windows + Ubuntu via WSL': 'WSL',
      'Windows + Windows Subsystem for Linux': 'WSL',
      'Windows + WSL': 'WSL',
      'Windows + WSL2': 'WSL',
      'Windows 10 using WSL to run programs': 'WSL',
      'Windows and WSL': 'WSL',
      'Windows including WSL': 'WSL',
      'Windows running Linux through the WSL? So, is that both? If not, put me down for Windows.': 'WSL',
      'Windows Subsystem for Linux (Ubuntu 20)': 'WSL',
      'Windows Subsystem for Linux (w/ Ubuntu 20.04)': 'WSL',
      'Windows Subsystem for Linux (WSL)': 'WSL',
      'Windows Subsystem for Linux + Debian': 'WSL',
      'Windows Subsystem for Linux': 'WSL',
      'Windows with Linux Subsystem': 'WSL',
      'Windows with WSL': 'WSL',
      'Windows with WSL2': 'WSL',
      'Windows/WSL2': 'WSL',
      'WLS2': 'WSL',
      'WSL (Ubuntu terminal, windows vs code)': 'WSL',
      'WSL (ubuntu)': 'WSL',
      'WSL 2.0': 'WSL',
      'WSL 2': 'WSL',
      'Wsl in Windows ': 'WSL',
      'Wsl in Windows': 'WSL',
      'WSL in windows': 'WSL',
      'WSL in Windows': 'WSL',
      'WSL on Windows': 'WSL',
      'WSL on Windows (Windows/Linux combo)': 'WSL',
      'WSL on Windows. So both lol': 'WSL',
      'WSL ubuntu': 'WSL',
      'WSL-Ubuntu': 'WSL',
      'wsl': 'WSL',
      'WSL2 (I\'m not sure whether it counts as Windows or Linux)': 'WSL',
      'WSL2 on Windows10': 'WSL',
      'WSL2 Ubuntu, so both Windows and Linux? idk': 'WSL',
      'WSL2 Ubuntu': 'WSL',
      'WSL2': 'WSL',
      'WSL2': 'WSL',

      'Ipad os': 'iPad OS',
      'IPadOS': 'iPad OS',

      'both Windows & macOS': 'Combi of Windows/macOS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'mac and windows': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
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

export const getParseCallback = (year) => function callback(err, records) {
  console.log('------------------------------');

  let id = 100001;
  const result = records.map(record => {
    var item = { Id: id++ };
    Object.getOwnPropertyNames(record)
      .forEach(prop => {
        const key = prop.replace(`for AoC ${year}`, "for AoC {YEAR}");
        const info = columns[key];

        if (!info) {
          throw new Error("Could not find column for " + prop)
        }

        const newProp = typeof info === 'string' ? info : info.header;
        const preProcess = info.preProcess || (a => a.trim());
        const postProcess = info.postProcess || (a => a.trim());

        item[newProp] = info.hasOwnProperty('answers') ? info.answers[record[prop]] || record[prop] : record[prop];

        item[newProp] = preProcess(item[newProp]).trim();

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

  console.log("Parsed year", year);
  console.log("Records:", result.length);
  console.log("Distinct languages:", new Set(result.map(r => r.Languages).flat()).size);
  console.log("Distinct IDEs:", new Set(result.map(r => r.IDEs).flat()).size);
  console.log();

  fs.writeFileSync(`${year}/results-sanitized.json`, JSON.stringify(result, null, 2), { encoding: 'utf8' });
};