import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

// 대문자로 시작! -> 대문자를 컴포넌트로 인식
const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;

const HomeIcon = styled.img`
  width: 61px;
  height: 24px;
`;

const HeaderContainer = styled.div`
  padding-right: 160px;
  padding-left: 160px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  color: #6c6c6c;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 400;
  margin-top: 9px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 28px;
  margin-top: 9px;
`;

const HeaderRight = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  display: inline-flex;
  align-items: flex-end;
  gap: 36px;
`;

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDetailPage = pathname.startsWith("/item/");

  return (
    <div>
      <HeaderContainer>
        <LogoImage
          src={logoUrl}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <HeaderRight>
          {isDetailPage ? (
          <ButtonGroup>
            <Button onClick={() => navigate("/add")}>상품등록</Button>
            <Button>상품삭제</Button>
            <Button>상품수정</Button>
          </ButtonGroup>
        ) : (
          <Button onClick={() => navigate("/add")}>상품등록</Button>
        )}

          <HomeIcon src={homeUrl} alt="home" onClick={() => navigate("/")} />
        </HeaderRight>
      </HeaderContainer>
    </div>
  );
}