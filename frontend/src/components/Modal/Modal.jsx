import { createPortal } from "react-dom";
import "./Modal.css";
import { useRef, useEffect } from "react";

const Modal = ({ children, open }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
