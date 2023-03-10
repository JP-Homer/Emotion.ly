import re
import json

#TODO
# Receive the string from the front end

def return_surrounding_words(index : int, emotion : str, radius : int) -> list[list, list]:
    '''
    given an index and an emotion will return words that suround that index in ranking of that emotion
    '''
    filepath = "./jsonFiles/rankedEmotionsSublist.json"
    file = open(filepath, "r")

    try:
        rankedData = json.load(file)
    except Exception as e:
        print(e)
    finally:
        file.close()
    
    if (index - radius < 0):
        radius += -1*(index - radius)
    elif (index + radius > len(rankedData[emotion]) - 1):
        radius += index + radius - len(rankedData[emotion]) + 1



    leftwords = []
    for i in range(index - radius, index):
        if (i >= 0):
            leftwords.append(rankedData[emotion][i])
    rightwords = []
    for i in range(index + 1, index + radius + 1):
        if (i < len(rankedData[emotion])):
            rightwords.append(rankedData[emotion][i])
    
    return [leftwords, rightwords]

def find_surroundings(word : str, radius : int) -> dict:
    '''
    given a word and radius will return the words of that emotion that surround it in ranking
    '''
    filepath = "./jsonFiles/rankedEmotionsSublistObjects.json"
    file = open(filepath, "r")

    try:
        rankedData = json.load(file)
    except Exception as e:
        print(e)
    finally:
        file.close()
    
    returnData = {}

    for emotion in rankedData:
        if (word in rankedData[emotion]):
            wordData = rankedData[emotion][word]
            
            returnData["word"] = word
            returnData["base"] = wordData["emotion"]
            returnData["color"] = wordData["color"]

            left_words, right_words = return_surrounding_words(wordData["index"], wordData["emotion"], radius)

            difference = wordData["index"]
            if (len(left_words) != 0):
                difference = rankedData[emotion][left_words[0]]["index"]
            
            returnData["rank"] = wordData["index"] - difference

            returnData["words"] = []
            for lword in left_words:
                wordDict = {"word" : lword}
                wordDict["definition"] = rankedData[emotion][lword]["definitions"]
                wordDict["rank"] = rankedData[emotion][lword]["index"] - difference

                returnData["words"].append(wordDict)
            
            wordDict = {"word" : word}
            wordDict["definition"] = rankedData[emotion][word]["definitions"]
            wordDict["rank"] = rankedData[emotion][word]["index"] - difference

            returnData["words"].append(wordDict)
            
            for rword in right_words:
                wordDict = {"word" : rword}
                wordDict["definition"] = rankedData[emotion][rword]["definitions"]
                wordDict["rank"] = rankedData[emotion][rword]["index"] - difference

                returnData["words"].append(wordDict)
    
    return returnData
            


def parse_string(string : str) -> list:
    '''
    given sentance string returns all words in form of list, removes non letter words
    '''
    listWords = string.split()
    stripList = []

    for word in listWords:
        stripWord = re.sub(r'[^\w\s]','', word)
        stripWord = stripWord.lower()
        stripList.append(stripWord)

    return stripList

def find_adjective(sentance : str) ->list:
    '''
    given sentance, removes words containing non-alphabetic characters and returns 
    all adjectives as a list
    '''

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
    for word in parse_string(sentance):
        if word in allData:
            onlyAdj.append(word)

    file.close()

    return onlyAdj


def get_adjective_info(sentance : str, radius : int) -> dict:
    '''
    takes a sentance and returns the adjectives in it, each adjective has a
    dictionary with its attributes as well as the words of a similar intensity 
    and emotion
    '''
    return_values = []
    for adjective in find_adjective(sentance):
        return_values.append(find_surroundings(adjective, radius))
    return return_values

if __name__ == "__main__":
    # print(find_adjective("hello, there HOW'RE you you abhorrent man with a happy, ugly walk"))
    # print (find_surroundings("dun", 5))
    # print (get_adjective_info("hello, there HOW'RE you you abhorrent man with a happy, ugly walk", 2))
    
    print (get_adjective_info("mad", 10))
    pass
