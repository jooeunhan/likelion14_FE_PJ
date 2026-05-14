import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import starIcon from "../../assets/icons/star_icon.svg";
import ProductLayout from "../../layout/ProductLayout.jsx";
import { getItemDetail, deleteItem } from "../../api/shop.js";

const ProductImg = styled.img`
  width: 459px;
  height : 602px;
  object-fit: contain;
`;

const Price = styled.div`
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Name = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 400;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  color: #949494;
  font-weight: 400;
`;

const StarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  font-weight: 400;
  margin-right: 4px;
`;

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItemDetail("clothes", id);
        setItem(res);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div>로딩 중...</div>;

  return (
    <ProductLayout
      leftContent={
        <ProductImg src={item.image} alt={item.name} />
      }
      rightContent={
        <>
          <Price>{item.price?.toLocaleString()}원</Price>
          <Name>{item.name}</Name>
          <StatsRow>
            <StarBox>
              <img src={starIcon} alt="star" width="13" />
              <span>{item.rating}</span>
            </StarBox>
            <span>리뷰 {item.reviews}</span>
          </StatsRow>
        </>
      }
    />
  );
}