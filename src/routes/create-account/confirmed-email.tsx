import { InputOTPForm } from "#/components/confirmedOTP";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth, usePreRegister } from "states/userAuth";

export const Route = createFileRoute("/create-account/confirmed-email")({
  component: ConfirmedEmail,
});

export function ConfirmedEmail() {
  const userId = useAuth();
  const preRegister = usePreRegister();
  return (
    <div className=" h-screen flex justify-center items-center">
      <InputOTPForm
        pre_registration_id={preRegister.preRegistration?.id}
        user_id={userId.user?.id}
        type="email_verification"
      />
    </div>
  );
}
