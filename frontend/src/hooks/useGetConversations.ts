import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { ConversationType } from "../zustand/useConversation";




const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {

                const res = await fetch("/api/message/")
                const data = await res.json();

                if (!res.ok) throw new Error(data.message)

                setConversations(data);

            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }

        }
        getConversations();
    }, [])

    return { loading, conversations }
}

export default useGetConversations
