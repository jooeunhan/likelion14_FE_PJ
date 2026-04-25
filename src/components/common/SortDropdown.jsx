import { useState } from "react";
import styled from "styled-components";
import sortingIcon from "../../assets/icons/sorting_icon.svg";
import checkIcon from "../../assets/icons/check_icon.svg";

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const SortButton = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #616161;
  font-weight: 400;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 10px;
  height: 11px;
`;

const CheckIcon = styled.img`
  width: 12px;
  height: 9px;
  margin-left: 18.5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  padding: 15px 0;
  min-width: 138px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px; /* 좌우 패딩 */
  font-size: 14px;
  color: ${(props) => (props.active ? "#000" : "#AFAFAF")};
  font-weight: 400;
  cursor: pointer;
`;

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("기본 정렬순");
  const options = ["기본 정렬순", "평점 높은순", "리뷰 많은 순"];

  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      <SortButton>
        <span>{selectedSort}</span>
        <Icon src={sortingIcon} alt="sort" />
      </SortButton>

      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <MenuItem
              key={option}
              active={selectedSort === option}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSort(option);
                setIsOpen(false);
              }}
            >
              {option}
              {selectedSort === option && <CheckIcon src={checkIcon} alt="checked" />}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </Container>
  );
}