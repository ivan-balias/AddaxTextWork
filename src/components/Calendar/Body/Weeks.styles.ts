import styled from "styled-components";

export const Weeks = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  width: 100%;
  text-transform: uppercase;
  margin-top: 20px;

  div {
    width: calc(${window.innerWidth} / 7);
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-weight: bold;

  }
`;