import { authService } from "@/services/auth";

export default function Login() {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    e.preventDefault();

    const token = await authService.login(username, password);

    if (token) {
      authService.setToken(token);
    }
  }

  return (
    <div className="bg-gray-100">
      <form onSubmit={submit}>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex w-64 flex-col gap-2">
            <div className="">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input type="text" name="username" />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input type="password" name="password" />
            </div>
          </div>
          <button className="w-32 bg-blue-500" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
