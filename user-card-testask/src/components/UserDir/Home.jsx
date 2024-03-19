import React from "react";
import { Link } from "react-router-dom";
import Timer from "../Timer/Timer";

const Home = ({ users }) => {
  return (
    <div className="user-directory text-center p-4">
      <h1>User Directory</h1>
      <Timer />
      <div className="user-cards flex flex-wrap justify-center flex-col">
        {users.map((user) => (
          <Link key={user.id} to={`/user/${user.id}`} className="user-card-link">
            <div className="user-card bg-white border border-gray-300 rounded p-4 m-4 flex-1 max-w-full transition-transform duration-200 ease-in-out hover:scale-105">
              <div className="user-card-header mb-4">
                <h2>Name: {user.name}</h2>
                <p>Posts: {user.posts.length}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
