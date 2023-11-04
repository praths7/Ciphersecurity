import React, { useEffect, useState } from "react";
import { HomeCard, PageContainer } from "../../common/styles";
import { Logo } from "./style";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import {
  decodeTextPratz,
  encodeTextPratz
} from "../../endpoints/pratzEndpoints";
import memoji from "../../images/me.png";

export const PratzCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (cipherKey.length > 0) {
      if (action === ENCRYPT) {
        encodeTextPratz(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      } else if (action === DECRYPT) {
        decodeTextPratz(inputText, cipherKey)
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
          <Logo src={memoji}/>
          <h1
            className="mt-4"
          >
            Welcome to Pratz Cipher ❤️
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            How does my cipher work?
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            My cipher operates on randomisation based on seeding. Essentially, the key acts as a seed
            for randomising the alphabet dictionary. The key generates the seed through a
            weighted linear summation of characters. The encoding is finally shuffled according to
            seed, which is reversible through the law of permutation symmetry.
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