import styled from "styled-components";
import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  position: relative;
  padding-left: 158px;
  padding-right: 149px; 
  box-sizing: border-box;
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