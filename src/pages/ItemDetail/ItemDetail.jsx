import { useParams } from "react-router-dom";
import styled from "styled-components";
import productDummy from "../Main/productDummy.js";
import starIcon from "../../assets/icons/star_icon.svg";
import ProductLayout from "../../layout/ProductLayout.jsx";

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
  
  const product = productDummy?.find((item) => String(item.id) === String(id));

  if (!product) return null;

  return (
    <ProductLayout
      leftContent={
        <ProductImg src={product.img} alt={product.name} />
      }
      rightContent={
        <>
          <Price>{product.price}</Price>
          <Name>{product.name}</Name>
          <StatsRow>
            <StarBox>
              <img src={starIcon} alt="star" width="13" />
              <span>{product.rating}</span>
            </StarBox>
            <span>리뷰 {product.review}</span>
          </StatsRow>
        </>
      }
    />
  );
}