import { useState, useEffect } from "react";
import DeleteModal from "../common/modal/DeleteModal";
import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteItem } from "../../api/shop";

// 대문자로 시작! -> 대문자를 컴포넌트로 인식
const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;

const HomeIcon = styled.img`
  width: 61px;
  height: 24px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  padding-right: 160px;
  padding-left: 160px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  color: #6c6c6c;
  font-weight: 400;
  font-size: 13px;
  font-family: Pretendard;
  margin-top: 9px;
  cursor: pointer;

  ${props => props.$active && `
    color: #000;
    font-weight: 700;
  `}
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentId = pathname.split("/")[2];

  const isDPageOrEPage = pathname.startsWith("/item/") || pathname.startsWith("/edit/");

  const isActive = (path) => pathname === path;

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const handleDelete = async () => {
    const currentId = pathname.split("/")[2];

    try {
      await deleteItem("clothes", currentId);

      setIsModalOpen(false);
      navigate("/", { replace: true });

      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <HeaderContainer>
        <LogoImage
          src={logoUrl}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <HeaderRight>
          {isDPageOrEPage ? (
            <ButtonGroup>
              <Button
                onClick={() => navigate("/add")}
                $active={pathname === "/add"}
              >
                상품등록
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>상품삭제</Button>
              <Button
                onClick={() => navigate(`/edit/${pathname.split("/")[2]}`)}
                $active={pathname.startsWith("/edit/")}
              >
                상품수정
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              onClick={() => navigate("/add")}
              $active={pathname === "/add"}
            >
              상품등록
            </Button>
          )}

          <HomeIcon src={homeUrl} alt="home" onClick={() => navigate("/")} />
        </HeaderRight>
      </HeaderContainer>

      {isModalOpen && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}