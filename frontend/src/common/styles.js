
import styled from 'styled-components';

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;

export const HomeCard = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 50px;
  max-width: 600px;
  max-height: 715px;
  border-radius: 50px;
  background-color: white;
  box-shadow: 12px 12px 12px 8px rgba(0,0,0,0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 24px 24px 24px 0px rgba(0,0,0,0.2);
  }
  @media (max-width: 580px) {
    max-height: 750px;
  }
`;
