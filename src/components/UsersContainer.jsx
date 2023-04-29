import React from "react";
import { Link } from "react-router-dom";

const UsersContainer = ({ users }) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center py-5">
      {users &&
        users?.map((user, idx) =>
          user?.login ? (
            <div key={idx}>
                <Link to={`/${user?.login}` }><div
                className="flex w-[300px] md:w-[400px] justify-start border border-gray-500/20 hover:border-indigo-500  
                rounded-md p-3 items-center bg-white drop-shadow-md"
              >
                  <img
                    src={user?.avatar_url}
                    className="w-24 border-2  border-teal-400 rounded-full"
                  />

                                
                  <div className="flex flex-col gap-2 mx-5">
                    {user.name == null ? <h1 className="text-xl text-black uppercase">{user.login}</h1> : <h1 className="text-xl text-black">{user.name}</h1> }
                    <h1 className="text-sm text-black">@{user?.login}</h1>
                  </div>
              </div></Link>
            </div>
          ) : (
            <div className="text-lg">No user</div>
          )
        )}
    </div>
  );
};
export default UsersContainer;
