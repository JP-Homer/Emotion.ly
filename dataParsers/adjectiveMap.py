import json
from definitionAPICaller import get_dict_entry, is_adj

filepath = "./jsonFiles/emotionalWords.json"

emotionalWordsAdj = {"anger":[], "disgust":[], "joy":[], "surprise":[], "fear":[], "sadness":[]}

try:
    with open(filepath, "r") as f:
        allData = json.load(f)
        for emotion, wordList in allData.items():
            # If the value is an adjective, add it to the cut-down dictionary
            for word in wordList:
                print(word)
                try:
                    dict_entry = get_dict_entry(word)
                    if is_adj(dict_entry):
                        emotionalWordsAdj[emotion].append(word)
                except:
                    continue
except Exception as e:
    print(e)


jsonFile = open("./jsonFiles/emotionalWordsAdj.json", "w")
json.dump(emotionalWordsAdj, jsonFile)
jsonFile.close()