import copy
import string
import random

alphabet = list(string.printable)[:-5]

def numerise_key(key):
    length = len(key)
    value = 0
    for k in key:
        value += max(length, 1) * alphabet.index(k)
        length -= 1
    return value

def generate_mirror(key):
    seed = numerise_key(key)
    mirror = copy.copy(alphabet)
    random.Random(seed).shuffle(mirror)
    return mirror

def encode_pratz(text, key):
    mirror = generate_mirror(key)
    encoding = ''
    for character in text:
        oi = alphabet.index(character)
        encoding += mirror[oi]
    return encoding

def decode_pratz(cipher, key):
    mirror = generate_mirror(key)
    text = ''
    for character in cipher:
        oi = mirror.index(character)
        text += alphabet[oi]
    return text

KEY = 'pratz'
cipher = encode_pratz('heybetty?!', KEY)
text = decode_pratz(cipher, KEY)
print(text)