import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../Timer/Timer";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-directory text-center p-4">
      <h1>User Directory</h1>
      <Timer />
      <div className="user-cards flex flex-wrap justify-center flex-col">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            className="user-card-link"
          >
            <div className="user-card bg-white border border-gray-300 rounded p-4 m-4 flex-1 max-w-full transition-transform duration-200 ease-in-out hover:scale-105">
              <div className="user-card-header mb-4">
                <h2>Name: {user.name}</h2>
                <h2>Posts: {user.posts}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
