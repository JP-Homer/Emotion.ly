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

for word in data:
    if (data[word]["definitions"] == []):
        del data[word]["definitions"]
    else:
        data[word]["color"] = colorMap[data[word]["emotion"]]


jsonFile = open("./jsonFiles/defEmotionMapSlimmed.json", "w")
try:
    json.dump(data, jsonFile)
except Exception as e:
    print (e)
    jsonFile.close()
jsonFile.close()