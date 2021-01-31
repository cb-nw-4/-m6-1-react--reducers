import React from "react";
import styled, {keyframes} from "styled-components";
import { CircularProgress, Progress } from "@material-ui/core";
import { AiOutlineLoading3Quarters as Load } from "react-icons/ai";

const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress  />
    </Wrapper>
  );
};

const spin = keyframes`
0% {
    transform: rotate(0deg);
} 100% {
    transform: rotate(360deg);
}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
margin-top:300px;
animation: ${spin} 1.5s infinite;
`;

const LoadIcon = styled(Loading)``;
export default Loading;
