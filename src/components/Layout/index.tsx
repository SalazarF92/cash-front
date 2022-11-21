import react from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Container = styled.div`
  background-color: #1a202c;
`;

export default function DefaultLayout({
  children,
}: {
  children: react.ReactNode;
}) {
  return (
    <Container className="">
      <Header />
      <div className="min-h-screen flex flex-1 flex-col justify-center items-center">
        {children}
      </div>
      <Footer />
    </Container>
  );
}
