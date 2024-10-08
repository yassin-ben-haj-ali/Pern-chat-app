import Message from "./Message";

const Messages = () => {

    const data = [
        {
            id: 1,
            fromMe: false,
            body: "Hello John!",
        },
        {
            id: 2,
            fromMe: true,
            body: "Hi! How's it going?",
        },
        {
            id: 3,
            fromMe: false,
            body: "I'm doing well, thanks for asking. How about you?",
        },
        {
            id: 4,
            fromMe: true,
            body: "I'm good too. Been busy with work.",
        },
    ];

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {data.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};
export default Messages;