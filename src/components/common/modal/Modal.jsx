import styled from "styled-components";
import closeIcon from "../../../assets/icons/close_icon.svg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px 33px 48px 35px;
  border-radius: 25px;
  position: relative;
  
  display: inline-flex;
  flex-direction: column;
  
  min-width: 296px;
  width: auto;
  min-height: 156px;
  height: auto;
  box-sizing: border-box;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
`;

const CloseIcon = styled.img`
  width: 13px;
  height: 13px;
`;

export default function Modal({ title, onClose, children }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon src={closeIcon} alt="close" />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}