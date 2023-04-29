import React, { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading";
import UsersContainer from "../components/UsersContainer";
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const user = useRef("");

  async function AllUesrs() {
    if (user.current.value === "") {
      setLoading(true);
      const res = await axios.get("https://api.github.com/users");
      const data = await res.data;
      setUsers(data);
      setLoading(null);
    }
  }

  async function FindUser() {
    setLoading(true);
    if (user.current.value !== "") {
      setUsers("");
      const res = await axios.get("https://api.github.com/users" + "/" + user.current.value);
      const data = await res.data;
      setUsers(() => [data]);
      console.log(users);
      user.current.value = "";
    } else {
      AllUesrs();
    }
    setLoading(null);
  }

  useEffect(() => {
    AllUesrs();
  }, [user, setUsers]);

  return (
    <div>
      <form onClick={(e) => e.preventDefault()} className="relative flex justify-center h-11 my-5 items-center">
        <input
          placeholder="Search github username"
          ref={user}
          type="text" 
          className="h-full md:w-1/3 outline-none rounded-sm text-white px-5 
         bg-indigo-500 text-lg w-2/3 placeholder:text-white/80 drop-shadow-md"
        />
        
        <button
          onClick={FindUser}
          className="bg-indigo-500 font-bold text-white text-2xl px-4 h-full drop-shadow-md"
        >
          <AiOutlineSearch />
        </button>
      </form>
      <div>{loading ? <Loading /> : <UsersContainer users={users} loading={loading} />}</div>
    </div>
  );
};

export default Users;
