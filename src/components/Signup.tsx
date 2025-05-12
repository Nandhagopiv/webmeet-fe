import { Fragment, useState, ChangeEvent, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/dataContextProrvider";

const Signup = () => {
    const Navigate = useNavigate();

    const [existingUser, setExistingUser] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const { allUsers, setAllUsers } = useContext(DataContext);

    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userExists = allUsers?.some(
            user => user.username === newUser || user.mobile === Number(phone) || user.email === email
        );


        if (userExists) {
            setExistingUser(true);
        } else {
            setExistingUser(false);

            const newUserObj = {
                username: newUser,
                password: newPassword,
                email: email,
                mobile: Number(phone),
                chats: []
            };

            if (allUsers) {
                setAllUsers([...allUsers, newUserObj]);
            } else {
                setAllUsers([newUserObj]);
            }

            Navigate('/login');
        }
    };

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    return (
        <Fragment>
            <main className="w-full flex justify-center">
                <div className="flex w-1/4 p-10 rounded-lg bg-[#262626] justify-center m-24">
                    <form onSubmit={handleSignUp} className="flex text-white text-sm flex-col gap-5 w-80">
                        <div className="p-3 cursor-default logo justify-center flex text-5xl text-yellow-500">
                            <p>Webmeet</p>
                        </div>
                        <p style={{ color: existingUser ? 'red' : 'white' }}>
                            {existingUser ? 'Username, Email or Phone is already existed' : 'You can Sign up to webmeet here!'}
                        </p>
                        <input
                            type="text"
                            onChange={handleUsername}
                            value={newUser}
                            required
                            className="bg-[#1A1A1A] border-solid border-gray-200 p-2 outline-none"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            onChange={handlePassword}
                            value={newPassword}
                            required
                            className="bg-[#1A1A1A] p-2 outline-none"
                            placeholder="Password"
                        />
                        <input
                            type="email"
                            onChange={handleEmail}
                            value={email}
                            className="bg-[#1A1A1A] p-2 outline-none"
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            onChange={handlePhone}
                            value={phone}
                            required
                            className="bg-[#1A1A1A] p-2 outline-none"
                            placeholder="Phone Number"
                        />
                        <button
                            type="submit"
                            className="bg-[#2972B1] text-white p-2 rounded-md font-bold"
                        >
                            Sign up
                        </button>
                        <p>Already have an account? <Link className="underline" to={'/login'}>Login</Link></p>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default Signup
