import * as fs from 'fs';

function parseSeat(seat: string): number {
    const binary = seat.replace(/F|L/g, '0').replace(/B|R/g, '1');
    console.log(binary);
    return parseInt(binary, 2);
}

fs.readFile('../input/day5.in', 'utf8', (err, data) => {
    const lines = data.split('\n').map(l => ({
        row: parseSeat(l.substring(0, 7)),
        column: parseSeat(l.substring(7))
    }));
    const seatIds = lines.map(l => l.row * 8 + l.column);
    console.log(Math.max(...seatIds));
});