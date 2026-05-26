import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Modal from "../../components/common/modal/Modal";
import OptionSelector from "../../components/common/modal/OptionSelector";
import SortDropdown from "../../components/common/SortDropdown";

// import productDummy from "./productDummy.js";
import {getItems} from "../../api/shop";
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
        <ProductImage src={img || "기본 이미지 경로"} alt={name} />
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
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [sortType, setSortType] = useState("기본 정렬순");
  const [filters, setFilters] = useState({
    성별: "",
    색상: "",
    사이즈: "",
    가격대: "",
    종류: "",
  });

  useEffect(()=> {
    let cancelled = false;
    (async () => {
      try {
        const res = await getItems("clothes");
        if (!cancelled) setItems(Array.isArray(res) ? res : []);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filterData = {
    성별: ["남성", "여성", "남녀공용"],
    색상: ["red", "pink", "blue", "black", "gray", "denim", "rainbow", "multi", "holographic"],
    사이즈: ["S", "M", "L", "XL", "9", "10"],
    가격대: ["0~100$", "100~300$", "300~500$"],
    종류: ["의류", "신발"],
  };

  const handleSelect = (category, value) => {
    const newValue = filters[category] === value ? "" : value;
    setFilters((prev) => ({ ...prev, [category]: newValue }));
    setActiveModal(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...items];

    const keyMap = { "성별": "gender", "색상": "color", "사이즈": "size", "가격대": "price", "종류": "type" };
    const valueMap = { "남성": "male", "여성": "female", "남녀공용": "unisex", "의류": "clothes", "신발": "shoes" };

    Object.keys(filters).forEach((korKey) => {
      const selectedValue = filters[korKey];
      if (!selectedValue) return;

      const apiKey = keyMap[korKey];

      if (korKey === "가격대") {
        const [min, max] = selectedValue.replace(/\$/g, "").split("~").map(Number);
        result = result.filter((p) => p[apiKey] >= min * 1000 && p[apiKey] <= max * 1000);
      } else {
        const targetValue = valueMap[selectedValue] || selectedValue;
        result = result.filter((p) => String(p[apiKey]) === String(targetValue));
      }
    });

    if (sortType === "리뷰 많은순") {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortType === "평점 높은순") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [items, filters, sortType]);

  return (
    <Container>
      <TopBar>
        <CategoryGroup>
          {Object.keys(filterData).map((category) => (
            <CategoryButton
              key={category}
              onClick={() => setActiveModal(category)}
            >
              {filters[category] ? filters[category] : category}
              <IconImage src={dropdownIcon} alt="dropdown" />
            </CategoryButton>
          ))}
        </CategoryGroup>

        <SortDropdown
          currentSort={sortType}
          onSortChange={(type) => setSortType(type)}
        />
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
        {filteredAndSortedProducts.map((item) => (
          <ProductItem
            key={item.id}
            itemId={item.id}
            img={item.image}
            name={item.name}
            price={`${Number(item.price).toLocaleString()}원`}
            review={item.reviews}
          />
        ))}
      </ProductGrid>
    </Container>
  );
}