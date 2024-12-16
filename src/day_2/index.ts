import { parse } from "csv-parse";
import * as fs from 'fs';
const DELIMITER = '/n';

const stream = fs.createReadStream('/Users/lindsaydages/Desktop/app/src/day_2/data.csv');
const reportList: number[][] = [];

const isSafe = (arr: number[]): boolean => {
    // The levels are either all increasing or all decreasing.
    // Any two adjacent levels differ by at least one and at most three.
    return false;
}

const sumOfSafeReports = (listOfReports: number[][]) => {
  let sum = 0;
  for (const report of reportList){
    if(isSafe(report)){
        sum = sum + 1;
    }
  }

  return sum;
}

export default () => {
  stream
  .pipe(parse({delimiter: DELIMITER}))
  .on('data', (row) => {
    reportList.push(row[0].split(' ').map((v:string) => parseInt(v)))
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    console.log('answer', sumOfSafeReports(reportList));
    stream.close();
  });
}