import copy
import string
import random
import functools

alphabet = list(string.printable)[:-5]

"""
[Explanation]

For a given list, shuffle list w.r.t seed.
"""
def seed_shuffle(list, seed):
    random.seed(seed)
    random.shuffle(list)
    return list

"""
[Explanation]

For a given shuffled list, execute un-shuffling through
provided seed. Apply mathematical law of permutation symmetry.
"""
def unshuffle_list(shuffled_list, seed):
    n = len(shuffled_list)
    permutation = [i for i in range(1, n + 1)]
    shuffled_perm = seed_shuffle(permutation, seed)
    zipped = list(zip(shuffled_list, shuffled_perm))
    zipped.sort(key=lambda x: x[1])
    return [a for (a, b) in zipped]

"""
[Explanation]

For given key, calculate numerical equivalence through weighted
sum aggregation of characters.
"""
def numerise_key(key):
    length = len(key)
    value = 0
    for k in key:
        value += max(length, 1) * alphabet.index(k)
        length -= 1
    return value

"""
[Explanation]

Convert key into numerical seed via a series of transformations:
1. Weighted sum aggregation of key characters.
2. Add decrementing seed value into itself for further randomisation.
3. Shuffle the resultant key according to rotation key.
4. Rejoin key and convert into integer.
"""
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

"""
[Explanation]

Return the printable alphabet dictionary shuffled according to seed.
"""
def generate_mirror(key):
    final_key = generate_final_key(key)
    mirror = copy.copy(alphabet)
    random.Random(final_key).shuffle(mirror)
    return mirror

"""
[Explanation]

Encoding the given text using key. Randomise the encryption via
key seed to deter structural referencing.
"""
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

"""
[Explanation]

Decode the given text using key. First reverse the shuffled
encryption via key seed through law of permutation symmetry.
"""
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
