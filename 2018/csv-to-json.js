const fs = require('fs');
const parse = require('csv-parse');

const options = {
  delimiter: ',',
  escape: '"',
  columns: true,
};

const raw = fs.readFileSync('2018/results-raw.csv', { encoding: 'utf8' });

const columns = {
  'Timestamp': {
    header: 'Timestamp',
    postProcess: x => (new Date(x)).toISOString(),
  },
  'Have/will you get at least one ⭐ in Advent of Code 2018?': {
    header: 'Participates_in_2018',
    answers: {
      'No': 'No',
      'Yes, (mostly) in december 2018': 'Dec',
      'Yes, (mostly) after 2018': 'Later',
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
  'Primary language(s) for AoC 2018?': {
    header: 'Languages',
     multi: true,
     answers: {
       'Wolfram Language / Mathematica': 'Wolfram;Mathematica',
       'WolfLang': 'Wolfram',
       'Tcl for each + a different language each day': 'Tcl;Each day a different language',
       'Some kind of SCHEME dialect': 'SCHEME dialect',
       'Some kind of SCHEME dialect, probably racket': 'Scheme dialect',
       'Squeam (a Lisp dialect I made up)': 'Squeam (own Lisp dialect)',
       'Racket/Scheme': 'Scheme/Racket', // So that they sort together
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
  'Primary IDE(s) for AoC 2018?': {
    header: 'IDEs',
    multi: true,
    answers: {
      'Visual Studio Code': 'VS Code',
      'Python IDLE': 'IDLE',
      'Jetbrains Rider': 'Rider',
      'JetBrains Rider': 'Rider',
      'Jupyter Notebook': 'Jupyter',
      'vim and a shell': 'Vim',
      'CodeBlocks': 'Code::Blocks',
      'gedit + console': 'Gedit',
      'Wolfram Notebook / Mathematica Notebook': 'Wolfram Notebook;Mathematica Notebook',
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
  'Primary OS for AoC 2018?': {
    header: 'OS',
    answers: {
      'Chrome OS': 'ChromeOS',
      'Running a linux command line VM in windows...  Mark that how you want.': 'Linux', // Well don't mind if I do!
      'windows for development, commodore 64 (emulator) for running the programs': 'Windows', // So sorry for stripping this cool answer (just to make the data viz look okay)! Will promise next year to include "Cool remarks about your setup?" question for this shizzl...
      'Windows / Linux 50/50': 'Combi of Windows/Linux',
      'Windows + Linux Subsystem': 'Combi of Windows/Linux',
      'Windows+Linux': 'Combi of Windows/Linux',
      'WSL ubuntu': 'Combi of Windows/Linux',
      'Ubuntu': 'Linux',
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
        const preProcess = info.preProcess || (a => a);
        const postProcess = info.postProcess || (a => a);

        item[newProp] = info.hasOwnProperty('answers') ? info.answers[record[prop]] || record[prop] : record[prop];

        item[newProp] = preProcess(item[newProp]);

        if (info.multi) {
          item[newProp] = item[newProp]
            .split(';')
            .map(x => x.trim())
            .map(x => info.hasOwnProperty('answers') ? info.answers[x] || x : x)
            .map(x => x.trim())
            .map(x => postProcess(x))
            .filter(x => !!x && x.length > 1);
        } else {
          item[newProp] = postProcess(item[newProp].trim());
        }
      });
    return item;
  });

  console.log(result);

  fs.writeFileSync('2018/results-sanitzed.json', JSON.stringify(result, null, 2), { encoding: 'utf8' });
}

parse(raw, options, callback);
