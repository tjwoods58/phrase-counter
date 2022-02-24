const fs = require('fs');

class PhraseCounter {
    phrases = new Map();

    getFilePaths(filePaths, isNotStdin, filePathStdin) {
        if (isNotStdin && filePaths.length === 0) {
            console.log('Please pass in a file path by stdin or file paths seperated by a space by command line arguments');
        } else if(isNotStdin && filePaths.length !== 0) {
            this.processArgs(filePaths);
        } else {
            this.processStdin(filePathStdin);
        }
    }

    processStdin(filePathStdin) {
        let file = '';

        filePathStdin.on('readable', () => {
            const chuck = filePathStdin.read();
            if(chuck !== null){
                file += chuck;
            }
        });

        filePathStdin.on('end', () => {
            this.getPhrases(file);
            this.printResult();
        });
    }

    processArgs(filePaths) {
        Promise.all(filePaths.map(this.getFile))
        .then((files) => {
            files.forEach((file) => {
                this.getPhrases(file);
            });
            
            this.printResult();
        })
        .catch(() => {
            console.log('Error while proccessing files, make sure these files exist and please try again');
        });
    }

    getFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) { 
                    reject(error); 
                } else {
                    resolve(data);
                }
            });
        });
    }

    getPhrases(file) {
        file = file.replace(/(\r\n|\n|\r)/gm, ' ');
        file = file.replace(/\s+/g, ' ').trim();
        file = file.replace(/[&\/\\#,+()$%":*<>{}`;@=“”_~.?!]/g, '');
        file = file.toLowerCase();
        const fileArray = file.split(' ');

        fileArray.forEach((currentWord, index) => {
            const firstWord = fileArray[index - 1];
            let thirdWord = fileArray[index + 1];

            if(firstWord && thirdWord) {
                const phrase = `${firstWord} ${currentWord} ${thirdWord}`;
                let phraseCount = this.phrases.get(phrase);

                if(phraseCount) {
                    phraseCount++;
                    this.phrases.set(phrase, phraseCount);
                } else {
                    this.phrases.set(phrase, 1);
                }
            }
        });
    }

    printResult() {
        const sortedPhrases = new Map([...this.phrases.entries()].sort((a, b) => b[1] - a[1]));
        let index = 1;

        for (let [phrase, count] of sortedPhrases) {
            if(index < 101) {
                console.log(`${phrase} - ${count}`);
                index++;
            } else {
                break;
            }
        }
    }
}

module.exports = new PhraseCounter();