import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 296px;
  height: 136px;
  background-color: #fff;
  border-radius: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 31px;
  color: #000;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
`;

const ActionButton = styled.button`
  width: 102px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.$primary ? "#F2F2F2" : "#D0D0D0"};
  color: #333;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }
`;

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Message>상품을 삭제하시겠습니까?</Message>
        <ButtonGroup>
          <ActionButton $primary onClick={onConfirm}>확인</ActionButton>
          <ActionButton onClick={onCancel}>취소</ActionButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
}