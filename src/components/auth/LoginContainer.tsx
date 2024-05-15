"use client"
import useAuthContext from "@/contexts/auth.context";
import { AuthErrorCard } from "./AuthErrorCard";
import LoginForm from "./LoginForm";

export const LoginContainer = () => {

    const { authError } = useAuthContext();
    console.log({authError})

    return (
        <>
            {authError && <AuthErrorCard errorMessage={authError} />}
            <LoginForm/>
        </>
    );
}