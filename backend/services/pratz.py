import copy
import string
import random
import functools

alphabet = list(string.printable)[:-5]

def seed_shuffle(list, seed):
    random.seed(seed)
    random.shuffle(list)
    return list

def unshuffle_list(shuffled_list, seed):
    n = len(shuffled_list)
    permutation = [i for i in range(1, n + 1)]
    shuffled_perm = seed_shuffle(permutation, seed)
    zipped = list(zip(shuffled_list, shuffled_perm))
    zipped.sort(key=lambda x: x[1])
    return [a for (a, b) in zipped]

def numerise_key(key):
    length = len(key)
    value = 0
    for k in key:
        value += max(length, 1) * alphabet.index(k)
        length -= 1
    return value

def generate_final_key(key):
    seed = numerise_key(key)
    rotate = copy.copy(seed)
    rotated_key = copy.copy(seed)
    while (rotate > 0):
        rotated_key += rotate
        rotate -= 1
    str_key = [s for s in str(rotated_key)][::-1]
    random.Random(rotated_key).shuffle(str_key)
    final_key = int(functools.reduce(lambda x, y : x + y, str_key))
    return final_key

def generate_mirror(key):
    final_key = generate_final_key(key)
    mirror = copy.copy(alphabet)
    random.Random(final_key).shuffle(mirror)
    return mirror

def encode_pratz(text, key):
    mirror = generate_mirror(key)
    encoding = ''
    for character in text:
        oi = alphabet.index(character)
        encoding += mirror[oi]
    split_encoding = [s for s in encoding]
    final_key = generate_final_key(key)
    rotated = seed_shuffle(split_encoding, final_key)
    return str(functools.reduce(lambda x, y : x + y, rotated))

def decode_pratz(cipher, key):
    final_key = generate_final_key(key)
    split_cipher = [s for s in cipher]
    untwised = unshuffle_list(split_cipher, final_key)
    mirror = generate_mirror(key)
    text = ''
    for character in untwised:
        oi = mirror.index(character)
        text += alphabet[oi]
    return text

KEY = 'mogambo'
cipher = encode_pratz('hi dear, nice to meet you!', KEY)
print(cipher)
text = decode_pratz(cipher, KEY)
print(text)