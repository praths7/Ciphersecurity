import string

SHIFT = 1

def encode_caesar(text):
    cipher = ''
    alphabet = list(string.printable)
    for character in text:
        character = character.lower()
        position = alphabet.index(character)
        position -= SHIFT
        if (position < 0):
            position += len(alphabet)
        cipher += alphabet[position]
    return cipher
