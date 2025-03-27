import { Button } from "@ui/button";
import { InputOTP } from "@ui/input-otp";
import { MailCheck } from "lucide-react";

export function VerifyEmailForm() {
    return (
      <div className="flex p-1">
        <form>
          <InputOTP length={6}/>
          <Button
            icon={<MailCheck size={24} />}
            text={"Verify"}
            type="submit"
            className="w-full mt-6"
          />
        </form>
      </div>
    );
}