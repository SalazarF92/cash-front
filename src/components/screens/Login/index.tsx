import { authService } from "@/services/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-width: 920px;
  min-height: 400px;
  /* border: 1px solid white; */
  margin: auto;
  background-color: #040925;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: white;

  /* .bend {
    div {
      height: 20px;
      overflow: hidden;
      transition: 0.5s;
    }

    .bend.toggle {
      height: 0;
      margin-top: 20px;
    }
  } */
  .money {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: black;
    border-right: 1px solid white;
    border-radius: 5px 0 0 5px;
    background-repeat: no-repeat;

    .back {
      width: 100%;
      height: 100%;
      background-image: url("https://www.loyensloeff.com/contentassets/7ca5076ac555499c84ceedf4553233de/money-2.jpg?width=580&height=387");
      background-size: cover;
      opacity: 0.35;
    }
  }
`;

export default function Login() {
  const [register, setRegister] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    e.preventDefault();

    const token = await authService.login(username, password);

    if (token) {
      router.push("/transactions");
    }
  }

  const Form = ({ create }: { create: boolean }) => {
    return (
      <form onSubmit={submit}>
        <div className="flex flex-col w-[320px] items-center justify-center gap-5 box-border p-2">
          <div className="w-full flex flex-col gap-2">
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
            </div>
          </div>
          <div className="flex justify-evenly">
            {!create ? (
              <div
                className="w-full hover:underline cursor-pointer"
                onClick={() => setRegister(true)}
              >
                Criar conta
              </div>
            ) : null}
            <button className="w-32 bg-blue-500" type="submit">
              {create ? "Create" : "Login"}
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Container>
      <div className="money">
        <div className="back"></div>
        <div className="flex flex-col opacity-90 p-4 absolute gap-5">
          <h5 className="ml-4 w-full text-start text-4xl font-bold">
            Venha fazer parte!
          </h5>
          <div className="ml-4 text-lg font-bold">
            Entre para a melhor plataforma de transferências do mercado.
          </div>
        </div>
      </div>

      <div className="">
        <Form create={false} />
        {register ? <Form create={true} /> : null}
      </div>
    </Container>
  );
}
