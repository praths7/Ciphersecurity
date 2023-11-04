import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import {DECRYPT, ENCRYPT, SUCCESS} from "../constants/operationConstants";
import { NUMBER_OF_CHARACTERS } from "../constants/generalConstants";
import { HomeButton, MappingTable, ShiftInput } from "./components";
import {
  getBase64HomophonicMapping,
  getHomophonicMapping
} from "../endpoints/homophonicEndpoints";
import { generateMonoalphabeticKey } from "../endpoints/monoalphabeticEndpoints";
import { getBase64VigenereMapping } from "../endpoints/vigenereEndpoints";
import {generateHillKey} from "../endpoints/hillEndpoints";

export const EncryptDecryptSection = ({
  action,
  setAction,
  cipherKey,
  setCipherKey,
  cipherValue,
  setInputText,
  hillStatus = '',
  isCaesar = false,
  isHomophonic = false,
  isMonoalphabetic = false,
  isVigenere = false,
  isHill = false
}) => {
  const [mapping, setMapping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchMapping, setFetchMapping] = useState(0);
  const is26Cipher = cipherKey?.length === NUMBER_OF_CHARACTERS;

  useEffect(() => {
    if (fetchMapping !== 0) {
      getHomophonicMapping(cipherKey)
        .then((data) => {
          setMapping(data.data);
        });
    }
  }, [fetchMapping]);

  useEffect(() => {
    setMapping(null);
    setFetchMapping(0);
  }, [action]);

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
        className={`${mapping && 'modal-lg'}`}
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
            &nbsp;🔐
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
              { action === ENCRYPT ? "Text" : action === DECRYPT && 'Cipher' }
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
                { (isMonoalphabetic || isHill) && action === ENCRYPT && "Or alternatively, generate one." }
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
                  className={`p-2 form-control ${(isHill && hillStatus === SUCCESS) && 'is-valid'} ${((isMonoalphabetic && !is26Cipher) || (isHill && hillStatus !== SUCCESS)) && 'is-invalid'}`}
                  value={cipherKey}
                  onChange={(e) => {
                    setCipherKey(e.target.value);
                    if (isHomophonic && mapping) {
                      setFetchMapping(fetchMapping => fetchMapping + 1);
                    }
                  }}
                  required
                />
                {
                  isMonoalphabetic && !is26Cipher &&
                  <div
                    className="invalid-feedback"
                  >
                    Please enter a 26 character mapping scheme (key).
                  </div>
                }
                {
                  isHill && ((hillStatus !== SUCCESS) ?
                  <div
                    className="invalid-feedback"
                  >
                    { hillStatus }
                  </div> :
                  <div
                    className="valid-feedback"
                  >
                    Key compatible.
                  </div>)
                }
              </InputGroup>
              {
                (isMonoalphabetic || isHill) && action === ENCRYPT &&
                <div className="text-center">
                  <Button
                    variant="outline-dark"
                    className="mb-3"
                    onClick={() => {
                      if (isMonoalphabetic) {
                        generateMonoalphabeticKey()
                          .then((data) => {
                            setCipherKey(data.data);
                          });
                      } else if (isHill) {
                        generateHillKey()
                          .then((data) => {
                            setCipherKey(data.data);
                          });
                      }
                    }}
                  >
                    Generate Key
                  </Button>
                </div>
              }
              {
                (isHomophonic || isVigenere) && cipherKey.length > 0 &&
                <div className="text-center">
                  {
                    isHomophonic && <Button
                      variant="outline-dark"
                      className="mb-3 mx-2"
                      onClick={() => {
                        if (mapping) {
                          setMapping(null);
                          setFetchMapping(0);
                        } else {
                          setFetchMapping(fetchMapping => fetchMapping + 1);
                        }
                      }}
                    >
                      { !mapping ? 'Show Mapping' : 'Hide Mapping' }
                    </Button>
                  }
                  <Button
                    variant="outline-dark"
                    role="status"
                    className="mb-3"
                    onClick={() => {
                      setLoading(true);
                      (
                        isHomophonic ? getBase64HomophonicMapping(cipherKey) :
                          isVigenere && getBase64VigenereMapping(cipherKey)
                      )
                        .then((data) => {
                          const base64Value = data.data;
                          const downloadLink = document.createElement("a");
                          downloadLink.href = base64Value;
                          if (isHomophonic) {
                            downloadLink.download = 'FullHomophonicMapping.png';
                          } else if (isVigenere) {
                            downloadLink.download = 'FullVigenereMapping.png';
                          }
                          downloadLink.click();
                        })
                        .then(() => {
                          setLoading(false);
                        })
                    }}
                  >
                    { loading && <span className="spinner-border spinner-border-sm" role="status"/>}
                    &nbsp;
                    { loading ? 'Downloading...' : 'Download Full Mapping' }
                  </Button>
                </div>
              }
            </div>
          }
          { mapping && <MappingTable mapping={mapping} cipherKey={cipherKey}/> }
          { isCaesar && <ShiftInput setCipherKey={setCipherKey} /> }
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
      <HomeButton/>
    </>
  )
}
