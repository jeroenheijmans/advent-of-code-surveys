import fs from 'fs';
import { parse } from 'csv-parse';
import { getParseCallback, csvOptions } from '../_shared/csv-to-json-utils.js';

const raw = fs.readFileSync('2020/results-raw.csv', { encoding: 'utf8' });
parse(raw, csvOptions, getParseCallback('2020'));
