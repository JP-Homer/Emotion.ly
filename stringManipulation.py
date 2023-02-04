import re
import json

# Receive the string from the front end


# Parse the input sentence to break it down into a list of its words
def parse_string(string : str):
    listWords = string.split()
    stripList = []

    for word in listWords:
        stripWord = re.sub(r'[^\w\s]','', word)
        stripWord = stripWord.lower()
        stripList.append(stripWord)

    return stripList

# Go through the stripped list of words and find only the adjectives
def find_adjective(words : list):
    # Open the json
    filepath = "./jsonFiles/defEmotionMapSlimmed.json"
    file = open(filepath, "r")

    try:
        allData = json.load(file)
    except Exception as e:
        print(e)
    finally:
        file.close()

    onlyAdj = []
    for word in words:
        if word in allData:
            onlyAdj.append(word)

    file.close()

    return onlyAdj


if __name__ == "__main__":
    parsed = parse_string("hello, there HOW'RE you you abhorrent man with a happy, ugly walk")
    print(find_adjective(parsed))
