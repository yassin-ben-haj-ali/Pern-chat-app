import Conversation from "./Conversation";

const Conversations = () => {


    const data = [
        {
            id: 1,
            fullName: "John Doe",
            profilePic: "https://avatar.iran.liara.run/public/boy?username=johndoe",
            emoji: "🎃",
        },
        {
            id: 2,
            fullName: "Jane Doe",
            profilePic: "https://avatar.iran.liara.run/public/girl?username=janedoe",
            emoji: "👻",
        },
        {
            id: 3,
            fullName: "Alice",
            profilePic: "https://avatar.iran.liara.run/public/girl?username=alice",
            emoji: "🦇",
        },
    ];


    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {data.map((conversation) => (
                <Conversation key={conversation.id} conversation={conversation} />
            ))}
        </div>
    );
};
export default Conversations;