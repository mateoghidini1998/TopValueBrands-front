"use client"
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/auth.context";

const Loader = () => <div>Cargando...</div>;

const IndexPageContainer: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    const router = useRouter();
    const { authToken, user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authToken) {
            router.push('/login');
        } else if(user && user.role !== 'admin') {
            router.push('/pogenerator');
            router.refresh();
        } else {
            router.push('/');
        }
        setIsLoading(false);
    }, [authToken, user, router]);

    if (isLoading) {
        return <Loader />;
    }

    return authToken ? children : null;
}

export default IndexPageContainer;
