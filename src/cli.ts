#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { validatePizza } from './validatePizza';

function main() {
    const { positionals } = parseArgs({ allowPositionals: true });

    const filePath = positionals[0];
    if (!filePath) {
        console.error('Please input a valid file path.');
        process.exitCode = 2;
        return;
    }

    try {
        const raw = readFileSync(filePath, 'utf8');
        const obj = JSON.parse(raw);

        const result = validatePizza(obj);
        if (result.isPizza) {
            console.log('Valid pizza!');
            console.log(result.pizza);
        } else {
            console.log('Not a pizza.');
            for (const err of result.errors) {
                console.log(`Error ${err}`);
            }
            process.exitCode = 1;
        }
    } catch (err) {
        console.error(`Failed to read/parse file: ${filePath}`);
        process.exitCode = 2;
    }
}

main();
