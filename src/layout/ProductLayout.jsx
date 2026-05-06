import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 830px;
`;

const LeftSection = styled.div`
  width: 809px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1.5px solid #EBEBEB;
  padding-top: 85px;
  padding-bottom: 143px;
  box-sizing: border-box;
`;

const RightSection = styled.div`
  width: 631px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;
  box-sizing: border-box;
`;

export default function ProductLayout({ leftContent, rightContent }) {
  return (
    <Container>
      <LeftSection>{leftContent}</LeftSection>
      <RightSection>{rightContent}</RightSection>
    </Container>
  );
}