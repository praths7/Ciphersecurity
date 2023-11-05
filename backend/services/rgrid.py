import copy
import random
import string
import functools

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

def seed_shuffle(list, key):
    seed = numerise_key(key)
    random.seed(seed)
    random.shuffle(list)
    return list

def unshuffle_list(shuffled_list, key):
    n = len(shuffled_list)
    permutation = [i for i in range(1, n + 1)]
    shuffled_perm = seed_shuffle(permutation, key)
    zipped = list(zip(shuffled_list, shuffled_perm))
    zipped.sort(key=lambda x: x[1])
    return [a for (a, b) in zipped]

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
    relations = encoding[:-1].split(SEPERATOR)
    shuffled = seed_shuffle(relations, key)
    final_key = functools.reduce(lambda x, y : x + SEPERATOR + y, shuffled)
    return final_key

def decode_rgrid(cipher, key):
    rgrid = generate_rgrid(key)
    unshuffled = unshuffle_list(cipher.split(SEPERATOR), key)
    text = ''
    for relation in unshuffled:
        xy = relation.split(RELATION)
        text += rgrid[int(xy[0])][int(xy[1])]
    return text
