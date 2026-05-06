import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Modal from "../../components/common/modal/Modal";
import OptionSelector from "../../components/common/modal/OptionSelector";
import SortDropdown from "../../components/common/SortDropdown";

import productDummy from "./productDummy.js";
import dropdownIcon from "../../assets/icons/dropdown_icon.svg";

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-left: 158px;
  padding-right: 149px;
  box-sizing: border-box;
`;

const BaseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard';
  font-size: 13px;
  color: #616161;
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 0;
`;

const CategoryButton = styled(BaseButton)`
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 8px 11px 11px 10px;
  gap: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 35px;
  margin-left: -5px;
`;

const CategoryGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconImage = styled.img`
  width: 10px;
  height: 11px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 181px);
  column-gap: 57px;
  row-gap: 35px;
  margin-top: 20px;
  justify-content: start;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 181px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 181px;
  height: 237px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const ProductName = styled.div`
  color: #333;
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Cost = styled.div`
  color: #000;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const Reviews = styled.div`
  color: #A7A7A7;
  font-size: 11px;
`;

const ProductItem = ({ itemId, img, name, price, review }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/item/${itemId}`)}>
      <ImageWrapper>
        <ProductImage src={img} alt={name} />
      </ImageWrapper>

      <InfoBox>
        <ProductName>{name}</ProductName>
        <Cost>{price}</Cost>
        <Reviews>리뷰 {review}</Reviews>
      </InfoBox>
    </Card>
  );
};

export default function Main() {
  const [activeModal, setActiveModal] = useState(null);

  const [filters, setFilters] = useState({
    성별: "",
    색상: "",
    사이즈: "",
    가격대: "",
    종류: "",
  });

  const filterData = {
    성별: ["female", "male", "unisex"],
    색상: [
      ["red", "pink", "blue"],
      ["black", "gray", "denim"],
      ["rainbow", "multi", "holographic"],
    ],
    사이즈: [
      ["9", "10"],
      ["S", "M", "L", "XL"],
    ],
    가격대: ["0~30$", "31~60$", "61~90$"],
    종류: ["clothes", "shoes"],
  };

  const handleSelect = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
    setActiveModal(null);
  };

  return (
    <Container>
      <TopBar>
        <CategoryGroup>
          {Object.keys(filterData).map((category) => (
            <CategoryButton
              itemId={category}
              onClick={() => setActiveModal(category)}
            >
              {filters[category] ? filters[category] : category}
              <IconImage src={dropdownIcon} alt="dropdown" />
            </CategoryButton>
          ))}
        </CategoryGroup>

        <SortDropdown />
      </TopBar>

      {activeModal && (
        <Modal title={activeModal} onClose={() => setActiveModal(null)}>
          <OptionSelector
            options={filterData[activeModal]}
            selectedValue={filters[activeModal]}
            onSelect={(val) => handleSelect(activeModal, val)}
          />
        </Modal>
      )}

      <ProductGrid>
        {productDummy.map((product) => (
          <ProductItem
            key={product.id}
            itemId={product.id}
            img={product.img}
            name={product.name}
            price={product.price}
            review={product.review}
          />
        ))}
      </ProductGrid>
    </Container>
  );
}