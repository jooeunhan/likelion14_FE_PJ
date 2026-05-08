import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-start;
  max-width: 280px; 
`;

const OptionButton = styled.button`
  background-color: ${(props) => (props.active ? "#e0e0e0" : "#f2f2f2")};
  border: none;
  border-radius: 20px;
  
  min-width: 58px;
  padding: 8px 16px;
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: 'Pretendard';
  font-size: 14px;
  color: ${(props) => (props.active ? "#000000" : "#616161")};
  font-weight: ${(props) => (props.active ? "700" : "400")};
  
  white-space: nowrap;
  box-sizing: border-box;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default function OptionSelector({ options, selectedValue, onSelect }) {
  return (
    <Container>
      {options.map((opt) => (
        <OptionButton
          key={opt}
          active={selectedValue === opt}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </OptionButton>
      ))}
    </Container>
  );
}