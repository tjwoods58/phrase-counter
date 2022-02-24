# Phrase Counter

Phrase Counter will return a list of the 100 most common three word sequences inside of .txt files

## Usage
1. Make sure you have Node installed on your computer, [Link to download](https://nodejs.org/en/download/)
2. Open command line and navigate to this project's folder
3. Run npm install
4. Either pass in .txt file paths as arguments like so: ```node ./index.js ./test-files/sandwiches.txt``` (can handle multiple file paths seperated by spaces). Or pass in a .txt file path throught stdin like so: ```cat ./test-files/sandwiches.txt | node ./index.js```

## What I would do next, if given more time
1. I would have more robust unit tests and test every function
2. I would make some type of greeting message and implement a file selector from the console
3. I would make the output look better, maybe with some ascii art
4. I would figure out a way to verify correct phrase count on large texts
5. I would figure out a faster way to do the string manipulations in the beginning of getPhrases(), if possible
6. I would figure out a way to prit the correct order without sorting the phrases map, if possible
7. I would figure out how to get the console logs to show correctly when running the app in the docker container

## Bugs that I'm aware of
1. Counts words with unicode characters as seperate words rather than the same word without the unicode character
