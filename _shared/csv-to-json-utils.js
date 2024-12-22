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
  // Year-specific questions, 2023 and beyond:
  'Anno 2024, in context of Advent of Code: your thoughts on AI and LLM\'s?': {
    header: 'Year_specific_2024_AI_and_LLM_thoughts',
    multi: true,
    answers: {
      "Ugh, not again with the AI related stuff... just let me help Santa and be on my way!!!": "Not again with AI",
      "I don't know what \"AI and/or LLM stuff\" means": "Don't know what AI/LLM means",
      "I will use (almost) *zero* AI and/or LLM stuff": "Uses zero AI",
      "I will use *some* AI and/or LLM stuff": "Uses some AI",
      "I will *extensively* use AI and/or LLM stuff": "Uses lots of AI",
      "It's *great* that puzzles are being solved with help from AI and/or LLM stuff": "AI is great for AoC",
      "It's *good* that puzzles are being solved with help from AI and/or LLM stuff": "AI is good for AoC",
      "It's *bad* that puzzles are being solved with help from AI and/or LLM stuff": "AI is bad for AoC",
      "It's *horrible* that puzzles are being solved with help from AI and/or LLM stuff": "AI is horrible for AoC",
      "I submit to our new AI overlords: happy to become part of the new world order!!!": "Submitted to our new AI overlords",
    },
    preProcess: answer => {
      if (/\S+@\w+\.\w+/.test(answer)) return "<anonymized>"; // answers with e-mail addresses I'd rather anonimize
      answer = answer.replace(/http:\/\/memegen\/\S*/g, "")
      return answer;
    },
  },
  'Anno 2023, in context of Advent of Code: your thoughts on AI and LLM\'s?': {
    header: 'Year_specific_2023_AI_and_LLM_thoughts',
    multi: true,
    answers: {
      "Ugh, not again with the AI related stuff... just let me help Santa and be on my way!!!": "Not again with AI",
      "I don't know what \"AI and/or LLM stuff\" means": "Don't know what AI/LLM means",
      "I will use (almost) *zero* AI and/or LLM stuff": "Uses zero AI",
      "I will use *some* AI and/or LLM stuff": "Uses some AI",
      "I will *extensively* use AI and/or LLM stuff": "Uses lots of AI",
      "It's *great* that puzzles are being solved with help from AI and/or LLM stuff": "AI is great for AoC",
      "It's *good* that puzzles are being solved with help from AI and/or LLM stuff": "AI is good for AoC",
      "It's *bad* that puzzles are being solved with help from AI and/or LLM stuff": "AI is bad for AoC",
      "It's *horrible* that puzzles are being solved with help from AI and/or LLM stuff": "AI is horrible for AoC",
      "I submit to our new AI overlords: happy to become part of the new world order!!!": "Submitted to our new AI overlords",
    },
    preProcess: answer => {
      if (/\S+@\w+\.\w+/.test(answer)) return "<anonymized>"; // answers with e-mail addresses I'd rather anonimize
      answer = answer.replace(/http:\/\/memegen\/\S*/g, "")
      return answer;
    },
  },

  /////////////////////////////////
  // 2022 and beyond:
  'Have/will you get at least one ⭐ in Advent of Code 2024?': {
    header: 'Participates_in_2024',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2024': 'Dec',
      'Yes, (mostly) after 2024': 'Later',
    }
  },
  'Have/will you get at least one ⭐ in Advent of Code 2023?': {
    header: 'Participates_in_2023',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2023': 'Dec',
      'Yes, (mostly) after 2023': 'Later',
    }
  },
  'Have/will you get at least one ⭐ in Advent of Code 2022?': {
    header: 'Participates_in_2022',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2022': 'Dec',
      'Yes, (mostly) after 2022': 'Later',
    }
  },
  'Did you participate in 2023? ("Floating Islands")': {
    header: 'Participates_in_2023',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2023': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
      'Yes, (mostly) after 2023': 'Later',
    }
  },
  'Did you participate in 2022? ("Jungle")': {
    header: 'Participates_in_2022',
    answers: {
      'Not really, but I\'m involved in some other way, (e.g. moderating the Subreddit)': 'Involved otherwise',
      'No': 'No',
      'Yes, (mostly) in december 2022': 'Dec',
      'Yes, but (mostly) only later on': 'Later',
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
  'Did you participate in 2015? ("Star-powered Machine")': {
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
  'Did you participate in 2016? ("Easter Bunny HQ")': {
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
  'Did you participate in 2017? ("Naughty or Nice list")': {
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
  'Did you participate in 2018? ("Time Travel")': {
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
  'Did you participate in 2019? ("Spacecraft")': {
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
  'Did you participate in 2020? ("Tropical Island Vacation")': {
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
  'Did you participate in 2021? ("The Ocean")': {
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
      "also used a tiny bit of Maxima": "Maxima",
      "awk": "AWK",
      "Awk": "AWK",
      "Basic": "BASIC",
      "bqn": "BQN",
      "brainfuck": "Brainfuck",
      "Clojure": "Clojure/ClojureScript",
      "Coffeescript": "CoffeeScript",
      "coffeescript": "CoffeeScript",
      "coffeeScript": "CoffeeScript",
      "common lisp": "Common Lisp",
      "Custom language": "Custom Language",
      "custom": "Custom Language",
      "Dart!": "Dart",
      "dart": "Dart",
      "G (a.k.a. LabVIEW)": "LabVIEW",
      "25 different languages": "Different language every day",
      "25 Languages challenge": "Different language every day",
      "A different language every day, chosen on that day.": "Different language every day",
      "A different language every day": "Different language every day",
      "different language each day": "Different language every day",
      "I will pick each day depending on my mood!": "Different language every day",
      "Each day a different language": "Different language every day",
      "New language every day": "Different language every day",
      "Unique for each day": "Different language every day",
      "one day, one lang": "Different language every day",
      "One Language per day": "Different language every day",
      "Random language every day": "Different language every day",
      "Trying to do a different language every day, haven't decided what languages": "Different language every day",
      "actually trying a different language each day, but if it's too difficult, Python is the fallback": "Different language every day",
      "1 different programming language per day, python if I don't manage": "Different language every day",
      "will try a different language for each day": "Different language every day",
      "emacs lisp inside emacs": "emacs lisp",
      "elm": "Elm",
      "emojiC": "Emojicode",
      "emojicode": "Emojicode",
      "factor": "Factor",
      "FORTRAN": "Fortran",
      "Frink ( https://frinklang.org/ )": "Frink",
      "Frink (100%)": "Frink",
      "Gamemaker Language": "GameMaker",
      "GameMaker Language (GML)": "GameMaker",
      "GameMaker Language": "GameMaker",
      "google spreadsheet": "Google Sheets",
      "gdscript (Godot)": "GDScript",
      "GDScript / Godot": "GDScript",
      "GDscript": "GDScript",
      "Godot Engine": "GDScript",
      "GWBASIC": "GW-BASIC",
      "Idris2": "Idris",
      "Idris 2": "Idris",
      "Intcode": "IntCode",
      "Intersystems IRIS object script": "Intersystems Objectscript",
      "InterSystems ObjectScript": "Intersystems Objectscript",
      "Intersystems Cache Object Script (COS)": "Intersystems Objectscript",
      "Janet (janet-lang-org)": "Janet",
      "JQ": "jq",
      "k": "K",
      "Lean 4": "Lean",
      "Lean4": "Lean",
      "LLMs generated all my solutions this year but I didn't compete on the global leaderboard": "LLM's",
      "Meta metaproject.frl": "The Meta Project",
      "Miranda / Miranda2 (precursor to Haskell)": "Miranda",
      "minecraft commands": "Minecraft",
      "minecraft function": "Minecraft",
      "mcfunction (Minecraft)": "Minecraft",
      "My own": "My own language!",
      "my own scripting language": "My own language!",
      "My own toy language": "My own language!",
      "my own programming language": "My own language!",
      "my own unpublished scripting language": "My own language!",
      "my own programming language!": "My own language!",
      "My own programming language!": "My own language!",
      "My own programming language": "My own language!",
      "my own scripting language (unpublished)": "My own language!",
      "my own, unpublished language": "My own language!",
      "my own": "My own language!",
      "Self-made toy language": "My own language!",
      "own scripting language": "My own language!",
      "Newt (my own language)": "My own language: Newt",
      "Drain (custom toy Lang)": "My own language: Drain",
      "Wing (my own)": "My own language: Wing",
      "Sack (mine)": "My own language: Sack",
      "Sack (own work)": "My own language: Sack",
      "Lox (custom language from https://craftinginterpreters.com)": "My own language: Lox, using 'craftinginterpreters'",
      "SLAFL, my custom language interpreter (you can search on github)": "My own language: SLAFL",
      "XallScript (my own scripting language))": "My own language: XallScript",
      "My own language - Chi to test its usefulness (https://github.com/marad/chi-compiler-kotlin)": "My own language: Chi",
      "N/A": "n/a",
      "nim": "Nim",
      "ocaml": "OCaml",
      "Ocaml": "OCaml",
      "OCamL": "OCaml",
      "Octave (v. close to Matlab)": "Octave",
      "Lean 4": "Lean",
      "GNU Pascal": "Pascal",
      "Pen and Paper probably": "Pen & Paper",
      "pen": "Pen & Paper",
      "pen & paper": "Pen & Paper",
      "Pen": "Pen & Paper",
      "PeopleCode for 2018": "PeopleCode",
      "Perl": "Perl 5", // The years where this was asked on the survey it clearly meant Perl 5
      "pl/pgSQL": "PL/pgSQL",
      "pony": "Pony",
      "Ponylang": "Pony",
      "PowerQuery M": "Power Query",
      "M (Microsoft Power Query)": "Power Query",
      "PowerQuery M/DAX": "Power Query",
      "processing": "Processing",
      "Processing (which might just be C with extra steps)(for visualizations)": "Processing",
      "postscript": "PostScript",
      "Postscript": "PostScript",
      "postScript": "PostScript",
      "q": "Q/KDB+",
      "Q": "Q/KDB+",
      "Q / kdb+": "Q/KDB+",
      "Kdb+ / Q": "Q/KDB+",
      "q/kdb+": "Q/KDB+",
      "probably racket": "Racket",
      "roc": "Roc",
      "Racket/Scheme": "Racket",
      "Scheme/Racket": "Racket",
      "Perl 6 / Raku": "Raku",
      "Perl 6": "Raku",
      "REXX": "Rexx",
      "might try learning rust also": "Rust",
      "rockstar": "Rockstar",
      "RockStar": "Rockstar",
      "Rockstar (just one day, to see if I could)": "Rockstar",
      "Some kind of SCHEME dialect, probably racket": "Scheme dialect",
      "Some kind of SCHEME dialect": "SCHEME dialect",
      "scheme": "Scheme",
      "SCHEME": "Scheme",
      "scratch": "Scratch",
      "smalltalk": "Smalltalk",
      "GNU Smalltalk": "Smalltalk",
      "SmileBasic for 3DS": "SmileBASIC",
      "The 3DS game: SmileBasic 4": "SmileBASIC",
      "https://github.com/cessnao3/solariumprocessor": "SolariumProcessor",
      "Squeak Smalltalk IDE": "Squeak",
      "Squeam (a Lisp dialect I made up)": "Squeam (own Lisp dialect)",
      "TCL should come in the list": "Tcl;Each day a different language",
      "Tcl for each + a different language each day": "Tcl",
      "tcl": "Tcl",
      "TCL": "Tcl",
      "Typescript": "TypeScript",
      "Unreal Engine 4 (Blueprints)": "Unreal Engine",
      "Unreal Engine 4": "Unreal Engine",
      "Undecided yet, will improvise": "Undecided",
      "To be decided": "Undecided",
      "Vbscript": "VBScript",
      "V (vlang.io)": "V",
      "V (https://vlang.io/)": "V",
      "verilog": "Verilog",
      "Vim keystrokes": "Vim",
      "Vim Script": "Vim",
      "vim": "Vim",
      "vim": "Vim",
      "vimscript": "Vimscript",
      "Visual Basic 6": "VB6",
      "WebAssembly": "WASM",
      "Wolfram Language / Mathematica": "Wolfram;Mathematica",
      "WolfLang": "Wolfram",
      "Wolfram 14.1": "Wolfram",
      "zig": "Zig",
      "Zsh": "zsh",
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
       answer = answer.replace("lex,yacc", "lex;yacc");
       answer = answer.replace("Lisp, Awk", "Lisp;Awk");
       answer = answer.replace("Ocaml, Pony", "Ocaml;Pony");
       answer = answer.replace("Odin, Elm", "Odin;Elm");
       answer = answer.replace("Picat, Clean", "Picat;Clean");
       answer = answer.replace("Pyret, Tailspin", "Pyret;Tailspin");
       answer = answer.replace("Roc, Uiua, Elm", "Roc;Uiua;Elm");
       answer = answer.replace("Uiua, Factor", "Uiua;Factor");
       answer = answer.replace("Already added a day 1 solution in Sed, may pull out some other languages as the month goes on", "sed");
       answer = answer.replace("sed, awk", "sed;awk");
       answer = answer.replace("Sometimes i'll grab my Nintendo 3DS and use SmileBASIC. Only when I really want to torture myself though", "SmileBASIC on Nintendo 3DS (only when I really want to torture myself though)");
       answer = answer.replace("Smalltalk, dc", "Smalltalk;dc");
       answer = answer.replace("Tailspin, Dart", "Tailspin;Dart");
       answer = answer.replace("vim and brainfuck", "vim;brainfuck");
       answer = answer.replace("zig, GNU Smalltalk, OCaml, Turing, Dart", "zig;GNU Smalltalk;OCaml;Turing;Dart");
       answer = answer.replace("Hare, Fennel, Own languages", "Hare;Fennel;my own");
       answer = answer.replace("Bash/Shell;C;Clojure/ClojureScript;Crystal;Dart;F#;Haskell;Lisp;Lua;Nim;OCaml;Python 3;Ruby;Rust;Scala;Swift;Zig;Uiua, Koka, Fennel", "Bash/Shell;C;Clojure/ClojureScript;Crystal;Dart;F#;Haskell;Lisp;Lua;Nim;OCaml;Python 3;Ruby;Rust;Scala;Swift;Zig;Uiua;Koka;Fennel");
       answer = answer.replace("I do a “solve every day in a different language” thing, so no primary language. I did aoc2020 in assembly though.", "Different language every day");
       answer = answer.replace("Atari Basic / 6502 assembler for 2016", "Atari Basic");
       answer = answer.replace("sed gurklang postscript", "sed;gurklang;postscript");
       answer = answer.replace("trying to use it to learn Rust this year, but submitting with Java", "Rust;Java");
       answer = answer.replace("Various esoteric languages including Piet, BF, Befunge", "Various esoteric languages;Piet;BF;Befunge");
       answer = answer.replace("Bash/Shell;C;Perl 5;Python 3;Korn Shell (never bash), bc(1), GNU Pascal", "Bash/Shell;C;Perl 5;Python 3;Korn Shell;bc(1);GNU Pascal");
       answer = answer.replace("C;Java;Julia;Kotlin;Lua;Python 3;Ruby;Rust;TypeScript;Zig;JVM bytecode, Vimscript", "C;Java;Julia;Kotlin;Lua;Python 3;Ruby;Rust;TypeScript;Zig;JVM bytecode;Vimscript");
       answer = answer.replace("AWK;Bash/Shell;C#;Elixir;Python 3;TypeScript;Vim, Gleam", "AWK;Bash/Shell;C#;Elixir;Python 3;TypeScript;Vim;Gleam");
       answer = answer.replace("C;Lisp;Python 3;SCHEME;PicoLisp, Factor", "C;Lisp;Python 3;SCHEME;PicoLisp;Factor");
       answer = answer.replace("Lisp;Prolog;SQL;Common Lisp, Factor", "Lisp;Prolog;SQL;Common Lisp;Factor");
       answer = answer.replace("Java;Kotlin;Python 3;VB6, OPL", "Java;Kotlin;Python 3;VB6;OPL");
       answer = answer.replace("LiveScript (transpiles to JavaScript, like CoffeeScript but more obscure)", "LiveScript");
       answer = answer.replace("JavaScript;Powerquery (M), Excel", "JavaScript;Power Query;Excel");
       answer = answer.replace("Haskell;Java;JavaScript;Kotlin;Lisp;Lua;Nim;Perl 5;Python 3;Raku;Racket;Ruby;Setanta, Uiua", "Haskell;Java;JavaScript;Kotlin;Lisp;Lua;Nim;Perl 5;Python 3;Raku;Racket;Ruby;Setanta;Uiua");
       answer = answer.replace("Go;Visual Basic 6, Turbo Pascal 7", "Go;Visual Basic 6;Turbo Pascal 7");

       
       if (answer.includes(' and ')) {
         console.warn("  => DANGER! Language with 'and':", answer);
       }
       if (answer.includes(', ')) {
         console.warn("  => DANGER! Language with ', ':", answer);
       }
       if (answer.includes(';)')) {
         console.warn("  => DANGER! Language with ';)' smiley:", answer);
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
      "acme": "Acme",
      "Alteryx Designer": "Alteryx",
      "N/A Alteryx is not a coding language": "Alteryx",
      "Application Designer for 2018": "Application Designer",
      "BBedit": "BBEdit",
      "BBEDIT": "BBEdit",

      "Browser console for simpler problems": "Browser (Console)",
      "Browser console": "Browser (Console)",
      "browser console": "Browser (Console)",
      "Browser Console": "Browser (Console)",
      "browser": "Browser (Console)",
      "Browser": "Browser (Console)",
      "Browser\"s console": "Browser (Console)",
      "Chrome/Firefox console (direct in webpage)": "Browser (Console)",
      "console in browser": "Browser (Console)",
      "Console in web browser": "Browser (Console)",
      "browser developer tools console": "Browser (Console)",
      "Browser JS console": "Browser (Console)",
      "my browser js console": "Browser (Console)",
      "Browser's console": "Browser (Console)",
      "Web console": "Browser (Console)",
      "the chromium devtools console": "Browser (Console)",

      "chrome browser console": "Chrome",
      "chrome console": "Chrome",
      "Chrome console": "Chrome",
      "Chrome Console": "Chrome",
      "chrome Console": "Chrome",
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
      
      "AWS Cloud9 IDE": "AWS Cloud9",
      "Cloud9": "AWS Cloud9",
      
      "Code Blocks": "Code::Blocks",
      "code::blocks": "Code::Blocks",
      "CodeBlocks and Dr. Java": "Code::Blocks",
      "Codeblocks": "Code::Blocks",
      "CodeBlocks": "Code::Blocks",
      
      "codepen.io": "CodePen",
      "Codepen.io": "CodePen",
      "Codepen": "CodePen",
      "Coderunner": "CodeRunner",
      "Comma IDE": "Comma",
      "Codeanywhere.com": "Codeanywhere",
      "Codeboard.io": "Codeboard",

      "cursor": "Cursor",
      "Cursor AI (fork of VSC)": "Cursor",

      "dataspell": "DataSpell",
      "Dataspell": "DataSpell",
      "Delphi 12 Community Edition": "Delphi",
      "Dr. Racket": "DrRacket",
      "drracket": "DrRacket",
      "Drracket": "DrRacket",
      "Dr Racket": "DrRacket",

      "Dyalog RIDE": "Dyalog",

      "Dyalog APL IDE": "Dyalog RIDE",
      "Dyalog APL": "Dyalog RIDE",
      "Dyalog RIDE": "Dyalog RIDE",
      "Ride": "Dyalog RIDE",
      "RIDE": "Dyalog RIDE",

      "emacs": "Emacs",

      "Elixir LiveBook": "Livebook",
      "Elixir Livebook": "Livebook",
      "LiveBook": "Livebook",

      "Devtools (Firefox)": "Firefox",
      "Firefox Console": "Firefox",
      "Firefox Developer Tools": "Firefox",
      "Firefox console": "Firefox",
      "Firefox Console": "Firefox",
      "FireFox Console": "Firefox",

      "Jetbrains Fleet": "Fleet",
      "JetBrains Fleet": "Fleet",

      "Gnat studio": "GNAT Studio",
      "GPS (Gnat Programming Studio)": "GNAT Studio",

      "GameMaker Studio 2": "GameMaker",
      "geany": "Geany",
      "gedit + console": "Gedit",
      "gedit": "Gedit",
      "Notepad (vanilla)/gedit": "Gedit",
      "Goland": "GoLand",
      "Godot Engine": "Godot",

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
      "jgrasp": "jGRASP",
      "Jgrasp": "jGRASP",
      "jqt": "JQT",
      "Jqt": "JQT",
      "jsfiddle": "JSFiddle",
      "JsFiddle": "JSFiddle",
      "JSFiddle.net": "JSFiddle",
      "J Ide": "J IDE",
      "J built-in IDE (see jsoftware.com)": "J IDE",
      "Kate": "KATE",
      "kakoune": "Kakoune",
      "joe on CLI": "joe",
      "Studio for kdb+": "KDB Studio",
      "kilo": "Kilo",
      "https://play.kotlinlang.org/": "Kotlin Playground",
      "LabVIEW 2018": "LabVIEW",
      "Lazarus/Free Pascal": "Lazarus",
      "lapce": "Lapce",

      "Linqpad": "LINQPad",
      "LinqPad": "LINQPad",
      "LinqPAD": "LINQPad",

      "LiveBook.dev": "Livebook",

      "linux": "Linux",

      "Lite-XL": "Lite XL",
      "Lite-xl": "Lite XL",

      "KATE": "Kate",
      "kate": "Kate",
      "kate/kwrite": "Kate",

      "Midnight Commander (mcedit)": "mcedit",
      "midnight commander": "mcedit",

      "Mathematica Notebook": "Mathematica",
      "Wolfram Mathematica": "Mathematica",
      "Wolfram Notebook": "Mathematica",

      "matlab?": "Matlab",
      "matlab": "Matlab",
      "MATLAB": "Matlab",

      "Maple (is it's own REPL)": "Maple",

      "micro: https://micro-editor.github.io/": "Micro",
      "micro": "Micro",

      "mousepad": "Mousepad",

      "my own": "My own editor!",
      "my own text editor": "My own editor!",
      "own text editor": "My own editor!",
      "my own, unpublished editor": "My own editor!",
      "My own editor": "My own editor!",
      "my own unpublished Notepad clone": "My own editor!",
      "my own Notepad clone (unpublished)": "My own editor!",

      "nano": "Nano",

      "neovim": "Neovim",
      "NeoVim": "Neovim",
      "Vscode neovim": "Neovim",

      "Neither?": "No IDE",
      "none - Joe's editor + GDB": "No IDE",
      "no IDE, just a shell": "No IDE",
      "no IDE": "No IDE",
      "None": "No IDE",
      "none": "No IDE",
      "None/a text editor": "No IDE",
      "No IDE, just a stock text editor.": "No IDE",
      "No IDE. Just a general purpose editor.": "No IDE",

      "Notepad.exe": "Notepad",
      "notepad": "Notepad",
      "Notepad Texteditor": "Notepad",

      "https://observablehq.com": "Observable",
      "https://observablehq.com/": "Observable",
      "observablehq.com": "Observable",
      "ObservableHQ": "Observable",

      "Onivim2": "OniVim2",
      "https://www.onlinegdb.com/": "OnlineGDB",
      "Online GDB onlinegdb.com": "OnlineGDB",
      "https://www.onlinegdb.com/online_c++_compiler": "OnlineGDB",
      "Online GDB": "OnlineGDB",
      "Onlinegdb": "OnlineGDB",
      "www.onlinegdb.com": "OnlineGDB",
      "online-python.com": "Online-python",
      "online-python": "Online-python",
      "online Phyton IDE": "Online-python",
      "https://www.online-python.com/": "Online-python",
      "https://www.online-python.com": "Online-python",
      "Nova": "Panic Nova",
      "Pen and Paper probably": "Pen & Paper",
      "pen&paper": "Pen & Paper",
      "Pharo Smalltalk": "Pharo",
      "Smalltalk (Pharo)": "Pharo",

      "https://pythontutor.com": "Python Tutor",

      "pluto": "Pluto",
      "plutojl.org": "Pluto",
      "Pluto Notebooks": "Pluto",
      "Pluto.jl": "Pluto",
      "Pluto.jl (a type of reactive notebook in the browser)": "Pluto",

      "PowerShell CLI": "PowerShell",
      "Powershell ISE": "PowerShell",
      "PowerShell ISE": "PowerShell",
      
      "Processing ide": "Processing",
      "Processing IDE": "Processing",
      "pycharm": "PyCharm",
      "Pycharm": "PyCharm",
      "Pythonista 3 on iPad Pro": "Pythonista",
      "pythonista": "Pythonista",

      "Does the Python REPL (ptpython) count as an IDE?": "Ptpython REPL",

      "qt creator": "Qt",
      "Qt Creator": "Qt",
      "QT Creator": "Qt",
      "qtcreator": "Qt",
      "QtCreator": "Qt",
      "Qt creator": "Qt",

      "Android QPython 3L": "QPython",

      "repl.it": "Repl.it",
      "Replit": "Repl.it",
      "'repl.it' - a website based thingy. For a first few tasks I didn't need anything special and was too lazy to boot up an IDE :D": "Repl.it",
      "repl.it": "Repl.it",
      "Jetbrains Rider": "Rider",
      "JetBrains Rider": "Rider",
      "Roblox Studio (yes i actually used it)": "Roblox Studio",

      "Rust Rover": "RustRover",
      "RustRover EAP": "RustRover",
      "RustRover from Jetbrains": "RustRover",
      "IntelliJ RustRover": "RustRover",

      "Rust Playground (online repl)": "Rust Playground",

      "RunJs https://runjs.app/": "RunJS",

      "https://regex101.com/": "Regex101",

      "SAP workbench": "SAP",

      "SAPIEN Powershell Studio": "Sapien PowerShell Studio",
      "just a shell": "Shell",
      "shell": "Shell",
      "spacemacs": "Spacemacs",
      "Swift playground": "Swift Playgrounds",

      "Anaconda/spyder": "Spyder",
      "Spyder, included in anaconda python3 distributio": "Spyder",
      "Spyder, included in anaconda python3 distribution": "Spyder",

      "Microsoft SQL Managerment Studio": "SQL Server Management Studio",
      "Microsoft SQL Server Studio": "SQL Server Management Studio",
      "SSMS": "SQL Server Management Studio",
      "SQL Server management studio": "SQL Server Management Studio",

      "StackBlitz Web Editor": "StackBlitz",
      "The 3DS game: SmileBasic 4": "SmileBASIC for 3DS",
      "SmileBasic for 3DS": "SmileBASIC for 3DS",
      "Squeak Smalltalk IDE": "Squeak",
      "Smalltalk (Squeak) IDE": "Squeak",

      "Swift playground iOS": "Swift playground",
      "Swift Playgrounds for iPad": "Swift playground",
      "Swift Playgrounds on iPad/Mac": "Swift playground",

      "linux mint built in text editor + terminal": "Text Editor",
      "text editor": "Text Editor",
      "Text editor": "Text Editor",
      "text Editor": "Text Editor",
      "gnome text editor": "Text Editor",
      "default text editor in ubuntu": "Text Editor",
      "Generic text editor": "Text Editor",

      "Terminal emulator": "Terminal",
      "Terminal with a vi-like editor.": "Terminal",
      "terminal with gcc and g++": "Terminal",

      "tio.run": "TIO.run",
      "https://www.typescriptlang.org": "Typescript Playground",
      "Unreal Engine 4 Blueprint Graph": "Unreal Engine",
      "Unreal Engine 4": "Unreal Engine",
      "Unreal Engine Blueprints": "Unreal Engine",

      "Uiua pad": "Uiua Pad",

      "vim and a shell": "Vim",
      "vim": "Vim",
      "Visual Studio Code": "VS Code",

      "vis": "Vis",

      "Codium": "VSCodium",
      "Specifially VSCodium": "VSCodium",
      "Visual Studio Codium": "VSCodium",
      "VS Codium": "VSCodium",
      "VSCodium (marked VSCode too for simplicity)": "VSCodium",
      "vscodium": "VSCodium",
      "VSCodium": "VSCodium",
      "VsCodium": "VSCodium",
      "Vscodium": "VSCodium",
      "VSCodium not full fat VSCode": "VSCodium",

      "what is even an IDE?": "What is even an IDE?",
      "what's an IDE?": "What is even an IDE?",
      "webstorm": "WebStorm",
      "Webstorm": "WebStorm",
      "Web Storm": "WebStorm",
      "Wing 101": "Wing",
      "Wing IDE": "Wing",
      "wing": "Wing",
      "Wolfram Notebook / Mathematica Notebook": "Mathematica",
      "Wolfram Desktop": "Mathematica",
      "xed + gnome terminal": "xed",
      "ZeroBrane Studio": "ZeroBrane",
      "ZeroBrane Studios": "ZeroBrane",
      "zed": "Zed",
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
      answer = answer.replace("Powershell ISE and Code::Blocks", "Powershell ISE;Code::Blocks");
      answer = answer.replace("Python IDLE, Powershell", "Python IDLE;Powershell");
      answer = answer.replace("Pythonista on iPhone, at least for now (might switch to PC later)", "Pythonista");
      answer = answer.replace("Qt, gedit + console", "Qt;gedit + console");
      answer = answer.replace("Spacemacs, drracket", "Spacemacs;drracket");
      answer = answer.replace("Excel;Notepad++;Visual Studio Code;Qt Creator, Godbolt", "Excel;Notepad++;Visual Studio Code;Qt Creator;Godbolt");
      answer = answer.replace("PowerShell ISE, SWISH online for Prolog, LINQPad for C#", "PowerShell ISE;SWISH-Prolog;LINQPad");
      answer = answer.replace("codium, it's a vsc copy, but without bs", "VsCodium");
      answer = answer.replace("RunJS and Thonny", "RunJS;Thonny");
      answer = answer.replace("jgrasp ;)", "jgrasp");
      answer = answer.replace("Notrpad exe", "Notepad");
      answer = answer.replace("CodePen + Chrome", "CodePen;Chrome");
      answer = answer.replace("IDLE / Nano", "IDLE;Nano");
      answer = answer.replace("vim and a shell, super comfy", "vim;shell");
      answer = answer.replace("Not to sure, just a text editor on my Chromebook", "Text editor");
      answer = answer.replace("Xcode but ONLY as a text editor. BBEdit was fighting me on indentation.", "Xcode;BBedit");
      answer = answer.replace("GHCi (directly in the Haskell REPL ;)", "GHCi");
      answer = answer.replace("Godot Engine, some JS IDE i found while traveling without laptop", "Godot Engine;Some JS IDE I found while traveling without laptop");
      answer = answer.replace("Not using one (firefox console / notepad)", "FireFox Console;Notepad");
      answer = answer.replace("No IDE. (A generic text editor ain't an IDE)", "Generic text editor");
      answer = answer.replace("no IDE, mostly far editor", "No IDE");
      answer = answer.replace("IPython / Jupyter;Spyder;online-python.com works pretty well, trying to save laptop storage by not creating new files", "IPython / Jupyter;Spyder;online-python");
      answer = answer.replace("Neovim, but just as a text editor (not an IDE)", "Neovim");
      answer = answer.replace("pico, or just command line in Terminal", "Pico");
      answer = answer.replace("IntelliJ;VB6, Psion OPL, MicroHydra", "IntelliJ;VB6;Psion OPL;MicroHydra");
      answer = answer.replace("Visual Studio Code;Using OneCompiler for quite a few since i’m trying 25 languages, if it times out then VSCode with a docker image for the language runtime/compiler.", "Visual Studio Code;OneCompiler");
      answer = answer.replace("Kate, Kakoune", "Kate;Kakoune");
      answer = answer.replace("https://play.golang.org and also Google chrome console", "GoLang Playground;Google Chrome Console");
      answer = answer.replace("ideone.com and trinket.io", "IDE One;Trinket");
    

      if (answer.includes(', ')) {
        console.warn("  => DANGER! IDE with ', ':", answer);
      }
      if (answer.includes(';)')) {
        console.warn("  => DANGER! IDE with ';)' smiley:", answer);
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
      'In browser (Firefox)': 'Browser',
      'chrome': 'Browser',

      'android on tablet': 'Android',
      'Termux on Android': 'Android',
      'Android 12 (on smartphone: Termux + JAndroid)': 'Android',

      'Chrome os (chromebook) ': 'ChromeOS',
      'Chrome OS': 'ChromeOS',
      'Chromebook': 'ChromeOS',
      'ChromeOS (Linux)': 'ChromeOS',
      'ChromeOS (Linux)': 'ChromeOS',
      'ChromeOS (technically a linux distro, but not really)': 'ChromeOS',
      'ChromeOS (Linux, but not really)': 'ChromeOS',
      'Chrome os (chromebook)': 'ChromeOS',
      'ChromeOS (I do it in google colab on my school chromebook)': 'ChromeOS',
      'Linux on Chrome OS': 'ChromeOS',

      'openbsd': 'BSD (OpenBSD)',
      'OpenBSD': 'BSD (OpenBSD)',
      'FreeBSD': 'BSD (FreeBSD)',
      'aquaBSD': 'BSD (aquaBSD)',
      'dragonfly bsd': 'BSD (DragonflyBSD)',
      'BSD, but also Linux': 'BSD',

      'unix': 'Unix',

      'Ubuntu': 'Linux',
      'Remote/Linux': 'Linux',
      'Linux dev server accessible from my mac and PC': 'Linux',
      'Arch BTW': 'Linux',
      'used to be windows but since 2021 ive changed to linux': 'Linux',
      'Running a linux command line VM in windows... Mark that how you want.': 'Linux',

      '50/50 Linux and Windows': 'Combi of Windows/Linux',
      'Combi of Windows/Linux': 'Combi of Windows/Linux',
      'Running a linux command line VM in windows...  Mark that how you want.': 'Linux', // Well don't mind if I do!
      'Windows / Linux 50/50': 'Combi of Windows/Linux',
      'Windows + Linux': 'Combi of Windows/Linux',
      'Windows and Linux': 'Combi of Windows/Linux',
      'windows for development, commodore 64 (emulator) for running the programs': 'Windows', // So sorry for stripping this cool answer (just to make the data viz look okay)! Will promise next year to include "Cool remarks about your setup?" question for this shizzl...
      'Windows+Linux': 'Combi of Windows/Linux',
      'Windows and linux': 'Combi of Windows/Linux',
      'Both windows and Linux': 'Combi of Windows/Linux',
      'About even split between Linux and Windows': 'Combi of Windows/Linux',
      'Switch between Windows and Linux': 'Combi of Windows/Linux',
      '50% Linux laptop and 50% Windows desktop. JVM and "run anywhere"': 'Combi of Windows/Linux',
      'Writing code on Windows; Compiling and running on Linux.': 'Combi of Windows/Linux',
      'Code on Windows, Execute on Linux': 'Combi of Windows/Linux',
      'Windows and Garuda Linux': 'Combi of Windows/Linux',
      'Windowss client, Linux server': 'Combi of Windows/Linux',
      'Visual Studio Code (Windows) remote to Linux (Ubuntu)': 'Combi of Windows/Linux',
      'Windows, with VS Code connecting to a remote session on a Linux server': 'Combi of Windows/Linux',
      'Linux or Windows, depending on which laptop is closer': 'Combi of Windows/Linux',
      'Linux VPS, using Putty on Windows to reach it': 'Combi of Windows/Linux',

      '50/50 Between WSL and Linux (Desktop/Laptop)': 'Combi of WSL/Linux',

      'Cygwin': 'Windows with Cygwin',
      'cygwin on windows. You can decide if that\'s Windows or Linux.': 'Windows with Cygwin',
      'Windows cygwin': 'Windows with Cygwin',
      'Windows with Cygwin': 'Windows with Cygwin',
      'Windows with Cygwin.': 'Windows with Cygwin',
      'cygwin terminal on windows. Works like a linux shell.': 'Windows with Cygwin',

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
      'Windows with Devcontainers running in wsl': 'WSL',
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
      'WSL on windows': 'WSL',
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
      'Windows running Linux via WSL in VSCode': 'WSL',
      'Windows + WSL (Debian) for the programming part of it, feel free to recategorize me :)': 'WSL',
      'Ubuntu in WSL2 under Windows': 'WSL',
      'IDE running on windows, executing inside WSL2': 'WSL',
      'I\'m on Windows 10 but I run the scripts with WSL Ubuntu': 'WSL',
      'Windows, but all code and editing is in linux on WSL.': 'WSL',

      'iPad OS': 'iPadOS',
      'Ipad os': 'iPadOS',
      'IPadOS': 'iPadOS',
      'iPad OS': 'iPadOS',
      'iOS (ipad)': 'iPadOS',

      'both Windows & macOS': 'Combi of Windows/macOS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'Combi of Windows/macOS': 'Combi of Windows/macOS',
      'mac and windows': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
      'macOS and Windows': 'Combi of Windows/macOS',
      'Windows and MacOS': 'Combi of Windows/macOS',
      'Mac and Windows': 'Combi of Windows/macOS',
      '50/50 macOS and Windows': 'Combi of Windows/macOS',

      'macOS + Linux (toolchain in docker)': 'Combi of Linux/macOS',
      'Linux at home -> macOS for travel': 'Combi of Linux/macOS',
      'macOS and Linux': 'Combi of Linux/macOS',
      'Both Linux and macOS (macOS for days 1-15 because of work, and Linux afterwards because of lockdown)': 'Combi of Linux/macOS',

      'IOS': 'iOS',
      'ios': 'iOS',
      'iOs': 'iOS',
      'Linux or Chrome OS': 'Combi of Linux/ChromeOS',
      'Android and Windows': 'Combi of Windows/Android',

      'All of the above (varies by day)': 'All of them',
      'All of them equally. Windows in desktop. Linux in personal laptop. MacOS in work laptop.': 'All of them',

      'plan9': 'Plan 9',
      
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
      "": "(Blank)",

      // Other answers grouping
      "No, not skilled enough": "No, I'm not skilled enough",
      "No, skill issue": "No, I'm not skilled enough",
      "No, I'm not skilled enough to have a shot": "No, I'm not skilled enough",
      "Skill issue": "No, I'm not skilled enough",
      "No, I have literally no chance with my current skill level": "No, I'm not skilled enough",
      "No, not anywhere near skilled enough": "No, I'm not skilled enough",
      "not skilled enough": "No, I'm not skilled enough",
      "No, not at that skill level": "No, I'm not skilled enough",
      "No, not skillful enough.": "No, I'm not skilled enough",
      "Not skilled enough": "No, I'm not skilled enough",
      "Don't have the skills": "No, I'm not skilled enough",
      "No, not enough skill": "No, I'm not skilled enough",
      "No, I'm not skilled enough to make it there 🙃": "No, I'm not skilled enough",
      "No, skill issues": "No, I'm not skilled enough",
      "no i don’t have the skill": "No, I'm not skilled enough",
      "No not capable": "No, I'm not skilled enough",
      "No, coding skills not fast enough for that": "No, I'm not skilled enough",
      "No, don't have the level": "No, I'm not skilled enough",
      "No, don't have the talent/speed.": "No, I'm not skilled enough",
      "No, I got skill issue": "No, I'm not skilled enough",
      "No, not skilled": "No, I'm not skilled enough",
      "no, skill issue": "No, I'm not skilled enough",
      "No, skill issue.": "No, I'm not skilled enough",
      "No, skill issues.": "No, I'm not skilled enough",
      "Skill Issue": "No, I'm not skilled enough",
      "Skill issues": "No, I'm not skilled enough",
      "Skill issuno i don’t have the skilles": "No, I'm not skilled enough",
      "No, I got skill issue": "No, I'm not skilled enough",

      "im not good enough": "No, I'm not good enough",
      "No, not good enough": "No, I'm not good enough",
      "No, nowhere near good enough": "No, I'm not good enough",
      "Not good enough": "No, I'm not good enough",
      "I am not good enough": "No, I'm not good enough",
      "No, I am not good enough": "No, I'm not good enough",
      "No, I’m nowhere near good enough": "No, I'm not good enough",
      "No, just not good enough.": "No, I'm not good enough",
      "No, not good enough for that": "No, I'm not good enough",
      "No, not good enough.": "No, I'm not good enough",
      "Not good enough to even come close": "No, I'm not good enough",
      "I’m not good enough.": "No, I'm not good enough",
      "No, I’m definitely not good enough": "No, I'm not good enough",
      "No, not good enough :-)": "No, I'm not good enough",
      "No, not good enough :(": "No, I'm not good enough",
      "No, not good enough to compete at that level.": "No, I'm not good enough",
      "Nowhere near good enough for that": "No, I'm not good enough",
      "I'm not good enough": "No, I'm not good enough",
      "No, I know I'm not good enough to have a shot at it": "No, I'm not good enough",
      "No, not good enough to code that fast": "No, I'm not good enough",
      "No, not nearly good enough": "No, I'm not good enough",
      "not good enough": "No, I'm not good enough",
      "Not good enough to ever consider this an option.": "No, I'm not good enough",
      "nowhere near good enough": "No, I'm not good enough",
      "No, not good enough!": "No, I'm not good enough",
      "Not good enough to get on the global leaderboard": "No, I'm not good enough",
      "No not good enough": "No, I'm not good enough",
      "No, not good enough at coding": "No, I'm not good enough",
      "No, I'm not good enough for it": "No, I'm not good enough",

      "No, not fast enough": "No, I'm not fast enough",
      "I wish - not fast enough": "No, I'm not fast enough",
      "I would like to but not fast enough": "No, I'm not fast enough",
      "No, not fast enough!": "No, I'm not fast enough",
      "No, since I'm by far not fast enough": "No, I'm not fast enough",
      "Not fast enough!": "No, I'm not fast enough",
      "I am simply not fast enough": "No, I'm not fast enough",
      "No, not fast enough to make it": "No, I'm not fast enough",
      "No, I'm not that fast": "No, I'm not fast enough",
      "No I am not fast enough": "No, I'm not fast enough",
      "Not fast enough": "No, I'm not fast enough",
      "No, I am not fast enough": "No, I'm not fast enough",
      "No, I'm not fast enough so I don't try": "No, I'm not fast enough",
      "No, nowhere near fast enough": "No, I'm not fast enough",
      "not fast enough yet": "No, I'm not fast enough",
      "Not fast enough, never made it.": "No, I'm not fast enough",
      "No, can't solve it that fast": "No, I'm not fast enough",

      "No, too slow": "No, I'm too slow",
      "I am too slow": "No, I'm too slow",
      "I'd love to, but I know I'm too slow": "No, I'm too slow",
      "No, I'm too slow": "No, I'm too slow",
      "No, to slow": "No, I'm too slow",
      "Too slow": "No, I'm too slow",
      "Haha, I am way too slow :D": "No, I'm too slow",
      "No, I am to slow": "No, I'm too slow",
      "No, I'm too slow for that": "No, I'm too slow",
      "No, I'm too slow haha": "No, I'm too slow",
      "No, I'm way too slow.": "No, I'm too slow",
      "to slow for global leaderboard": "No, I'm too slow",
      "I’m too slow anyway": "No, I'm too slow",
      "No, I am too slow 😂": "No, I'm too slow",
      "No, I'm way too slow!": "No, I'm too slow",

      "no chance": "No chance",
      "No I have zero chance of doing that": "No chance",
      "No, I don't stand a chance": "No chance",
      "No, I have zero chance of doing it": "No chance",
      "No, no chance!": "No chance",
      "No, no chance.": "No chance",
      "Not a chance?": "No chance",
      "No, i have no chance.": "No chance",
      "No, not a chance": "No chance",
      "I wouldn't stand a chance": "No chance",
      "Don't stand a chance": "No chance",
      "No, I wouldn't ever have a chance": "No chance",
      "No, no chance": "No chance",
      "No, no chance for me there ;)": "No chance",
      "I don't stand a chance": "No chance",
      "know I don't have a chance": "No chance",
      "No, I don't have any chance on getting on it": "No chance",

      "to difficult": "No, too difficult",
      "Too difficult": "No, too difficult",
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

      // Grouping 'other' answers
      'Addiction': 'Addicted',
      'for story': 'For the story',
      'because I\'m masochistic?': 'because I\'m masochistic',
      'because I\'m masochistic': 'because I\'m masochistic',
      'Masochism': 'because I\'m masochistic',
      'Because I\'m masochistic': 'because I\'m masochistic',

      "For the story": "for the story",
      "For the plot": "for the story",
      "for the plot!": "for the story",
      "for the story line": "for the story",
      "and for story!": "for the story",
      "for the STORY": "for the story",
      "I enjoy the story": "for the story",
      "Like the story": "for the story",
      "Funny storylines": "for the story",
      "for the story": "for the story",
      "Plot": "for the story",
      
      "For the memes": "for the memes!",
      "for the memes": "for the memes!",
      "For the reddit memes": "for the memes!",
      "For the reddit memes": "for the memes!",
      "for the reddit memes ♥": "for the memes!",
      "For the memes! (on reddit)": "for the memes!",
      "to post dank memes": "for the memes!",
      "All the coding memes on subreddit!": "for the memes!",
      "The memes on reddit make the headaches 100% worth it :)": "for the memes!",

      "For the community": "for the community",
      "Community": "for the community",
      "for the community": "for the community",
      "for the community hype": "for the community",
      "for the community interaction": "for the community",
      "The community!": "for the community",
      "The community (reddit/bluesky)": "for the community",
      "to participate in a community": "for the community",
      "for the sense of community": "for the community",
      "to be a part of the AOC community": "for the community",
      "for being part of this awesome community": "for the community",
      "for the community <3": "for the community",
      "For the community and discussion topics.": "for the community",
      "For the great community here!": "for the community",
      "To be part of a big community of nerds!": "for the community",

      "Private leaderboard": "for the private leaderboard(s)",
      "For the private boards": "for the private leaderboard(s)",
      "for private leaderboard bragging rights": "for the private leaderboard(s)",
      "Private competition": "for the private leaderboard(s)",
      "To compete on my private leaderboard": "for the private leaderboard(s)",
      "to compete in private leaderboard": "for the private leaderboard(s)",
      "To enjoy competing with others in my private leaderboard.": "for the private leaderboard(s)",
      "to compete in private leaderboard": "for the private leaderboard(s)",

      "Interview prep": "interview prep",
      "Prepare for interview": "interview prep",
      "to practice for interviews": "interview prep",

      "Company challenge offers prize": "company prizes",
      "My company has a private leaderboard with a money prize for the top": "company prizes",
      "I run an event at work with prizes for earning stars.": "company prizes",
      "Employer gives prizes for completion": "company prizes",
      "Prizes for winning private leaderboard at work": "company prizes",
      "we have a competition at work with a gift voucher prize": "company prizes",
      "To win the office prize": "company prizes",
      "for cool prizes my company offers for stars": "company prizes",
      "My company has a private laederboard full of nice prices": "company prizes",

      "friends!": "for fun with friends",
      "friends pool": "for fun with friends",
      "Friends are participating.": "for fun with friends",
      "friends do it": "for fun with friends",
      "Fun with friends": "for fun with friends",
      "social aspect with friends.": "for fun with friends",
      "with friends": "for fun with friends",
      "because my friends are doing it :-)": "for fun with friends",
      "Camaraderie with friends": "for fun with friends",
      "to do so with friends": "for fun with friends",
      "together with friends": "for fun with friends",
      "banter with friends": "for fun with friends",
      "to be social with friends": "for fun with friends",
      "to share the experience with friends": "for fun with friends",
      "To share an experience with friends": "for fun with friends",
      "Because friends also participate": "for fun with friends",
      "to have fun with friends": "for fun with friends",
      "To play with my friends": "for fun with friends",
      "To socialize with friends": "for fun with friends",
      "because friends participate as well": "for fun with friends",
      "Because my friends are doing it": "for fun with friends",

      "To compete with friends": "to compete with friends",
      "To compete with my friends": "to compete with friends",
      "to compete with my friends": "to compete with friends",
      "to compete with friends also doing AoC.": "to compete with friends",
      "compete with my friends": "to compete with friends",
      "competing with friends": "to compete with friends",
      "Competition between friends": "to compete with friends",
      "Compete and compare with friends": "to compete with friends",
      "Private leaderboard with friends.": "to compete with friends",
      "Challenge in private Leaderboard with friends": "to compete with friends",
      "to compete agianst my friends": "to compete with friends",
      "To beat my friends": "to compete with friends",
      "compete vs friends (for fun)": "to compete with friends",
      "to be faster than my friends": "to compete with friends",
      "To compete against friends": "to compete with friends",
      "to engage in friendly competition with friends :)": "to compete with friends",
      "Friendly competition with friends": "to compete with friends",
      "to beat my friends :)": "to compete with friends",
      "competition with friends": "to compete with friends",
      "to beat my friends lol": "to compete with friends",
      "to race my friends": "to compete with friends",

      "Because I'm on the beta testing team": "Because I'm on the beta testing team",
      "I'm one of the beta testers": "Because I'm on the beta testing team",
      "Because I'm on the Beta testing team": "Because I'm on the beta testing team",
      "Because I'm a beta tester": "Because I'm on the beta testing team",
      "Because I'm one of the beta testers. And beta testing this stuff is really fun.": "Because I'm on the beta testing team",
      "Because I'm one of the beta testers :D": "Because I'm on the beta testing team",
      "Because I'm one of the beta testers :)": "Because I'm on the beta testing team",
      "Cause Topaz is a friend of mine and tricked me into beta testing": "Because I'm on the beta testing team",
    },
    preProcess: answer => {
      if (/\S+@\w+\.\w+/.test(answer)) return "<anonymized>"; // answers with e-mail addresses I'd rather anonimize
      answer = answer.replace(";)", ":)") // quick fix to avoid ;-splitting
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

        record[prop] = record[prop].trim().replace(/ +/g, ' '); // Fold multiple spaces into one.

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