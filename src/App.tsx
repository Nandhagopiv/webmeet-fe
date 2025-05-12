import { Fragment } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import DataContextProvider from "./context/dataContextProrvider";
import Search from "./components/Search";
import Myaccount from "./components/Myaccount";

function App() {
  return (
    <Fragment>
      <DataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/messages" element={<Chat />}></Route>
            <Route path="/Search" element={<Search />}></Route>
            <Route path="/Myaccount" element={<Myaccount />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </Fragment>
  );
}

export default App;
