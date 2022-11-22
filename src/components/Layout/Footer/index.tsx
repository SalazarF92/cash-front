import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #1a202c 10%, #2d3748 100%);
  padding: 20px;
  align-items: center;
`;

export default function Footer() {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <span>Todos os direitos reservados ©2022</span>
        <Link
          className="hover:underline hover:text-blue-400"
          href="https://www.linkedin.com/in/flavio-r-salazar/"
        >
          LinkedIn
        </Link>
      </div>
    </Container>
  );
}
