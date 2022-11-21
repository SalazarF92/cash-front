import react from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Container = styled.div`
  width: 100%;
  height: 960px;
  background-color: #1a202c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;


export default function DefaultLayout({ children }: { children: react.ReactNode }) {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
