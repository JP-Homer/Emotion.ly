import json

filepath = "emotions.csv"

file = open(filepath, "r")
#anger disgust joy suprise fear sad
emotionMap = {"anger":[], "disgust":[], "joy":[], "surprise":[], "fear":[], "sadness":[]}
try:
    fileLines = file.readlines()
except Exception as e:
    print (e)
    file.close()        


for line in fileLines:
    #each space between data is a special Large Space character
    word, emotion = line.strip().split(",")
    emotionMap[emotion].append(word)

jsonFile = open("emotionalWords.json", "w")
json.dump(emotionMap, jsonFile)
jsonFile.close()