import React from 'react'
import ReactModal from 'react-modal'

interface ModalTemplateProps {
  children: React.ReactNode;
  displayModal: () => void;
  isDisplayed: boolean;
  claims?: {}
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: 8,
    padding: "40px 40px 40px 40px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--grey-600)",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 530,
  }
};

export default function ModalTemplate({children, displayModal, isDisplayed, claims}: ModalTemplateProps) {
  return (
    <ReactModal
      ariaHideApp={false}
      style={customStyles}
      isOpen={isDisplayed}
      onRequestClose={displayModal}
      {...claims}>
      {children}
    </ReactModal>
  )
}
