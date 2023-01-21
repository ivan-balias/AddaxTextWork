import styled from "styled-components";
import {DayType} from "../../../types/DayType";

export const DaysWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(7, calc(100%/7));
  grid-row-gap: 13px;
  width: 100%;
  margin-top: 10px;
`;

export const Day = styled.div<DayType>`
  width: calc(100% - 13px);
  height: calc(${window.innerHeight}px / 12);
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: ${props => props.inactive ? "#3b3b3b" : "#4f4f4f"};
  padding: 20px;
  border-radius: 5px;
  cursor: ${props => props.inactive ? "auto" : "pointer"};

  &:hover {
    background:  ${props => props.inactive ? "#3b3b3b" : "#626262"};
    transition: all 100ms linear;
  }

  span {
    //align-self: end;
    justify-self: end;
  }

  i {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: ${props => props.inactive ? "transparent" : "orange"};
  }
`
