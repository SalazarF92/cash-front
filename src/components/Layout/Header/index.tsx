import { authService } from "@/services/auth";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  //background color with linear gradient
  background: linear-gradient(180deg,#2d3748 10%,  #1a202c  100%);
  display: flex;
  align-items: center;
  justify-content: space-between;

`;
export default function Header() {
  const token = authService.getToken();

  async function logout() {
    await authService.logout();
    window.location.reload();
  }

  return (
    <Container className="">
      <div className="">
        <Image
          src={"/assets/images/logo_nobg.png"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      {token ? (
        <button
          className="text-xl hover:underline hover:text-blue-600"
          onClick={logout}
        >
          Logout
        </button>
      ) : null}
    </Container>
  );
}
