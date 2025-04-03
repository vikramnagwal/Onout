"use client";

import { createContext, useContext, useState } from "react";

type RegisterContextProps = {
    email: string;
    password: string;
    step: "signup" | "verify" | "workspace";
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setStep: (step: "signup" | "verify" | "workspace") => void;
}

const RegisterContext = createContext<RegisterContextProps | undefined> (undefined);

export const RegisterProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState<"signup" | "verify" | "workspace">("signup");

    return (
        <RegisterContext.Provider value={{email, password, step, setEmail, setPassword, setStep}}>
            {children}
        </RegisterContext.Provider>
    )
}

export function useRegisterContext() {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error("useRegisterContext must be used within a RegisterProvider");
    }
    return context;
}