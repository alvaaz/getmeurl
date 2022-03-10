import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  width: 480px;
  z-index: 2;
  background-color: white;
  border: none;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  top: 20vh;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`;

export const H3 = styled.h3`
  color: rgb(17 24 39);
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: .5rem;
  text-align: center;

`

export const Subtitle = styled.p`
  color: rgb(107, 114, 128);
  text-align: center;
  margin-bottom: 1rem;
`

export const IconContainer = styled.div`
  background-color: rgb(254, 226, 226);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
  svg {
    height: 1.5rem;
    width: 1.5rem;
    color: rgb(220, 38, 38);
  }
`

export const Button = styled.button`
  appearance: none;
  color: white;
  background-color: rgb(79 70 229);
  border-radius: 0.375rem;
  padding-left: .5rem;
  padding-right: .5rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  width: 100%;
  transition: background-color 0.2s ease-in-out;
  margin-top: 1rem;
  &:hover {
    background-color: rgb(79 70 229 / .9);
  }
`

export const ModalContent = styled.div`
  display: flex;
`;

export const Header = styled.div`
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: 0 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
`;

export const ModalTitle = styled.div`
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
`;

export const ModalFooter = styled.div`
  padding: 10px 16px;
  text-align: right;
  background: 0 0;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;
`;

export const ModalMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;
