import json
'''
converts CSV file to a JSON of a dictionary with the six emotions 
associated with a list of all of that emotion's words
'''

filepath = "./rawData/emotions.csv"

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

jsonFile = open("./jsonFiles/emotionalWords.json", "w")
json.dump(emotionMap, jsonFile)
jsonFile.close()