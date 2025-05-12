import { Fragment } from "react"
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  one?: boolean;
  two?: boolean;
  three?: boolean;
  four?: boolean;
  five?: boolean;
}

const Navbar = (props: NavbarProps) => {
    const Navigate = useNavigate()
    const handleMsg = () =>{
        Navigate('/messages', { state: { newMessage: null } })
    }

    const handleHome = () =>{
        Navigate('/')
    }

    const handleSearch = () =>{
        Navigate('/Search')
    }

    const handleProfile = () =>{
        Navigate('/Myaccount')
    }

    const handleLogout = () =>{
        
    }

    return (
        <Fragment>
            <main className="fixed bg-black w-1/6 border-r flex flex-col justify-between py-10 px-5 text-white border-solid border-zinc-800 h-full">
                <div className="flex flex-col gap-3">
                    <div className="p-3 mb-3 logo text-5xl cursor-default text-yellow-500">
                        <p>Webmeet</p>
                    </div>
                    <div onClick={handleHome} style={{fontWeight: props.one ? 'bold' : ''}} className="flex gap-3 items-center p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]">
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </div>
                    <div onClick={handleSearch} style={{fontWeight: props.two ? 'bold' : ''}} className="flex gap-3 items-center p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]">
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                        <p>Search</p>
                    </div>
                    <div onClick={handleMsg} style={{fontWeight: props.three ? 'bold' : ''}} className="flex gap-3 items-center p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]">
                        <i className="fa-solid fa-message text-white"></i>
                        <p>Messages</p>
                    </div>
                    <div onClick={handleProfile} style={{fontWeight: props.four ? 'bold' : ''}} className="flex gap-3 items-center p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]">
                        <i className="fa-solid fa-user text-white"></i>
                        <p>Profile</p>
                    </div>
                </div>
                <div style={{fontWeight: props.five ? 'bold' : ''}} className="flex gap-3 items-center p-3 rounded-lg cursor-pointer hover:bg-[#1A1A1A]">
                    <i className="fa-solid fa-bars text-white"></i>
                    <p>More</p>
                </div>
            </main>
        </Fragment>
    )
}

export default Navbar
