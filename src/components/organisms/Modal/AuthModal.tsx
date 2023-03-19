import ModalContainer from "@components/atoms/Div/ModalContainer";
import { flexCenter } from "@styles/flexCenter";
import { memo } from "react";
import styled from "styled-components";

interface AuthModalProps {
  children: React.ReactElement;
  width: number;
}

const AuthModal = memo(({ children, width }: AuthModalProps) => {
  return (
    <Background>
      <ModalContainer width={width}>{children}</ModalContainer>
    </Background>
  );
});

const Background = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100vh;
`;

export default AuthModal;
