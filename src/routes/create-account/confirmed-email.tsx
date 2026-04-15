import { InputOTPForm } from "#/components/confirmedOTP";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "states/userAuth";

export const Route = createFileRoute("/create-account/confirmed-email")({
  component: ConfirmedEmail,
  beforeLoad: async ({ location }) => {
    const storage = localStorage.getItem("horizon-auth");

    try {
      const authData = storage ? JSON.parse(storage) : null;
      const token = authData?.state?.token;

      if (!token || token === "undefined") {
        throw redirect({
          to: "/login",
          search: { redirect: location.href },
        });
      }
    } catch (e) {
      throw redirect({ to: "/login" });
    }
  },
});

export function ConfirmedEmail() {
  const userId = useAuth();
  return (
    <div className=" h-screen flex justify-center items-center">
      <InputOTPForm user_id={userId.user.id} type="email_verification" />
    </div>
  );
}
