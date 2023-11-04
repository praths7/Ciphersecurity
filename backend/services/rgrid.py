import copy
import random
import string

RELATION = '$'
SEPERATOR = '?'
NUMBER_OF_COLUMNS = 5

alphabet = list(string.printable)[:-5]

def numerise_key(key):
    length = len(key)
    value = 0
    for k in key:
        value += max(length, 1) * alphabet.index(k)
        length -= 1
    return value

def generate_rgrid(key):
    seed = numerise_key(key)
    shuffled = copy.copy(alphabet)
    random.Random(seed).shuffle(shuffled)
    rgrid = []
    row = []
    i = len(alphabet) - 1
    while (i >= 0):
        row.append(shuffled[i])
        if (i % NUMBER_OF_COLUMNS == 0):
            rgrid.append(row)
            row = []
        i -= 1
    return rgrid

def encode_rgrid(text, key):
    rgrid = generate_rgrid(key)
    encoding = ''
    for character in text:
        for i in range(len(rgrid)):
            row = rgrid[i]
            if (character in row):
                encoding += f'{i}{RELATION}{row.index(character)}{SEPERATOR}'
    return encoding[:-1]

def decode_rgrid(cipher, key):
    rgrid = generate_rgrid(key)
    text = ''
    for relation in cipher.split(SEPERATOR):
        xy = relation.split(RELATION)
        text += rgrid[int(xy[0])][int(xy[1])]
    return text

KEY = 'randomkey'
cipher = encode_rgrid('hi my name is prathamesh!!!', KEY)
print(cipher)
text = decode_rgrid(cipher, KEY)
print(text)