import json
import string
import random

def generate_homophonic_table(key):
    key = key.lower()
    mappings = {}
    alphabet = list(string.printable)
    for character in alphabet:
        mappings[character] = []
    count = 1
    for anchor in key:
        mappings[anchor].append(count)
        not_scanned = len(alphabet) - 1
        previous = anchor
        while (not_scanned > 0):
            count += 1
            aindex = alphabet.index(previous) + 1
            if (aindex > len(alphabet) - 1):
                aindex %= len(alphabet)
            previous = alphabet[aindex]
            mappings[previous].append(count)
            not_scanned -= 1
        count += 1
    # print(json.dumps(mappings, indent=2))
    return mappings

def encode_black_chamber(text, key):
    cipher = ''
    mappings = generate_homophonic_table(key)
    for character in text:
        candidates = mappings[character]
        key = random.choice(candidates)
        cipher += f'{key} '
    cipher = cipher.strip()
    return cipher

def decode_black_chamber(cipher, key):
    text = ''
    mappings = generate_homophonic_table(key)
    for code in cipher.split():
        for entry in mappings:
            if int(code) in mappings[entry]:
                text += entry
    return text


#KEY = 'thiskeyisverylong'
#cipher = encode_black_chamber('Hey Betty! How are you doing? I hope everything is well...', KEY)
#print(decode_black_chamber(cipher, KEY))