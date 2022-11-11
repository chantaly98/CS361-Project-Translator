# (CCA) Component-Counter-Analysis #

import time, json


def main():
    def CCA(data, cmpr=None):
        """
        The Component-Counter-Analysis
        - Takes data (string)
        - Analyze its components count
        - Returns the analysis (dictionary)
        The analysis can be indexed by 'characters', 'words', or 'paragraphs'
        to return the corresponding count
        The CCA can be used to compare analysis
        - Takes two (CCAs) analyzed data
        - Analyze the comparison
        - Returns the comparison (string)
        """
        try:
            if not cmpr:
                return Analysis(data).analysis()
            else:
                if data['characters'] == cmpr['characters']:
                    ci, cc = 0, f"Both data have the same characters count ({data['characters']})."
                elif data['characters'] > cmpr['characters']:
                    ci, cc = 1, f"The first data has {data['characters'] - cmpr['characters']} characters more than the other one."
                else:
                    ci, cc = 2, f"The second data has {cmpr['characters'] - data['characters']} characters more than the other one."

                if data['words'] == cmpr['words']:
                    wi, wc = 0, f"both data have the same words count ({data['words']})."
                elif data['words'] < cmpr['words']:
                    wi, wc = 2, f"the first data has {cmpr['words'] - data['words']} words less than the other one."
                else:
                    wi, wc = 1, f"the second data has {data['words'] - cmpr['words']} words less than the other one."

                if data['paragraphs'] == cmpr['paragraphs']:
                    pc = f"both data have the same paragraphs count ({data['paragraphs']})."
                elif data['characters'] > cmpr['characters']:
                    pc = f"the first data has {data['paragraphs'] - cmpr['paragraphs']} paragraphs more than the other one."
                else:
                    pc = f"the second data has {cmpr['paragraphs'] - data['paragraphs']} paragraphs more than the other one."

                if ci == wi:
                    ai = " And "
                else:
                    ai = " However, "
                return f"{cc}{ai}{wc}\nAlso, {pc}"
        except:
            return "Data has to be a string OR both data have to be (CCAs) analyzed data."

    class Analysis:
        """
        Analysis of CCA
        """
        def __init__(self, data):
            self._data = data
            self._characters = 0
            self._words = 0
            self._paragraphs = 0

        def counter(self):
            """
            Counts characters, words, and paragraphs of data
            """
            wordp, paragraphp = True, True  #possibility
            for i in range(len(self._data)):
                self._characters += 1
                if self._data[i].isalpha() or self._data[i] == "'":
                    if wordp:
                        self._words += 1
                        wordp = None
                        if paragraphp:
                            self._paragraphs += 1
                            paragraphp = None
                else:
                    wordp = True
                    if self._data[i] == '\n':
                        paragraphp = True

        def analysis(self):
            """
            The analysis as a dictionary of data components & their counts
            """
            self.counter()
            return {
                'characters': self._characters,
                'words': self._words,
                'paragraphs': self._paragraphs
            }

    while True:
        time.sleep(1)
        with open('comm.txt', 'r') as comm:
            if comm.read() == "run":
                open('comm.txt', 'w').close()
                with open('CCAc.json', 'r') as request:
                    data = json.load(request)
                    if type(data) == str:
                        analysis = CCA(data)
                    else:
                        analysis = CCA(data['1'], data['2'])
                    open('CCAc.json', 'w').close()
                    with open('CCAc.json', 'w') as response:
                        json.dump(analysis, response)


if __name__ == '__main__':
    main()