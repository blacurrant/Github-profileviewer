import React, { useEffect, useState, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// import Repo from "../components/Repo";
import {  TiArrowBack } from 'react-icons/ti'
import axios from "axios";

const Repo = React.lazy(()=> import("../components/Repo"));

const UserInfo = () => {

  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  let EndPoint = "https://api.github.com/users";

  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function GetUserInfo() {
    const res = await axios.get(EndPoint + pathname);
    const data = await res.data;
    setUser(() => [data]);
  }

  async function GetUrls() {
    setUsers([]);
    setLoading(true);
    const res = await axios.get(EndPoint + pathname + `/${type}`);
    const data = await res.data;
    setUsers(data);
    setLoading(null);
  }

  useEffect(() => {
    GetUserInfo();
    GetUrls();
    console.log(users);
  }, [pathname, type]);

  return (
    <div className="py-5 w-10/12 mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex py-1 font-medium mb-4 text-black"
      >
        <TiArrowBack className="text-2xl font-bold" />Back
      </button>
      {user &&
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex flex-col lg:justify-center lg:items-center
            gap-10 md:container"
          >
            <div className="flex flex-row justify-start">
              <img
                src={uinfo.avatar_url}
                className="w-[100px] h-[100px] border-2 border-black/50 font-semibold rounded-md mx-0"
              />
              <div className="flex flex-col justify-center text-lg leading-10 px-3">
                <h1 className="text-xl md:text-3xl text-black">{uinfo.name}</h1>
                <a href={uinfo.html_url} target="_blank" className="text-indigo-400">
                  <span>@</span>{uinfo.login}
                </a>
              </div>
            </div>
            <div className="leading-10 text-black lg:text-center">
              {uinfo.bio ? <h1>{uinfo.bio}</h1> : ""}
                <div className="flex flex-row md:flex-col gap-10 md:gap-0">
                  <h1>
                    <span className="text-black/50 font-semibold">Followers :</span>
                    {uinfo.followers}
                  </h1>
                  <h1>
                    <span className="text-black/50 font-semibold">Following :</span>
                    {uinfo.following}
                  </h1>
                </div>
                <h1>
                  <span className="text-black/50 font-semibold">Repositories : </span>
                  {uinfo.public_repos}
                </h1>
                <h1>
                  <span className="text-black/50 font-semibold">Joined : </span>
                  {new Date(uinfo.created_at).toLocaleDateString()}
                </h1>
            </div>
          </div>
        ))}
      <h1 className="text-black/50 font-semibold my-5">Public Repositories:</h1>
      {/* {loading && <Loading />} */}
      <Suspense fallback={<Loading />} >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
          {users && <Repo users={users} />}
        </div>
      </Suspense>
    </div>
  );
};

export default UserInfo;
