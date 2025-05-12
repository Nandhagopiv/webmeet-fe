import { Fragment } from "react/jsx-runtime"
import Navbar from "./Navbar"
import { useState, ChangeEvent } from "react"
import { DataContext } from "../context/dataContextProrvider"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

interface Messages {
    origin: boolean,
    msg: string
}

interface Chats {
    name: string,
    chats: Messages[]
}

interface AllUsers {
    username: string;
    password: string;
    email: string;
    mobile: number;
    chats: Chats[] | null;
}

const Search = () => {
    const Navigate = useNavigate()
    const [searchValue, setSearchValue] = useState<string>("")
    const { user, setUser, allUsers, setAllUsers } = useContext(DataContext)
    const [searchArr, setSearchArr] = useState<AllUsers[] | null>(allUsers)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleSearch = () => {
        if (allUsers) {
            const searchResult = allUsers.filter((data) => {
                if (data.username.toLocaleUpperCase().includes(searchValue.toLocaleUpperCase())) {
                    return true;
                } else {
                    return false;
                }
            })

            setSearchArr(searchResult)
        }
    }

    const handleNewMessage = (user: AllUsers) => {
        Navigate("/messages", { state: { newMessage: user } })
    }

    return (
        <Fragment>
            <Navbar one={false} two={true} three={false} four={false} five={false} />
            <main className="w-full left-[16.7%] fixed flex h-full text-white">
                <section className="bg-black relative cursor-default w-5/6 border-r flex flex-col text-white border-solid border-zinc-800 h-full">
                    <h1 className="my-5 mx-60 text-2xl font-semibold">Search</h1>
                    <div className="my-5 mx-60 p-3 bg-[#363636] flex gap-3 items-center rounded-xl">
                        <i className="fa-solid text-gray-400 fa-magnifying-glass"></i>
                        <input value={searchValue} onChange={handleChange} onKeyUp={handleSearch} className="w-full outline-none bg-transparent" placeholder="Search" type="text" />
                    </div>
                    <div className="flex flex-col overflow-y-auto scroller gap-2 my-5 mx-60">
                        {searchArr && searchArr.map((data, index) => {
                            if (!data.username) return null;
                            return (
                                <div key={index} className="flex justify-between scroller hover:bg-[#1A1A1A] border-solid border-[#1A1A1A] border px-5 py-3 rounded-lg items-center">
                                    <div className="flex items-center gap-5">
                                        <div className="rounded-full flex justify-center items-center w-12 h-12 text-xl font-bold bg-yellow-500">
                                            {data.username.charAt(0).toLocaleUpperCase()}
                                        </div>
                                        <p className="text-xl font-bold">{data.username}</p>
                                    </div>
                                    <button onClick={() => handleNewMessage(data)} className="bg-[#1693EE] px-5 py-2 font-semibold rounded-md cursor-pointer">Message</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Search