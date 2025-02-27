"use client";
import { useUpdateEffect } from "ahooks";
import classNames from "classnames";
import { type ReactNode, useRef } from "react";

export default function Modal({
  children,
  open,
  title,
  footer,
  close,
  className,
}: {
  children: ReactNode;
  footer?: ReactNode;
  open: boolean;
  title?: string;
  close: () => void;
  className?: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal();

  const closeModal = () => {
    modalRef.current?.close();
    close();
  };

  useUpdateEffect(() => {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }, [open]);

  return (
    <dialog ref={modalRef} className={classNames("modal", className)}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          onClick={closeModal}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        {children}

        <div className="modal-action">
          <form method="dialog">{footer}</form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
}
