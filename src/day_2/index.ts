import { parse } from "csv-parse";
import * as fs from 'fs';
const DELIMITER = '/n';

const stream = fs.createReadStream('src/day_2/data.csv');
const reportList: number[][] = [];

const isSafe = (arr: number[]): boolean => {
    // The levels are either all increasing or all decreasing.
    // Any two adjacent levels differ by at least one and at most three.

    let correctDiff = true;

    const increasing = arr.every((current, index, arr) => {
      if (index === 0) {
        return true;
      }else{
        return current > arr[index - 1];
      }
    });
    
    const decreasing = arr.every((current, index, arr) => {
      if (index === 0) {
        return true;
      }else{
        return current < arr[index - 1];
      }
    });
    
    for (let i = 0; i < arr.length; i++ ){
      const prev = arr[i - 1];
      const current = arr[i];

      if(Math.abs(current - prev) > 3){
        correctDiff = false;
      }
    }

    return (increasing || decreasing) && correctDiff;
}


const couldBeSafe = (arr: number[]) => {
  for (let n = 0; n < arr.length; n++) {
    
    const newReport = arr.slice(0);
    
    newReport.splice(n, 1);
    
    if (isSafe(newReport)) { return true };
  }
  return false;
}

const sumOfSafeReports = (listOfReports: number[][]) => {
  let sum = 0;
  for (const report of listOfReports){
    if(isSafe(report)){
        sum = sum + 1;
    }else{
      if(couldBeSafe(report)){
        sum = sum + 1;
      }
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