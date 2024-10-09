import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";




const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {

            const res = await fetch("/api/auth/logout", {
                method: "POST",
            })
            const data = await res.json();

            if (!res.ok) throw new Error(data.message)

            setAuthUser(null);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    return { loading, logout }
}

export default useLogout
