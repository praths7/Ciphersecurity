from json import dumps
from flask import Flask, request
from flask_cors import CORS, cross_origin

from services.caesar import encode_caesar

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

api_cors_config = {
    'origins': ['http://localhost:5000']
}

APP = Flask(__name__)
CORS(APP, resources={
    r'/*': api_cors_config,
})

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

# /encode/caesar-cipher
@APP.route('/encode/caesar-cipher', methods=['POST'])
@cross_origin()
def encode_caesar_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_caesar(payload['text'])
    })