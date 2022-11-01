const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text-2.txt'), 'utf-8');

console.log('Hi Dear Friend! Write some text, please!');

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
    }
);

rl.prompt();
rl.on('line', (line) => {    
    if (line.match('exit')) {
        console.log('Goodbuy, Have a great day!');
        process.exit(0);
    } else {
        writeStream.write(line + '\n');       
    }
    rl.prompt();
}).on('close', () => {
    console.log('Goodbuy, Have a great day!');
    process.exit(0);
});