import json

filepath = "NRC-VAD-Lexicon.txt"

file = open(filepath, "r")

dominanceMap = {}
try:
    fileLines = file.readlines()
except Exception as e:
    print (e)
    file.close()        


for line in fileLines:
    #each space between data is a special Large Space character
    dominanceMap[line[:-19]] = float(line[-5:].strip())

jsonFile = open("dominanceMap.json", "w")
json.dump(dominanceMap, jsonFile)
jsonFile.close()