import * as fs from 'fs';

const stream = fs.createReadStream('src/day_3/data.txt');
let text: string = '';


const findMatches = (text: string): string[] => {
    const regex = /mul\(\d+,\d+\)/g;
    const matches = [...text.matchAll(regex)];
    const clean = matches.map(match => {
        return match[0];
    });
    return clean;
}



const multiplyAndSum = (muls: string[]) => {
    let sum = 0;


    for (const mul of muls){    
        const nums = mul.split('(')[1].split(',');
        const num1 = parseInt(nums[0]);
        const num2 = parseInt(nums[1].replace(')', ''));

        sum += num1 * num2;
    }

    return sum;
}



export default () => {
  stream
  .on('data', (row) => {
    text += row.toString();
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    const matches = findMatches(text);
    const sum = multiplyAndSum(matches);
    console.log('sum', sum);
    stream.close();
  });
}