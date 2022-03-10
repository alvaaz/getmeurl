import styled from 'styled-components'

export const Container = styled.span`
  position: absolute;
  left: 0px;
  right: 0px;
	bottom: 100%;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: center;
`;

export const Inner = styled.span`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: #111827;
  color: #ffffff;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  line-height: 1rem;
  text-transform: uppercase;
  border-radius: 0.375rem;
  drop-shadow: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
`

export const Arrow = styled.svg`
  color: rgb(17 24 39);
  position: absolute;
  top: 100%;
  left: 50%;
`
