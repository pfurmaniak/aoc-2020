import * as fs from 'fs';

interface Passport {
    byr: number;
    iyr: number;
    eyr: number;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

const requiredProperties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const allowedEcls = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function hasAllRequiredProperties(obj: any): boolean {
    return requiredProperties.every(p => {
        return obj[p] !== undefined;
    });
}

function isValidHeight(height: string): boolean {
    const regex = /([0-9]+)([a-z]+)/;
    const matches = height.match(regex);
    if (matches && matches.length >= 3) {
        const n = Number(matches[1]);
        const unit = matches[2];
        if (unit === 'cm') {
            return n >= 150 && n <= 193;
        }
        if (unit === 'in') {
            return n >= 59 && n <= 76;
        }
    }
    return false;
}

function isValidHairColor(hairColor: string): boolean {
    const regex = /#[a-f0-9]{6}/g;
    return regex.test(hairColor);
}

function isValidPassportId(passportId: string): boolean {
    const regex = /^[0-9]{9}$/;
    return regex.test(passportId);
}

function isValid(p: Passport): boolean {
    return p.byr >= 1920 && p.byr <= 2002 &&
        p.iyr >= 2010 && p.iyr <= 2020 &&
        p.eyr >= 2020 && p.eyr <= 2030 &&
        isValidHeight(p.hgt) &&
        isValidHairColor(p.hcl) &&
        allowedEcls.includes(p.ecl) &&
        isValidPassportId(p.pid);
}

fs.readFile('../input/day4.in', 'utf8', (err, data) => {
    const passports: Passport[] = data.split('\r\n\r\n')
        .map(p => p.replace(/([a-z]+):([A-Za-z0-9#@]+)/g, '"$1":"$2",'))
        .map(p => p.substring(0, p.length - 1))
        .map(p => `{${p}}`)
        .map(p => JSON.parse(p, (key, value) => key.endsWith('yr') ? Number(value) : value));
    const result1 = passports.filter(p => hasAllRequiredProperties(p)).length;
    const result2 = passports.filter(p => isValid(p)).length;
    console.log(result1, result2);
});