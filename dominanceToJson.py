import json

filepath = "NRC-VAD-Lexicon.txt"

file = open(filepath, "r")

arousalMap = {}
try:
    fileLines = file.readlines()
except Exception as e:
    print (e)
    file.close()        


for line in fileLines:
    #each space between data is a special Large Space character
    arousalMap[line[:-19]] = float(line[-11:-6].strip())

jsonFile = open("arousalMap.json", "w")
json.dump(arousalMap, jsonFile)
jsonFile.close()