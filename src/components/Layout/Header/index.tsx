import { authService } from "@/services/auth";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
export default function Header() {
  async function logout() {
    await authService.logout();
    window.location.reload();
  }
  return (
    <Container className="bg-gray-100">
      <div className="container mx-auto py-4">
        <h1 className="text-3xl w-64 font-bold bg-blue-500">Hello Header!</h1>
      </div>
      <button className="bg-blue-500" onClick={logout}>
        Logout
      </button>
    </Container>
  );
}
