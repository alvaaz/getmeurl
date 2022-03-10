import {
  ModalMask,
  ModalWrapper,
  H3,
  Button,
  Subtitle,
  IconContainer,
} from "./style";
import { useModal } from "./context";
import ReactDOM from "react-dom";
import { List, Container } from "../DragNDrop/style";

export function Modal() {
  const { modalContent } = useModal();

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  if (modalContent.content) {
    return ReactDOM.createPortal(
      <ModalMask>
        <ModalWrapper>
          <IconContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </IconContainer>
          <H3>Error with some files</H3>
          <Subtitle>
            You are trying to upload files that we don't support.
          </Subtitle>
          <Container sizeAuto={true} draggable={false}>
            <List>{modalContent.content}</List>
          </Container>
          <Button onClick={() => modalContent.onOk()}>Done</Button>
        </ModalWrapper>
      </ModalMask>,
      modalRoot
    );
  } else return null;
}
