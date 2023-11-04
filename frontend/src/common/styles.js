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
  margin: auto;
  padding: 50px;
  max-width: 600px;
  height: auto;
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

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`
