import sys
import string
import random
sys.path.append("..")
from common.base64_table import generate_base64_mapping

ALLOWED_TO_DISPLAY = 13

def filtered_homophonic_table(key):
    filtered = {}
    full_table = generate_homophonic_table(key)
    permitted = list(string.ascii_lowercase)
    allowed = 0
    while (allowed < ALLOWED_TO_DISPLAY):
        i = allowed
        filtered[permitted[i]] = full_table[permitted[i]]
        allowed += 1
    return filtered

def base64_homophonic_table(key):
    table = generate_homophonic_table(key)
    columns = []
    values = []
    for header in table:
        columns.append(str(repr(header)))
    for index, _ in enumerate(list(key)):
        row = []
        for header in table:
            row.append(table[header][index])
        values.append(row)
    return generate_base64_mapping(values, columns, key)

def generate_homophonic_table(key):
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

def encode_homophonic(text, key):
    cipher = ''
    mappings = generate_homophonic_table(key)
    for character in text:
        candidates = mappings[character]
        key = random.choice(candidates)
        cipher += f'{key} '
    cipher = cipher.strip()
    return cipher

def decode_homophonic(cipher, key):
    text = ''
    mappings = generate_homophonic_table(key)
    for code in cipher.split():
        for entry in mappings:
            if int(code) in mappings[entry]:
                text += entry
    return text
