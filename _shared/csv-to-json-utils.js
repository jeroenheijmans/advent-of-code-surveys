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
      "FORTRAN": "Fortran",
      "Frink ( https://frinklang.org/ )": "Frink",
      "Frink (100%)": "Frink",
      "Gamemaker Language": "GameMaker",
      "GameMaker Language": "GameMaker",
      "google spreadsheet": "Google Sheets",
      "gdscript (Godot)": "GDScript",
      "GDscript": "GDScript",
      "GWBASIC": "GW-BASIC",
      "Idris2": "Idris",
      "Intcode": "IntCode",
      "Intersystems IRIS object script": "Intersystems Objectscript",
      "Janet (janet-lang-org)": "Janet",
      "JQ": "jq",
      "k": "K",
      "Lean 4": "Lean",
      "Lean4": "Lean",
      "Miranda / Miranda2 (precursor to Haskell)": "Miranda",
      "minecraft commands": "Minecraft",
      "minecraft function": "Minecraft",
      "mcfunction (Minecraft)": "Minecraft",
      "My own": "My own language!",
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
      "SLAFL, my custom language interpreter (you can search on github)": "My own language: SLAFL",
      "XallScript (my own scripting language))": "My own language: XallScript",
      "My own language - Chi to test its usefulness (https://github.com/marad/chi-compiler-kotlin)": "My own language: Chi",
      "N/A": "n/a",
      "nim": "Nim",
      "ocaml": "OCaml",
      "Ocaml": "OCaml",
      "OCamL": "OCaml",
      "Lean 4": "Lean",
      "Pen and Paper probably": "Pen & Paper",
      "pen": "Pen & Paper",
      "Pen": "Pen & Paper",
      "PeopleCode for 2018": "PeopleCode",
      "Perl": "Perl 5", // The years where this was asked on the survey it clearly meant Perl 5
      "pony": "Pony",
      "Ponylang": "Pony",
      "processing": "Processing",
      "q": "Q/KDB+",
      "Q": "Q/KDB+",
      "Q / kdb+": "Q/KDB+",
      "Kdb+ / Q": "Q/KDB+",
      "q/kdb+": "Q/KDB+",
      "probably racket": "Racket",
      "Racket/Scheme": "Racket",
      "Scheme/Racket": "Racket",
      "Perl 6 / Raku": "Raku",
      "Perl 6": "Raku",
      "REXX": "Rexx",
      "might try learning rust also": "Rust",
      "rockstar": "Rockstar",
      "Rockstar (just one day, to see if I could)": "Rockstar",
      "Some kind of SCHEME dialect, probably racket": "Scheme dialect",
      "Some kind of SCHEME dialect": "SCHEME dialect",
      "scheme": "Scheme",
      "SCHEME": "Scheme",
      "scratch": "Scratch",
      "smalltalk": "Smalltalk",
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
      "V (vlang.io)": "V",
      "verilog": "Verilog",
      "Vim keystrokes": "Vim",
      "Vim Script": "Vim",
      "vim": "Vim",
      "vim": "Vim",
      "WebAssembly": "WASM",
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
      "Firefox console": "Firefox",
      "Firefox Console": "Firefox",

      "Jetbrains Fleet": "Fleet",
      "JetBrains Fleet": "Fleet",
      "GameMaker Studio 2": "GameMaker",
      "geany": "Geany",
      "gedit + console": "Gedit",
      "gedit": "Gedit",
      "Notepad (vanilla)/gedit": "Gedit",
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

      "Mathematica Notebook": "Mathematica",
      "Wolfram Mathematica": "Mathematica",
      "Wolfram Notebook": "Mathematica",

      "matlab?": "Matlab",
      "matlab": "Matlab",
      "MATLAB": "Matlab",

      "Maple (is it's own REPL)": "Maple",

      "micro: https://micro-editor.github.io/": "Micro",
      "micro": "Micro",

      "my own": "My own editor!",
      "own text editor": "My own editor!",
      "my own, unpublished editor": "My own editor!",
      "My own editor": "My own editor!",
      "my own unpublished Notepad clone": "My own editor!",
      "my own Notepad clone (unpublished)": "My own editor!",

      "nano": "Nano",

      "neovim": "Neovim",
      "NeoVim": "Neovim",
      "Vscode neovim": "Neovim",

      "no IDE, just a shell": "No IDE",
      "no IDE": "No IDE",
      "None": "No IDE",
      "none": "No IDE",
      "None/a text editor": "No IDE",
      "No IDE, just a stock text editor.": "No IDE",
      "No IDE. Just a general purpose editor.": "No IDE",

      "Notepad.exe": "Notepad",

      "https://observablehq.com": "Observable",
      "https://observablehq.com/": "Observable",
      "observablehq.com": "Observable",
      "ObservableHQ": "Observable",

      "Onivim2": "OniVim2",
      "https://www.onlinegdb.com/": "OnlineGDB",
      "https://www.onlinegdb.com/online_c++_compiler": "OnlineGDB",
      "Online GDB": "OnlineGDB",
      "Onlinegdb": "OnlineGDB",
      "www.onlinegdb.com": "OnlineGDB",
      "online-python.com": "Online-python",
      "online Phyton IDE": "Online-python",
      "https://www.online-python.com/": "Online-python",
      "https://www.online-python.com": "Online-python",
      "Nova": "Panic Nova",
      "Pen and Paper probably": "Pen & Paper",
      "Pharo Smalltalk": "Pharo",
      "Smalltalk (Pharo)": "Pharo",

      "pluto": "Pluto",
      "plutojl.org": "Pluto",
      "Pluto Notebooks": "Pluto",
      "Pluto.jl": "Pluto",

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

      "SAP workbench": "SAP",

      "SAPIEN Powershell Studio": "Sapien PowerShell Studio",
      "spacemacs": "Spacemacs",
      "Swift playground": "Swift Playgrounds",

      "Anaconda/spyder": "Spyder",
      "Spyder, included in anaconda python3 distributio": "Spyder",
      "Spyder, included in anaconda python3 distribution": "Spyder",

      "Microsoft SQL Managerment Studio": "SQL Server Management Studio",
      "Microsoft SQL Server Studio": "SQL Server Management Studio",
      "SSMS": "SQL Server Management Studio",

      "StackBlitz Web Editor": "StackBlitz",
      "The 3DS game: SmileBasic 4": "SmileBASIC for 3DS",
      "SmileBasic for 3DS": "SmileBASIC for 3DS",
      "Squeak Smalltalk IDE": "Squeak",

      "Swift playground iOS": "Swift playground",
      "Swift Playgrounds for iPad": "Swift playground",
      "Swift Playgrounds on iPad/Mac": "Swift playground",

      "text editor": "Text Editor",
      "Text editor": "Text Editor",
      "text Editor": "Text Editor",
      "Terminal emulator": "Terminal",
      "tio.run": "TIO.run",
      "https://www.typescriptlang.org": "Typescript Playground",
      "Unreal Engine 4 Blueprint Graph": "Unreal Engine",
      "Unreal Engine 4": "Unreal Engine",
      "vim and a shell": "Vim",
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
      "VSCodium not full fat VSCode": "VSCodium",

      "what is even an IDE?": "What is even an IDE?",
      "what's an IDE?": "What is even an IDE?",
      "webstorm": "WebStorm",
      "Webstorm": "WebStorm",
      "Web Storm": "WebStorm",
      "Wing 101": "Wing",
      "Wing IDE": "Wing",
      "Wolfram Notebook / Mathematica Notebook": "Wolfram Notebook;Mathematica Notebook",
      "xed + gnome terminal": "xed",
      "ZeroBrane Studio": "ZeroBrane",
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

      'openbsd': 'OpenBSD',

      'unix': 'Unix',

      'Remote/Linux': 'Linux',
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

      'Cygwin': 'Windows with Cygwin',
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

      'macOS + Linux (toolchain in docker)': 'Combi of Linux/macOS',
      'Linux at home -> macOS for travel': 'Combi of Linux/macOS',
      'macOS and Linux': 'Combi of Linux/macOS',

      'IOS': 'iOS',
      'ios': 'iOS',
      'iOs': 'iOS',
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
      "": "(Blank)",

      // Other answers grouping
      "No, skill issue": "No, not skilled enough",
      "No, I'm not skilled enough to have a shot": "No, not skilled enough",
      "Skill issue": "No, not skilled enough",
      "No, I have literally no chance with my current skill level": "No, not skilled enough",
      "No, not anywhere near skilled enough": "No, not skilled enough",
      "not skilled enough": "No, not skilled enough",
      "No, not at that skill level": "No, not skilled enough",
      "No, not skillful enough.": "No, not skilled enough",
      "Not skilled enough": "No, not skilled enough",
      "Don't have the skills": "No, not skilled enough",
      "No, not enough skill": "No, not skilled enough",
      "No, I'm not skilled enough to make it there 🙃": "No, not skilled enough",
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
      'because I\'m masochistic?': 'Because I\'m masochistic',
      'because I\'m masochistic': 'Because I\'m masochistic',
      'Masochism': 'Because I\'m masochistic',

      "For the plot": "For the story",
      "for the plot!": "For the story",
      "for the story line": "For the story",
      "and for story!": "For the story",
      "for the STORY": "For the story",
      "I enjoy the story": "For the story",
      "Like the story": "For the story",
      "Funny storylines": "For the story",
      
      "For the memes": "For the memes!",
      "for the memes": "For the memes!",

      "to compete with friends": "To compete with friends",
      "To compete with my friends": "To compete with friends",
      "to compete with my friends": "To compete with friends",
      "to compete with friends also doing AoC.": "To compete with friends",
      "compete with my friends": "To compete with friends",
      "competing with friends": "To compete with friends",
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