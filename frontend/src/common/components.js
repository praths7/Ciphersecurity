import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

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