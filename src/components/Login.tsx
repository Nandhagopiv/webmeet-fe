import { Fragment, useState, ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/dataContextProrvider"
import { useContext } from "react"

const Login = () => {
    const [eUsername, seteUsername] = useState<string>('')
    const [ePassword, setePassword] = useState<string>('')
    const [msgCol, setmsgCol] = useState<boolean>(false)
    const [msg, setmsg] = useState<string>("Meet your loved ones on webmeet!")
    const Navigate = useNavigate()
    const { user, setUser, allUsers, setAllUsers } = useContext(DataContext)

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        seteUsername(e.target.value)
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setePassword(e.target.value)
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userfound = false;
        if (allUsers) {            
            allUsers.forEach((data) => {
                if (eUsername === data.username && ePassword === data.password) {
                    const userData = {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        mobile: data.mobile,
                        chats: data.chats,
                    };
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    Navigate("/messages", { state: { newMessage: null } });
                    userfound = true;
                } else if (eUsername === data.username && ePassword !== data.password) {
                    setmsg("Incorrect Password");
                    setmsgCol(true);
                    userfound = true;
                }
            });
        }
        if (!userfound) {
            setmsg("User not Found. Sign up and Login Again");
            setmsgCol(true);
        }
    };    

    return (
        <Fragment>
            <main className="w-full flex justify-center">
                <div className="flex w-1/4 p-10 rounded-lg bg-[#262626] justify-center m-36">
                    <form onSubmit={handleLogin} className="flex text-white text-sm flex-col gap-5 w-80">
                        <div className="p-3 logo cursor-default justify-center flex text-5xl text-yellow-500">
                            <p>Webmeet</p>
                        </div>
                        <p style={{ color: msgCol ? "red" : "white" }}>{msg}</p>
                        <input
                            onChange={handleUsername}
                            type="text"
                            className="bg-[#1A1A1A] border-solid border-gray-200 p-2 outline-none"
                            placeholder="username"
                        />
                        <input
                            onChange={handlePassword}
                            type="password"
                            className="bg-[#1A1A1A] p-2 outline-none"
                            placeholder="password"
                        />
                        <button
                            type="submit"
                            className="bg-[#2972B1] text-white p-2 rounded-md font-bold"
                        >
                            Login
                        </button>
                        <p>Don't have an account? <Link className="underline" to={'/signup'}>Signup</Link></p>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default Login
