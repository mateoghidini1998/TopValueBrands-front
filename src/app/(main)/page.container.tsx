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
            router.push('/warehouse');
            router.refresh();
        }

        setIsLoading(false);
    }, [authToken, user, router]);

    if (isLoading) {
        return <Loader />;
    }

    return authToken ? children : null;
}

export default IndexPageContainer;
