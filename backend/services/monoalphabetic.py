import string

def execute_mapping(input, old_dict, new_dict):
    mapping = ''
    for character in input:
        is_upper = character.isupper()
        character = character.lower()
        if character in old_dict:
            mindex = old_dict.index(character)
            if (is_upper):
                mapping += new_dict[mindex].upper()
            else:
                mapping += new_dict[mindex]
        else:
            mapping += character
    return mapping

def encode_monoalphabetic(text, key):
    alphabet = list(string.ascii_lowercase)
    result = execute_mapping(text, alphabet, key.lower())
    return result

def decode_monoalphabetic(cipher, key):
    alphabet = list(string.ascii_lowercase)
    result = execute_mapping(cipher, key.lower(), alphabet)
    return result

def generatem_key():
    return "PVRHOWXUMYFKELQCIBANTGDSZJ"
