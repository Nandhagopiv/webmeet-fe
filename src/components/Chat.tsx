import { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { DataContext } from "../context/dataContextProrvider"
import { useContext } from "react"
import { useLocation } from "react-router-dom";

interface Chats {
    origin: boolean;
    msg: string;
}

interface friends {
    name: string;
    chats: Chats[];
}

const Chat = () => {
    const [chatstage, setChatstage] = useState<boolean>(true)
    const { allUsers, setAllUsers, user, setUser } = useContext(DataContext)
    const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
    const [friends, setfriends] = useState<friends[]>(userFromStorage?.chats || [])
    const data = useLocation()
    const [currentChat, setCurrentChat] = useState<friends | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (data.state.newMessage && user && user.chats) {

            setChatstage(false)
            const Result = user.chats.filter((person: friends) => {
                if (person.name == data.state.newMessage.username) {
                    return true
                } else {
                    return false
                }
            })
            if (Result.length == 0) {
                setCurrentChat({ name: data.state.newMessage.username, chats: [] })
            } else {
                setCurrentChat(Result[0])
            }
        }
    }, [])

    useEffect(() => {
        if (allUsers && user) {
            setAllUsers([...allUsers.filter((name) => name.username !== user.username), user])
            console.log(allUsers);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])

    useEffect(() => {
        if (allUsers) {
            localStorage.setItem("allUsers", JSON.stringify(allUsers));
        }
    }, [allUsers]);


    const handleMsg = (name: string) => {
        const selectedChat = friends.find((data) => data.name === name);
        if (selectedChat) {
            setCurrentChat(selectedChat);
        }
        setChatstage(false)
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value.charAt(0).toLocaleUpperCase() + e.target.value.slice(1))
    }

    const handleSend = () => {
        if (!message.trim() || !currentChat) return;

        const newMessage = { origin: true, msg: message };
        const newMessageToFriend = { origin: false, msg: message };

        const updatedChat: friends = {
            ...currentChat,
            chats: [...currentChat.chats, newMessage],
        };

        const updatedFriends: friends[] = [
            updatedChat,
            ...friends.filter(friend => friend.name !== currentChat.name),
        ];

        setCurrentChat(updatedChat);
        setfriends(updatedFriends);
        setMessage("");

        if (user) {
            setUser({
                ...user,
                chats: updatedFriends,
            });

            const updatedChatToFriend: friends = {
                name: user?.username,
                chats: [...currentChat.chats, newMessageToFriend],
            };

            if (allUsers) {
                const result = allUsers.find((person) => person.username === currentChat.name);

                if (result) {
                    if (result.chats?.some((data) => data.name == user.username)) {
                        setAllUsers([
                            ...allUsers.filter((name) => name.username !== currentChat.name),
                            {
                                ...result,
                                chats: [
                                    ...result.chats.filter((chat) => chat.name !== user.username),
                                    { name: user.username, chats: [...currentChat.chats, { origin: false, msg: message }] }
                                ],
                            },
                        ]);
                    } else {
                        setAllUsers([
                            ...allUsers.filter((name) => name.username !== currentChat.name),
                            { ...result, chats: [...(result.chats ?? []), updatedChatToFriend] },
                        ]);
                    }
                }
            }
        }

        localStorage.setItem("user", JSON.stringify(user));
    };


    return (
        <Fragment>
            <Navbar one={false} two={false} three={true} four={false} five={false} />
            <main className="w-full left-[16.7%] fixed flex h-full text-white">
                <section className="bg-black relative cursor-default w-1/4 border-r flex flex-col text-white border-solid border-zinc-800 h-full">
                    <h1 className="font-bold mt-10 px-5 text-xl">Hello, {user?.username}</h1>
                    <h1 className="mx-5 mt-12 mb-3 font-semibold">Messages</h1>
                    <div className="flex flex-col flex-nowrap scroller overflow-y-auto">
                        <div className="my-5 flex flex-col">
                            {friends.map((data) => {
                                return (
                                    <div
                                        onClick={() => handleMsg(data.name)}
                                        className="flex gap-5 py-3 px-5 hover:bg-[#121212] items-center"
                                        key={data.name}
                                    >
                                        <div className="rounded-full flex justify-center items-center w-14 h-14 text-xl font-bold bg-yellow-500"><p>{data.name.charAt(0).toLocaleUpperCase()}</p></div>
                                        <div className="flex flex-col gap-2">
                                            <p>{data.name}</p>
                                            <p className="text-zinc-400 w-56 text-nowrap overflow-hidden text-sm">{data.chats[data.chats.length - 1].origin == true && ("You: ")}{data.chats[data.chats.length - 1].origin == false && (data.name + ": ")}{data.chats[data.chats.length - 1].msg}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section style={{ justifyContent: chatstage ? 'center' : "", alignItems: chatstage ? 'center' : "" }} className="w-7/12 text-center flex">
                    <div style={{ display: chatstage ? "flex" : "none" }} className="flex-col gap-5">
                        <i className="fa-regular text-7xl text-white fa-message"></i>
                        <div className="flex flex-col items-center gap-3">
                            <h1 className="text-xl">Your Messages</h1>
                            <p className="text-sm text-gray-300">Send a message to start a chat</p>
                            <button className="bg-[#1693EE] py-2 text-sm px-5 w-fit rounded-lg">Send message</button>
                        </div>
                    </div>
                    <div style={{ display: chatstage ? "none" : "block" }} className="w-full">
                        {currentChat && (
                            <div className="fixed px-5 py-3 top-0 bg-black border-b flex justify-between items-center border-zinc-800 border-solid w-7/12">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="rounded-full flex justify-center items-center w-12 h-12 text-xl font-bold bg-yellow-500"><p>{currentChat.name.charAt(0).toLocaleUpperCase()}</p></div>
                                    <h1 className="text-xl font-bold">{currentChat.name}</h1>
                                </div>
                                <div className="bg-black border-solid flex justify-center items-center rounded-full border-white border-2 w-7 h-7">
                                    <i className="fa-solid text-white text-sm fa-info"></i>
                                </div>
                            </div>
                        )}
                        {currentChat && (
                            <div className="text-white h-full w-full scroller overflow-y-auto bg-black p-5 py-24 flex flex-col gap-3 justify-start">
                                {currentChat.chats.map((data: Chats, index) => (
                                    <div key={index}>
                                        {data.origin === true && (
                                            <div className="text-nowrap w-full flex items-center gap-2 justify-end">
                                                <p className="bg-[#3897EE] w-min rounded-3xl text-right px-3 py-2">{data.msg}</p>
                                                <p className="text-zinc-400 text-xs">Me</p>
                                            </div>
                                        )}
                                        {data.origin === false && (
                                            <div className="text-nowrap w-full flex items-center gap-2 justify-start">
                                                <p className="text-[#3897EE] text-xs">{currentChat.name}</p>
                                                <p className="bg-[#262626] w-min rounded-3xl text-right px-3 py-2">{data.msg}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="fixed bottom-0 bg-black w-7/12 p-5">
                            <div className="flex border-zinc-800 justify-between border border-solid px-5 p-3 rounded-3xl gap-5">
                                <input onChange={handleInput} value={message} placeholder="Message..." className="bg-transparent w-full outline-none text-sm" type="text" />
                                <button onClick={handleSend} className="text-[#1693EE] font-bold">Send</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    );
};

export default Chat;
