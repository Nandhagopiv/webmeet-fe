import React, { createContext, useContext, ReactNode, useState } from 'react';

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

interface UserContextType {
  user: AllUsers | null;
  setUser: (user: AllUsers | null) => void;
  allUsers: AllUsers[] | null;
  setAllUsers: (users: AllUsers[] | null) => void;
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => { },
  allUsers: null,
  setAllUsers: () => { },
};

const DataContext = createContext<UserContextType>(defaultContextValue);

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }) => {
  const userFromStorage = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as AllUsers) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      return null;
    }
  })();
  const [user, setUser] = useState<AllUsers | null>(userFromStorage);
  const [allUsers, setAllUsers] = useState<AllUsers[] | null>([
    {
      username: "Nandhu",
      password: "123",
      email: "nandhu@example.com",
      mobile: 1234567890,
      chats: []
    },
    {
      username: "Bob456",
      password: "bobpass",
      email: "bob@example.com",
      mobile: 9876543210,
      chats: []
    },
    {
      username: "Charlie789",
      password: "charliepass",
      email: "charlie@example.com",
      mobile: 5556667777,
      chats: []
    },
    {
      username: "Alice007",
      password: "alicepass",
      email: "alice007@example.com",
      mobile: 1112223333,
      chats: []
    },
    {
      username: "DavidX",
      password: "davidxpass",
      email: "davidx@example.com",
      mobile: 4445556666,
      chats: []
    },
    {
      username: "EvelynZ",
      password: "evelynpass",
      email: "evelynz@example.com",
      mobile: 7778889999,
      chats: []
    },
    {
      username: "FrankY",
      password: "frankypass",
      email: "franky@example.com",
      mobile: 1010101010,
      chats: []
    },
    {
      username: "Grace99",
      password: "gracepass",
      email: "grace99@example.com",
      mobile: 2020202020,
      chats: []
    },
    {
      username: "Henry01",
      password: "henrypass",
      email: "henry01@example.com",
      mobile: 3030303030,
      chats: []
    },
    {
      username: "IsabelX",
      password: "isabelpass",
      email: "isabelx@example.com",
      mobile: 4040404040,
      chats: []
    }
  ]);

  return (
    <DataContext.Provider value={{ user, setUser, allUsers, setAllUsers }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export default DataContextProvider;
export { DataContext, useDataContext };
