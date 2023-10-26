import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, FormLabel, InputGroup, Table} from "react-bootstrap";
import {NUMBER_OF_PRINTABLE_CHARACTERS} from "../constants/generalConstants";

export const HomeButton = () => {
  const navigateTo = useNavigate();
  return (
    <Button
      variant='secondary'
      className='p-2'
      onClick={() => {
        navigateTo('/');
      }}
    >
      { 'Home Page' }
    </Button>
  )
}

export const ShiftInput = ({ setCipherKey }) => {
  const [value, setValue] = useState(0);
  return (
    <InputGroup
      className="mt-4 mb-3"
    >
      <FormLabel>
        Selected Shift Value:&nbsp;
        { value }
      </FormLabel>
      <input
        type="range"
        className="form-range"
        min={0}
        max={NUMBER_OF_PRINTABLE_CHARACTERS - 1}
        value={value}
        onChange={(e) => {
          const shift = e.target.value;
          setValue(shift);
          setCipherKey(shift);
        }}
      />
    </InputGroup>
  );
}

export const MappingTable = ({ mapping, cipherKey }) => {
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