import json

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
    for word in rankingData[emotion]:
        sortedMap[emotion][word] = wordData[word]


jsonFile = open("./jsonFiles/rankedEmotionsSublistObjects.json", "w")
json.dump(sortedMap, jsonFile)
jsonFile.close()



