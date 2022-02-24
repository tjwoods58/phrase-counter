const phraseCounter = require('./phrase-counter');
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

describe('phrase counter', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  test('should return usage message if no file paths provided', () => {
    phraseCounter.getFilePaths([], true, null);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('Please pass in a file path by stdin or file paths seperated by a space by command line arguments');
  });

  test('should call processArgs if file paths are passed in as arguments', async () => {
    const spy = jest.spyOn(phraseCounter, 'processArgs');
    phraseCounter.getFilePaths(['test.txt'], true, null);
    await new Promise((x) => setTimeout(x, 2000));
    expect(spy).toHaveBeenCalled();
  });

  test('should call processStdin if file paths are passed in as stdin', () => {
    const spy = jest.spyOn(phraseCounter, 'processStdin');
    phraseCounter.getFilePaths([], false, { on: function() {return null;}});
    expect(spy).toHaveBeenCalled();
  });

  test('should set phrases based on passed in text', () => {
    const mockFile = `"I love
    sandwiches."
    "(I LOVE SANDWICHES!!)")
    `;
    const mockPhraseMap = new Map();
    mockPhraseMap.set('i love sandwiches', 2);
    mockPhraseMap.set('love sandwiches i', 1);
    mockPhraseMap.set('sandwiches i love', 1);
    phraseCounter.getPhrases(mockFile);
    expect(phraseCounter.phrases).toEqual(mockPhraseMap);
  });
});