import { RegisterProvider } from "@/packages/ui/auth/register/context";
import { SignUpEmail } from "@/packages/ui/auth/register/signup-email";
import { Button } from "@/packages/ui/button";
import { InputOTP } from "@/packages/ui/input-otp";
import { LoadingSpinner } from "@/packages/ui/loaders/loading-spinner";
import { ButtonTooltip, Tooltip } from "@/packages/ui/tooltip";

export default async function Home() {
  return (
    <RegisterProvider>
      <div>
        <p>Users</p>
        <InputOTP />
      </div>
    </RegisterProvider>
  );
}
