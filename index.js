#!/usr/bin/env node
const phraseCounter = require('./phrase-counter/phrase-counter');

function init() {
    const filePaths = process.argv.slice(2);
    const isNotStdin = process.stdin.isTTY;
    const filePathStdin = process.stdin;
    phraseCounter.getFilePaths(filePaths, isNotStdin, filePathStdin);
}

init();