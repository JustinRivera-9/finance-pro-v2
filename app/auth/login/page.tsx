// import { login, signup } from "./actions";
import { login, signup } from "@/app/auth/login/actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        className="text-dark"
        id="email"
        name="email"
        type="email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className="text-dark"
        id="password"
        name="password"
        type="password"
        required
      />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
