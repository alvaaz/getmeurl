import styled from "styled-components";

export const Container = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0rem;
    margin-bottom: 0rem;
  }
`;

export const Main = styled.figure`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
`;

export const Img = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  margin-right: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 0.25rem;
`;

export const Text = styled.figcaption`
  flex-grow: 1;
`;

export const FileName = styled.p`
  line-height: 1.5rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
`;


export const Copy = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition-duration: 0.15s;
  position: relative;
  &:hover {
    background-color: rgba(243, 244, 246, 1);
  }
`;

