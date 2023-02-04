import requests
import json

def get_dict_entry(word : str) -> dict:
    '''
    given a word will call api for that word and return its values in python dictionary format
    '''
    response = requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    if (response.status_code >= 400):
        raise ValueError(f"the word {word} could not be found in dictionary")
    response = json.dumps(response.json())
    entry = json.loads(response)[0]
    return entry

def get_adj_def(entry : dict) -> list[str]:
    '''
    returns all adj definitions of a given dictionary entry if none are present returns an empty list
    '''
    defs = []
    for def_type in entry["meanings"]:
        if (def_type["partOfSpeech"] == "adjective"):
            for definition in def_type["definitions"]:
                defs.append(definition["definition"])
    return(defs)

def is_adj(entry : dict) -> bool:
    '''
    given a dictionary entry returns if entry contains an adj definition
    '''
    for def_type in entry["meanings"]:
        if (def_type["partOfSpeech"] == "adjective"):
            return True
    return False


if (__name__ == '__main__'):
    entry = get_dict_entry("surprised")
    # print(get_adj_def(entry))
    # print(is_adj(entry))
    pass
