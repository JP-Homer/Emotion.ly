import json

'''
takes the rankedEmotionsSublist.json and associates each word with its information dictionary maintaining order
'''

sortedMap = {
"anger": {},
"sadness": {},
"joy" : {},
"fear": {},
"surprise": {},
"disgust": {}
}

filepath = "./jsonFiles/rankedEmotionsSublist.json"

try:
    with open(filepath, "r") as f:
        rankingData = json.load(f)
except Exception as e:
    print(e)

filepath = "./jsonFiles/defEmotionMapSlimmed.json"

try:
    with open(filepath, "r") as f:
        wordData = json.load(f)
except Exception as e:
    print(e)


for emotion in rankingData:
    index = 0
    for word in rankingData[emotion]:
        wordData[word]["index"] = index
        sortedMap[emotion][word] = wordData[word]
        index += 1


jsonFile = open("./jsonFiles/rankedEmotionsSublistObjects.json", "w")
json.dump(sortedMap, jsonFile)
jsonFile.close()



