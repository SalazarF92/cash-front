import Button from "@/components/Button";
import useAuth from "@/components/hooks/useAuth";
import { authService } from "@/services/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-template-columns: minmax(0, 1fr);
  background-color: #040925;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: white;
  /* border: 1px solid white; */

  @media (min-width: 768px) {
    grid-template-columns: 540px minmax(0, 20rem);
  }

  .money {
    display: grid;
    place-items: center;
    position: relative;
    border-right: 1px solid white;
    border-radius: 5px 0 0 5px;
    background-repeat: no-repeat;
    background-image: url("/assets/images/homelogin.png");
    background-size: cover;

    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .info {
      position: absolute;
      /* display: flex;
      flex-direction: column;
      gap: 10px; */
      opacity: 0.9;
      z-index: 2;
    }
  }
`;

export default function Login() {
  const [register, setRegister] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const { login } = useAuth();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    e.preventDefault();

    if (register) {
      const data = await authService.create(username, password);
      if (data?.errors) {
        setMessages(data?.errors);
        return;
      }
      setRegister(false);
      setMessages(null)
      return;
    }
    const data = await login(username, password);
    if (data?.errors) {
      setMessages(data?.errors);
    }
    router.push("/transactions");
  }

  const Form = ({ create }: { create: boolean }) => {
    return (
      <form onSubmit={submit}>
        <div className="flex flex-col gap-5 box-border p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl mb-2 text-center">
              {create ? "Crie sua conta!" : "Faça seu Login!"}
            </h1>
            <div className="">
              <label className="block text-sm font-bold mb-2">Username</label>
              <input
                placeholder={`${create ? "Insira um nome de usuário" : ""}`}
                className="bg-[#2b2e46] text-sm w-full h-full rounded-md indent-2 p-1"
                type="text"
                name="username"
              />
            </div>
            <div className="">
              <label className="block white text-sm font-bold mb-2">
                Password
              </label>
              <input
                placeholder={`${create ? "insira um password" : ""}`}
                className="bg-[#2b2e46] text-sm w-full h-full rounded-md indent-2 p-1"
                type="password"
                name="password"
              />
              {messages ? (
                <div className="mt-2 gap-2 flex flex-col">
                  {messages?.map((message, index) => (
                    <div key={index} className="text-sm text-red-500">
                      {message}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className="text-sm hover:underline cursor-pointer"
              onClick={() => {
                setRegister(!register);
                setMessages(null);
              }}
            >
              {register ? "Já tem uma conta?" : "Criar conta"}
            </div>
            <Button text={create ? "Create" : "Login"} type="submit" />
          </div>
        </div>
      </form>
    );
  };

  return (
    <Container className="grid md:min-h-[25rem]">
      <div className="money">
        <div className="info hidden md:block">
          <h5 className="ml-4 mb-2 text-start text-4xl font-bold">
            Venha fazer parte!
          </h5>
          <div className="ml-4 text-lg font-bold">
            Entre para a melhor plataforma de transferências do mercado.
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="info md:hidden">
          <h5 className="ml-4 mb-2 text-start text-2xl font-bold mt-2">
            Venha fazer parte!
          </h5>
          <div className="ml-4 text-md font-bold">
            Entre para a melhor plataforma de transferências do mercado.
          </div>
        </div>
        <div className="w-full">
          {register ? <Form create={true} /> : <Form create={false} />}
        </div>
      </div>
    </Container>
  );
}
