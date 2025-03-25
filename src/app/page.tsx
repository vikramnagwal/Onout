import { RegisterProvider } from "@/packages/ui/auth/register/context";
import { VerifyEmailForm } from "@/packages/ui/auth/register/verify-email";

export default async function Home() {
  return (
    <RegisterProvider>
      <div>
        <p>Users</p>
        <VerifyEmailForm />
      </div>
    </RegisterProvider>
  );
}
