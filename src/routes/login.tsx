import { LoginForm } from "#/components/login-form";
import { createFileRoute } from "@tanstack/react-router";
import image from "../assets/pexels-maltelu-1606957.jpg";

export const Route = createFileRoute("/login")({ component: Login });

export default function Login() {
  return (
    <>
      <img
        src={image}
        className="w-full h-full absolute -z-1 top-0 object-cover"
      />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 backdrop-blur-[5px] bg-[rgba(0,0,75,0.85)]">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
