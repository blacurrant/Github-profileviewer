import React from "react";

const Repo = ({ users }) => {
  return (
    <>
      {users.map((s, idx) => (
        <div key={idx} className="bg-white drop-shadow-md border border-gray-500/20 p-3 leading-8">
          <a
            href={s.html_url}
            target="_blank"
            className="text-black break-words font-semibold hover:underline"
          >
            {s.full_name}
          </a>
          <div className="flex gap-x-5 text-black/50">
            <h1 className="text-sm font-semibold"> {"🟢" + s.language}</h1>
            <h1 className="text-sm font-semibold">forks : {s.forks}</h1>
            <h1 className="text-sm font-semibold">
              stars : {s.stargazers_count}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Repo;
