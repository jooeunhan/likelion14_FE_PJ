import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import uploadIcon from "../../assets/icons/upload_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { addItems, updateItems } from "../../api/shop";

const UploadWrapper = styled.div`
  width: 459px;
  height: 602px;
  background-color: #F0F0F0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const UploadIcon = styled.img`
  width: 50px;
  height: 56px;
  position: absolute;
  z-index: 10;
  pointer-events: none;
`;

const ProductPreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export function ImageUploader({ defaultImage }) {
  const [imagePreview, setImagePreview] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (defaultImage) {
      setImagePreview(defaultImage);
    }
  }, [defaultImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <UploadWrapper onClick={() => fileInputRef.current.click()}>
        <UploadIcon src={uploadIcon} alt="upload" />
        {imagePreview && (
          <ProductPreviewImg src={imagePreview} alt="product preview" />
        )}
      </UploadWrapper>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </>
  );
}

const FormContainer = styled.form`
  width: 285px;
  margin-left: 169px;
  padding: 27px 33px;
  border-radius: 20px;
  border: 1px solid #DFDFDF;
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 9px;
  text-align: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Label = styled.label`
  font-family: Pretendard;
  font-size: 14px;
  color: #6C6C6C;
  font-weight: 400;
`;

const Input = styled.input`
  width: 211px;
  height: 35px;
  border: 1px solid #6C6C6C;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 12px;
  
  &:focus {
    outline: 1px solid #6c6c6c;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.$gap || "5px"};
`;

const SelectButton = styled.button`
  min-width: 67px; 
  max-width: 100%;
  padding: 0 8px;
  height: 30px;
  
  border-radius: 5px;
  border: 1px solid;
  border-color: ${props => props.$active ? "#DFDFDF" : "#F2F2F2"};
  
  background-color: ${props => props.$active ? "#DFDFDF" : "#F2F2F2"};
  color: #333;

  font-family: Pretendard;
  font-size: 11px;
  cursor: pointer;
  
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${props => props.children === 'holographic' && `
    padding: 0 4px;
    flex-grow: 0;
  `}

  &:hover {
    background-color: ${props => props.$active ? "#c4c4c4" : "#eaeaea"};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: #F2F2F2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export default function ProductForm({ isUpdate, initialData }) {
  const navigate = useNavigate();
  const { type: urlType } = useParams();

  const currentCategory = isUpdate ? initialData?.type : urlType;

  const typeMap = { "의류": "clothes", "신발": "shoes", "clothes": "의류", "shoes": "신발" };
  const genderMap = { "남성": "male", "여성": "female", "남녀공용": "unisex", "male": "남성", "female": "여성", "unisex": "남녀공용" };

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    reviews: "",
    price: "",
    size: "",
    type: currentCategory || "",
    gender: "",
    color: "",
    image: "",
    soldout: 0
  });

  // 수정 모드
  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        name: initialData.name || "",
        rating: initialData.rating || "",
        reviews: initialData.reviews || undefined,
        price: initialData.price || "",
        size: initialData.size || "",
        type: initialData.type || "",
        gender: initialData.gender || "",
        color: initialData.color || "",
        image: initialData.image || "",
        soldout: initialData.soldout || 0
      });
    }
  }, [isUpdate, initialData]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price || 0),
      rating: Number(formData.rating || 0),
      reviews: Number(formData.reviews || 0),
      soldout: formData.soldout ? 1 : 0,
    };

    try {
      if (isUpdate) {
        await updateItems(payload.type, initialData.id, payload);
        alert("상품이 수정되었습니다!");
      } else {
        await addItems(payload.type, payload);
        alert("상품이 등록되었습니다!");
      }
      navigate(`/`);
    } catch (error) {
      console.error("제출 실패:", error);
      alert("서버 오류가 발생했습니다. 입력값을 확인해주세요.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>상품 정보 {isUpdate ? "수정" : "등록"}</Title>

      <InputGroup>
        <Label>상품명</Label>
        <Input 
          name="name"
          value={formData.name} 
          onChange={handleInputChange}
          placeholder="상품명을 입력하세요" 
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>평점</Label>
        <Input 
          name="rating"
          type="number" 
          step="0.1"
          value={formData.rating} 
          onChange={handleInputChange}
          placeholder="평점을 입력하세요" 
        />
      </InputGroup>

      <InputGroup>
        <Label>리뷰수</Label>
        <Input 
          name="reviews"
          type="number"
          value={formData.reviews} 
          onChange={handleInputChange}
          placeholder="리뷰수를 입력하세요" 
        />
      </InputGroup>

      <InputGroup>
        <Label>가격</Label>
        <Input 
          name="price"
          type="number"
          value={formData.price} 
          onChange={handleInputChange}
          placeholder="가격을 입력하세요" 
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>사이즈</Label>
       <Input 
          name="size"
          value={formData.size} 
          onChange={handleInputChange}
          placeholder="사이즈를 입력하세요" 
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>종류</Label>
        <SelectGroup $gap="7px">
          {["의류", "신발"].map((t) => (
            <SelectButton
              style={{ width: '102px' }}
              key={t}
              type="button"
              $active={formData.type === typeMap[t]}
              onClick={() => setFormData(prev => ({ ...prev, type: typeMap[t] }))}
            >
              {t}
            </SelectButton>
          ))}
        </SelectGroup>
      </InputGroup>

      <InputGroup>
        <Label>성별</Label>
        <SelectGroup $gap="5px">
          {["남성", "여성", "남녀공용"].map((g) => (
            <SelectButton
              key={g}
              type="button"
              $active={formData.gender === genderMap[g]}
              onClick={() => setFormData(prev => ({ ...prev, gender: genderMap[g] }))}
            >
              {g}
            </SelectButton>
          ))}
        </SelectGroup>
      </InputGroup>

      <InputGroup>
        <Label>색상</Label>
        <SelectGroup $gap="5px">
          {['red', 'pink', 'blue', 'gray', 'black', 'denim', 'multi', 'rainbow', 'holographic'].map((c) => (
            <SelectButton
              key={c}
              type="button"
              $active={formData.color === c}
              onClick={() => setFormData(prev => ({ ...prev, color: c }))}
            >
              {c}
            </SelectButton>
          ))}
        </SelectGroup>
      </InputGroup>

      <SubmitButton type="submit">
        {isUpdate ? "상품 수정 완료" : "상품 등록 완료"}
      </SubmitButton>
    </FormContainer>
  );
}