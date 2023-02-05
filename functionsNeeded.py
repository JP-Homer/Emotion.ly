import re
import json

#TODO
#given word return all values around given threshold explicit placement in range
# Receive the string from the front end
#format json
    # emotion(base)
    # color()
    # words()
    #     word[definition]



def return_surroundings(word : str, radius : int) -> list:
    filepath = "./jsonFiles/defEmotionMapSlimmed.json"
    file = open(filepath, "r")

    try:
        wordData = json.load(file)
    except Exception as e:
        print(e)
    finally:
        file.close()
    
    



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




if __name__ == "__main__":
    # print(find_adjective("hello, there HOW'RE you you abhorrent man with a happy, ugly walk"))
    pass
