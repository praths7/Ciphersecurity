import React, { useEffect, useState } from "react";
import { Logo, HomeCard, PageContainer } from "../../common/styles";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import {
  decodeTextRgrid,
  encodeTextRgrid
} from "../../endpoints/rgridEndpoints";
import grid from "../../images/grid.png";

export const RgridCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (cipherKey.length > 0) {
      if (action === ENCRYPT) {
        encodeTextRgrid(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      } else if (action === DECRYPT) {
        decodeTextRgrid(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      }
    }
  }, [inputText, cipherKey]);

  useEffect(() => {
    setCipherKey('');
    setCipherValue('');
  }, [action]);

  return (
    <PageContainer>
      <HomeCard>
        <div className="mb-4">
          <Logo src={grid}/>
          <h1
            className="mt-4"
          >
            Try the r-Grid cipher!
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            How does the cipher work?
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            The r-Grid cipher is based on random-based improvements done by me on
            the generic grid cipher. The alphabet is arranged in a 19 x 5 grid allocation
            where the placements are randomised based on key. The final encryption output
            is shuffled which is reversible through the law of permutation symmetry.
          </p>
        </div>
        <EncryptDecryptSection
          action={action}
          setAction={setAction}
          cipherKey={cipherKey}
          setCipherKey={setCipherKey}
          cipherValue={cipherValue}
          setInputText={setInputText}
        />
      </HomeCard>
    </PageContainer>
  );
}