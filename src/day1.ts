import * as fs from 'fs';

function findSum(array: number[], sum: number): number {
    for (const n of array) {
        const m = array.find(x => x + n === sum);
        if (m) {
            return n * m;
        }
    }
    throw new Error('Not found');
}

function findTripleSum(array: number[], sum: number): number {
    for (const n of array) {
        for (const m of array) {
            for (const o of array) {
                if (n + m + o === sum) {
                    return n * m * o;
                }
            }
        }
    }
    throw new Error('Not found');
}

fs.readFile('../input/day1.in', 'utf8', (err, data) => {
    const lines = data.split('\n').map(Number);
    const result1 = findSum(lines, 2020);
    const result2 = findTripleSum(lines, 2020);
    console.log(result1, result2);
});