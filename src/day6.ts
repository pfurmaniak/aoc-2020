import * as fs from 'fs';

fs.readFile('../input/day6.in', 'utf8', (err, data) => {
    const groups = data.split('\r\n\r\n').map(g => g.split('\r\n'));
    const sets = groups.map(g => {
        const concat = g.reduce((a, b) => a + b);
        return new Set(concat);
    });
    console.log(sets.map(s => s.size).reduce((a, b) => a + b));
});