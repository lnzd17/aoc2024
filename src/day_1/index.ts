import { parse } from "csv-parse";
import * as fs from 'fs';
const DELIMITER = '  ';
const aToB = (a: number, b: number) => a-b;

const stream = fs.createReadStream('src/day_1/data.csv');
const arr1: number[] = [];
const arr2: number[] = [];

const getSumOfInbetweenTotalDistances = () => {
  arr1.sort(aToB);
  arr2.sort(aToB);

  if(arr1.length !== arr2.length){
    throw new Error('inputs need to be the same size');
  }

  let sum = 0;

  for (let i = 0; i < arr1.length; i++) {
    const diff = Math.abs(arr1[i] - arr2[i]);
    sum = sum + diff;
  }

  return sum;
}

export default () => {
  stream
  .pipe(parse({delimiter: DELIMITER}))
  .on('data', (row) => {
    arr1.push(parseInt(row[0]));
    arr2.push(parseInt(row[1]));
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    console.log('answer', getSumOfInbetweenTotalDistances());
    stream.close();
  });
} 





