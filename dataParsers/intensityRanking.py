import json
'''
takes all of the emotional words from defEmotionMapSlimmed.json and 
sorts them in their respective emotional catagories
'''


filepath = "./jsonFiles/defEmotionMapSlimmed.json"

rankingMap = {"anger": [],
              "sadness": [],
              "joy" : [],
              "fear": [],
              "surprise": [],
              "disgust": []}


try:
    with open(filepath, "r") as f:
        data = json.load(f)
        for word in data:
            rankingMap[data[word]['emotion']].append(data[word]['word'])

        for key, value in rankingMap.items():
            value.sort(key = lambda x: data[x]['intensity'])

except Exception as e:
    print(e)

jsonFile = open("./jsonFiles/rankedEmotionsSublist.json", "w")
json.dump(rankingMap, jsonFile)
jsonFile.close()



