import * as fs from 'fs';

export interface Instruction {
    type: 'nop' | 'jmp' | 'acc';
    offset: number;
}

function findLoop(instructions: Instruction[]): number {
    const indexesRun: number[] = [];
    let index = 0;
    let acc = 0;
    while (!indexesRun.includes(index)) {
        indexesRun.push(index);
        const i = instructions[index];
        switch (i.type) {
            case 'nop':
                index = index + 1;
                break;
            case 'acc':
                index = index + 1;
                acc = acc + i.offset;
                break;
            case 'jmp':
                index = index + i.offset;
                break;
        }
    }
    return acc;
}

fs.readFile('../input/day8.in', 'utf8', (err, data) => {
    const instructions = data.split('\r\n').map(l => {
        const line = l.split(' ');
        return <Instruction>{ type: line[0], offset: Number(line[1]) };
    });
    console.log(findLoop(instructions));
});