import json

filepath = "./jsonFiles/defEmotionMap.json"

file = open(filepath, "r")
try:
    data = json.load(file)
except Exception as e:
    print(e)
    file.close()
file.close()

del data["unadded"]

colorMap = {"anger":"red", "disgust":"green", "joy":"yellow", "surprise":"orange", "fear":"black", "sadness":"blue"}

toDelete = []
for word in data:
    if (data[word]["definitions"] == []):
        toDelete.append(word)
    else:
        data[word]["color"] = colorMap[data[word]["emotion"]]

for word in toDelete:
    del data[word]

jsonFile = open("./jsonFiles/defEmotionMapSlimmed.json", "w")
try:
    json.dump(data, jsonFile)
except Exception as e:
    print (e)
    jsonFile.close()
jsonFile.close()