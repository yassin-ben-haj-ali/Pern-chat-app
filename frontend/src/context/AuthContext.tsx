import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


type AuthUserType = {
    id: string,
    username: string,
    fullName: string,
    profilePic: string,
    gender: string
}

const AuthContext = createContext<{
    AuthUser: AuthUserType | null,
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
    isLoading: boolean
}>({
    AuthUser: null,
    setAuthUser: () => { },
    isLoading: false
})


// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [AuthUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    //Logic will go here 
    useEffect(() => {

        const fetchAuthUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                setAuthUser(data);

            } catch (error:any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuthUser();

    }, []);

    return <AuthContext.Provider value={{ AuthUser, setAuthUser, isLoading }}>
        {children}
    </AuthContext.Provider>
}