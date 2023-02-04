import json

emotions = {
    "anger": {}, 
    "disgust": {},
    "joy": {},
    "fear": {}, 
    "surprise": {}, 
    "sadness": {}
}

filepath = "./jsonFiles/defEmotionMapSlimmed.json"

file = open(filepath, "r")
try:
    data = json.load(file)
except Exception as e:
    print(e)
    file.close()
file.close()


for word in data:
    emotions[data[word]["emotion"]][word] = data[word]

jsonFile = open("./jsonFiles/emotionLists.json", "w")
try:
    json.dump(emotions, jsonFile)
except Exception as e:
    print (e)
    jsonFile.close()
jsonFile.close()
