import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

type SignupInputs = {
    username: string,
    fullName: string,
    password: string,
    confirmPassword: string,
    gender: string
}


const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs: SignupInputs) => {
        setLoading(true);
        try {

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json();

            if (!res.ok) throw new Error(data.message)

            setAuthUser(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    return { loading, signup }
}

export default useSignup
