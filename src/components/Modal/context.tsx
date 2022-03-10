import React, { createContext, ReactNode, useContext } from "react";
import { Modal } from "./modal";
interface ProfileState {
  modalContent: {
    content: ReactNode;
    onOk: () => void;
  };
  setModalContent: React.Dispatch<{
    content: React.SetStateAction<ReactNode>;
    onOk: () => void;
  }>;
  close: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function createCtx<ProfileState>() {
  const ctx = createContext<ProfileState | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useModal, CtxProvider] = createCtx<ProfileState>();

export const ModalProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = React.useState<{
    content: ReactNode | null;
    onOk: () => void;
  }>({ content: null, onOk: () => {} });
  const [close, setClose] = React.useState<boolean>(true);
  return (
    <CtxProvider value={{ modalContent, setModalContent, close, setClose }}>
      <Modal />
      {children}
    </CtxProvider>
  );
};
