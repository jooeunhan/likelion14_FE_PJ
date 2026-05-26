import { useParams } from "react-router-dom";
import ProductLayout from "../../layout/ProductLayout";
import ProductForm from "./ProductForm";
import styled from "styled-components";
import { ImageUploader } from "./ProductForm.jsx"; 

const ImageUploadBox = styled.div`
  width: 459px;
  height: 602px;
  background-color: #F2F2F2;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function ItemAdd() {
  return (
    <ProductLayout
      leftContent={
        <ImageUploadBox>
          <ImageUploader />
        </ImageUploadBox>
      }
      rightContent={<ProductForm type="add" />}
    />
  );
}