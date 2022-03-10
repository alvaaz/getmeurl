import styled, {css} from "styled-components";

export const Container = styled.div<{ onOver?: number; dropped?: boolean, sizeAuto?:boolean, draggable?:boolean }>`
  display: flex;
  justify-content: center;
  ${({ onOver, dropped, draggable }) => {
    if(draggable){
      if (onOver) {
        return `
          border-width: 2px;
          border-color: rgba(79, 70, 229);
          border-style: dashed;
        `;
      }
      if (dropped) {
        return `
          border-width: 1px;
          border-color: #e0e0e0;
        `;
      }
      return `
        border-width: 2px;
        border-color: #e0e0e0;
        border-style: dashed;
      `;
    }
    return `
      border-width: 2px;
      border-color: #e0e0e0;
    `;
  }}

  transition: border-color 0.4s ease;
  border-radius: 0.375rem;
  ${props => !props.sizeAuto && css`
    width: 20rem;
    height: 20rem;
  `}
  position: relative;
`;

export const List = styled.ul`
  width: 100%;
  padding-top: 0.5rem;
  li {
    margin-bottom: 0.75rem;
    animation-name: fadeIn;
    animation-duration: 0.3s;
    animation-fill-mode: backwards;
    transition: opacity 0.4s ease, transform 0.4s ease;
    &:nth-child(1) {
      animation-delay: 0.24s;
    }
    &:nth-child(2) {
      animation-delay: 0.32s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
    &:nth-child(4) {
      animation-delay: 0.48s;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;

export const Place = styled.div<{ dropped: boolean; onOver: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: ${({ onOver, dropped }) => {
    if (dropped) {
      return "translate(-50%, -100%)";
    }
    if (onOver) {
      return "translate(-50%, -50%)";
    }
    return "translate(-50%, 0%)";
  }}}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: ${({ onOver }) => onOver - 1};
  opacity: ${({ onOver }) => onOver};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export const UploadIcon = styled.div`
  & > div {
    position: relative;
    width: 48px;
    height: 48px;
    background-color: rgba(79, 70, 229);
    border-radius: 50%;
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }
`;

export const Placeholder = styled.div<{ onOver: number; dropped: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  text-align: center;
  z-index: ${({ dropped }) => (dropped ? -1 : 0)};
  transform: ${({ onOver, dropped }) => {
    if (dropped || onOver) {
      return "translate(-50%, -100%)";
    }
    return "translate(-50%, -50%)";
  }}}

  opacity: ${({ onOver, dropped }) => {
    if (onOver || dropped) {
      return 0;
    }
    return 1;
  }}}

  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export const Hint = styled.div`
  color: gray;
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  width: 100%;
  pointer-events: none;
  min-width: max-content;
`;
