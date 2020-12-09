import * as fs from 'fs';

export interface Entry {
    min: number;
    max: number;
    letter: string;
    password: string;
}

function isValid1(entry: Entry): boolean {
    const regex = new RegExp(entry.letter, 'g');
    const occurences = (entry.password.match(regex) || []).length;
    if (occurences >= entry.min && occurences <= entry.max) {
        return true;
    }
    return false;
}

function isValid2(entry: Entry): boolean {
    const l1 = entry.password[entry.min - 1] === entry.letter
    const l2 = entry.password[entry.max - 1] === entry.letter;
    if ((l1 && !l2) || (!l1 && l2)) {
        return true;
    }
    return false;
}

fs.readFile('../input/day2.in', 'utf8', (err, data) => {
    const lines = data.split('\n').map(x => x.split(': '));
    const entries: Entry[] = lines.map(([policy, password]) => {
        const [numbers, letter] = policy.split(' ');
        const [min, max] = numbers.split('-');
        return { min: Number(min), max: Number(max), letter, password };
    });
    const validCount1 = entries.filter(e => isValid1(e)).length;
    const validCount2 = entries.filter(e => isValid2(e)).length;
    console.log(validCount1, validCount2);
});