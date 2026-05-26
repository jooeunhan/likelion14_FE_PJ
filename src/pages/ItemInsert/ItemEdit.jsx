import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ProductLayout from "../../layout/ProductLayout.jsx";
import ProductForm from "./ProductForm.jsx";
import styled from "styled-components";
import { ImageUploader } from "./ProductForm.jsx";
import { getItemDetail } from "../../api/shop.js";

const EditImageWrapper = styled.div`
  width: 459px;
  height: 602px;
  position: relative;
`;

export default function ItemEdit() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const data = await getItemDetail("clothes", id);
        setInitialData(data);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      }
    };
    fetchItemDetail();
  }, [id]);

  if (!initialData) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <ProductLayout
      leftContent={
        <EditImageWrapper>
          <ImageUploader defaultImage={initialData?.image} />
        </EditImageWrapper>
      }
      rightContent={<ProductForm isUpdate={true} initialData={initialData} />}
    />
  );
}