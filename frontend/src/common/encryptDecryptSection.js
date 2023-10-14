import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Modal } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { DECRYPT, ENCRYPT } from "../constants/operationConstants";
import { generateMonoalphabeticKey } from "../endpoints/monoalphabeticEndpoints";
import {NUMBER_OF_CHARACTERS} from "../constants/generalConstants";

export const EncryptDecryptSection = ({
  action,
  setAction,
  cipherKey,
  setCipherKey,
  cipherValue,
  setInputText,
  isHomophonic = false
}) => {
  const navigateTo = useNavigate();
  const isCipherValid = cipherKey?.length === NUMBER_OF_CHARACTERS;
  return (
    <>
      <Button
        variant='outline-dark'
        className="p-3 mb-3"
        onClick={() => {
          setAction(ENCRYPT);
        }}
      >
        Encrypt
      </Button>
      <Button
        variant='outline-dark'
        className="p-3 mb-5"
        onClick={() => {
          setAction(DECRYPT);
        }}
      >
        Decrypt
      </Button>
      <Modal
        show={action !== null}
        onHide={() => {
          setAction(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {
              action === ENCRYPT ? "Encrypt Text" : action === DECRYPT && "Decrypt Text"
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter the text you want to&nbsp;
            { action === ENCRYPT ? "encode" : action === DECRYPT && 'decode' }
            , and see the magic!
          </p>
          <InputGroup className="mb-3">
            <InputGroupText>
              Text
            </InputGroupText>
            <textarea
              className="form-control"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
          </InputGroup>
          {
            cipherKey?.length >= 0 &&
            <div>
              <p>
                Also enter&nbsp;
                { action === ENCRYPT ? "encoding" : action === DECRYPT && 'decoding' }
                &nbsp;key.&nbsp;
                { action === ENCRYPT && "Or alternatively, generate one." }
              </p>
              <InputGroup
                className="mb-3"
                hasValidation
              >
                <InputGroupText>
                  Key
                </InputGroupText>
                <input
                  type="text"
                  className={`p-2 form-control ${!isHomophonic && !isCipherValid && 'is-invalid'}`}
                  value={cipherKey}
                  onChange={(e) => {
                    setCipherKey(e.target.value);
                  }}
                  required
                />
                {
                  !isHomophonic && !isCipherValid &&
                  <div
                    className="invalid-feedback"
                  >
                    Please enter a 26 character mapping scheme (key).
                  </div>
                }
              </InputGroup>
              {
                !isHomophonic && action === ENCRYPT &&
                <div className="text-center">
                  <Button
                    variant="outline-dark"
                    className="mb-3"
                    onClick={() => {
                      generateMonoalphabeticKey()
                        .then((data) => {
                          setCipherKey(data.data);
                        });
                    }}
                  >
                    Generate Key
                  </Button>
                </div>
              }
            </div>
          }
          <p>
            { action === ENCRYPT ? "Encoded" : action === DECRYPT && 'Decoded' }
            &nbsp;Text:
          </p>
          <InputGroup>
            <textarea
              className="p-2 form-control"
              readOnly
              placeholder={cipherValue}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                navigator.clipboard.writeText(cipherValue);
              }}
            >
              Copy
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => {
              setAction(null);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant='secondary'
        className='p-2'
        onClick={() => {
          navigateTo('/');
        }}
      >
        { 'Home Page' }
      </Button>
    </>
  )
}
