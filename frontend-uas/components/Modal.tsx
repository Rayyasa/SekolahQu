import React, { ReactNode } from "react";

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
}

const Modal = ({ id, title, children }: ModalProps) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;