import { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/common/modal/Modal";
import OptionSelector from "../../components/common/modal/OptionSelector";
import dropdownIcon from "../../assets/icons/dropdown_icon.svg"
import product1 from "../../assets/images/product1.png"
import product2 from "../../assets/images/product2.png"
import product3 from "../../assets/images/product3.png"
import product4 from "../../assets/images/product4.png"
import product5 from "../../assets/images/product5.png"
import SortDropdown from "../../components/common/SortDropdown";

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

const SortButton = styled(BaseButton)`
  padding-right: 34px;
  padding-top: 55px;
  gap: 7px;
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

const ProductItem = ({ img, name, price, review }) => (
  <Card>
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

export default function Main() {
  const [activeModal, setActiveModal] = useState(null);
  const [filters, setFilters] = useState({
    성별: "", 색상: "", 사이즈: "", 가격대: "", 종류: ""
  });

  const filterData = {
    성별: ["female", "male", "unisex"],
    색상: [
      ["red", "pink", "blue"],
      ["black", "gray", "denim"],
      ["rainbow", "multi", "holographic"]
    ],
    사이즈: [
      ["9", "10"],
      ["S", "M", "L", "XL"]
    ],
    가격대: ["0~30$", "31~60$", "61~90$"],
    종류: ["clothes", "shoes"]
  };

  const handleSelect = (category, value) => {
    setFilters(prev => ({ ...prev, [category]: value }));
    setActiveModal(null);
  };

  const productList = [
    { id: 1, img: product1, name: "아이앱 스튜디오 25 후드 라이트 그레이", price: "145,000원", review: "1,561" },
    { id: 2, img: product2, name: "아이앱 스튜디오 25 후드 라이트 블루", price: "145,000원", review: "1,732" },
    { id: 3, img: product3, name: "아디다스 블랙 져지 2016", price: "255,000원", review: "781" },
    { id: 4, img: product4, name: "슈프림 후드집업 30 딥블루", price: "458,000원", review: "2,567" },
    { id: 5, img: product5, name: "나이키 에어 그레이 하운드 25", price: "235,000원", review: "231" },
    { id: 6, img: product1, name: "아이앱 스튜디오 25 후드 라이트 그레이", price: "145,000원", review: "1,561" },
    { id: 7, img: product2, name: "아이앱 스튜디오 25 후드 라이트 블루", price: "145,000원", review: "1,732" },
    { id: 8, img: product3, name: "아디다스 블랙 져지 2016", price: "255,000원", review: "781" },
    { id: 9, img: product4, name: "슈프림 후드집업 30 딥블루", price: "458,000원", review: "2,567" },
    { id: 10, img: product5, name: "나이키 에어 그레이 하운드 25", price: "235,000원", review: "231" },
  ];

  return (
    <Container>
      <TopBar>
        <CategoryGroup>
          {Object.keys(filterData).map((category) => (
            <CategoryButton key={category} onClick={() => setActiveModal(category)}>
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
        {productList.map((product) => (
          <ProductItem
            key={product.id}
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