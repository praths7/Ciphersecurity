import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, InputGroup, Modal, Table} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { DECRYPT, ENCRYPT } from "../constants/operationConstants";
import { getHomophonicMapping } from "../endpoints/homophonicEndpoints";
import { generateMonoalphabeticKey } from "../endpoints/monoalphabeticEndpoints";
import { NUMBER_OF_CHARACTERS } from "../constants/generalConstants";

const MappingTable = ({ mapping, cipherKey }) => {
  const headers = [];
  const keyAnchors = cipherKey.split('');
  Object.keys(mapping).forEach((k) => {
    let entry = {};
    entry[k] = mapping[k];
    headers.push(entry);
  });
  return (
    <Table>
      <thead>
      <tr>
        <th scope="col" >
          #
        </th>
        {headers.map((key) => {
          const keyName = Object.keys(key);
          return (
            <th scope="col" >
              { keyName[0] }
            </th>
          )
        })}
        <th>
          ...
        </th>
      </tr>
      </thead>
      <tbody>
      {keyAnchors.map((key, entryIndex) => {
        return (
          <tr>
            <th scope="row">
              { key }
            </th>
            {
              headers.map((key) => {
                const keyName = Object.keys(key);
                return (
                  <td>
                    { String((key[keyName])[entryIndex]) }
                  </td>
                )
              })
            }
            <td>
              ...
            </td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}

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
  const [mapping, setMapping] = useState(null);
  const [fetchMapping, setFetchMapping] = useState(0);
  const isCipherValid = cipherKey?.length === NUMBER_OF_CHARACTERS;

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
                    if (isHomophonic && mapping) {
                      setFetchMapping(fetchMapping => fetchMapping + 1);
                    }
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
              {
                isHomophonic &&
                <div className="text-center">
                  <Button
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
                </div>
              }
            </div>
          }
          { mapping && <MappingTable mapping={mapping} cipherKey={cipherKey}/> }
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
