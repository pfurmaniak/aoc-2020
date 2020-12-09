import * as fs from 'fs';

export interface Slope {
    right: number;
    down: number;
}

function countTrees(lines: string[], slope: Slope): number {
    const width = lines[0].length - 1;
    let coords = { x: 0, y: 0 };
    let count = 0;
    while (coords.y < lines.length - 1) {
        coords = { y: coords.y + slope.down, x: coords.x + slope.right };
        if (lines[coords.y][coords.x % width] === '#') {
            count = count + 1;
        }
    }
    return count;
}

fs.readFile('../input/day3.in', 'utf8', (err, data) => {
    const lines = data.split('\n');
    const slopes: Slope[] = [
        { right: 3, down: 1 },
        { right: 1, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 }
    ];
    const results = slopes.map(s => countTrees(lines, s));

    console.log(results[0], results.reduce((a, b) => a * b));
});