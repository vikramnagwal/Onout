import { Input } from "../../input";

export function VerifyEmailForm() {
    return (
        <div>
            <h1>Verify your code</h1>
            <div>
                <Input placeholder="Enter Code"/>
                <button>Verify</button>
            </div>
        </div>
    )
}