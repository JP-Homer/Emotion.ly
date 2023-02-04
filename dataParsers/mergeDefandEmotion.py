import definitionAPICaller
import json


filepath = "./jsonFiles/emotionalWords.json"

file = open(filepath, "r")
try:
    emotionData = json.load(file)
except Exception as e:
    print(e)
    file.close()
file.close()

filepath = "./jsonFiles/arousalMap.json"

file = open(filepath, "r")
try:
    intensityData = json.load(file)
except Exception as e:
    print(e)
    file.close()
file.close()


wordMap = {"unadded":[]}

for emotion in emotionData:
    for word in emotionData[emotion]:
        if (word in intensityData):
            
            try:
                entry = definitionAPICaller.get_dict_entry(word)
            except ValueError:
                wordMap["unadded"].append(word)
                continue
            except Exception as e:
                print(e)
                try:
                    jsonFile = open("./jsonFiles/defEmotionMap.json", "w")
                    json.dump(wordMap, jsonFile)
                except:
                    jsonFile.close()
                jsonFile.close()

            
            print ("API CALLED")
            wordDict = {
                "word":word,
                 "emotion":emotion,
                  "intensity":intensityData[word],
                   "definitions":definitionAPICaller.get_adj_def(entry)}
            wordMap[word] = wordDict
        else:
            wordMap["unadded"].append(word)
    print(f"{emotion} has finished!!!\n\n\n\n\n")


jsonFile = open("./jsonFiles/defEmotionMap.json", "w")
json.dump(wordMap, jsonFile)
jsonFile.close()
