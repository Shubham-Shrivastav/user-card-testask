import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {BallTriangle} from 'react-loader-spinner'

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        const usersWithPosts = await Promise.all(
          response.data.map(async (user) => {
            const postsResponse = await axios.get(
              `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
            );
            return {
              ...user,
              posts: postsResponse.data.length
            };
          })
        );

        setUsers(usersWithPosts);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#EEEEEE"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /></div>;
  }

  if (error) {
    return <div >Error: {error}</div>;
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl text-[#EEEEEE] mx-auto my-6 font-semibold">Directory</h1>
      <div className="flex flex-wrap justify-center flex-col">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
          >
            <div className="bg-[#31363F] border border-gray-400 rounded p-4 m-2 flex flex-col justify-between transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-[#EEEEEE]">Name: {user.name}</h2>
                </div>
                <div>
                  <h2 className="text-[#EEEEEE]">Posts: {user.posts}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  );
};

export default Home;
