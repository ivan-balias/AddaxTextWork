import styled from "styled-components";

export const CalendarTitle = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;

  .controls {
    flex-basis: 30%;
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    color: #fff;

    span {
      flex-basis: 25%;
      text-align: center;
    }

    svg {
      cursor: pointer;
    }
  }

  .buttons {
    display: flex;
    gap: 15px;

    button {
      background: #868686;
      padding: 5px 10px;
      border-radius: 5px;
      border: 0;
      cursor: pointer;
    }
  }
`
