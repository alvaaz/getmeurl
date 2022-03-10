import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 2rem;
  width: 2rem;
`;

export const Background = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const Circle = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #34d399;
  width: 100%;
  height: 100%;
`;

export const Trail = styled.div`
  display: flex;
  position: absolute;
  background-color: #D1FAE5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
`
