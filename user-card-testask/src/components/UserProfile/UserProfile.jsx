import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Post from "../Posts/Post";
import PostPopup from "../PostsPopUp/PostPopUp";
import Timer from "../Timer/Timer";
import { BallTriangle } from 'react-loader-spinner'

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, userPostsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
        ]);

        setUserData(userDataResponse.data);
        setUserPosts(userPostsResponse.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
  };

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

  if (error || !userData) {
    return <div className="bg-gray-200 p-4 text-center relative">Error fetching user data</div>;
  }

  return (
    <div className=" bg-[#222831] p-4 text-center relative">
      <div className="flex flex-col items-start sm:flex sm:flex-row sm:justify-between mb-4">
        <Link to="/">
          <button className="my-5 hidden sm:block bg-blue-500 hover:bg-blue-700 text-white m-1 px-4 rounded">Back</button>
        </Link>
        <Timer />
      </div>
      <h1 className="text-4xl text-[#EEEEEE] mx-auto my-6 font-semibold">Profile Page</h1>

      <div className="bg-[#31363F] border border-gray-300 rounded p-4 mb-4">
        <div className="flex justify-between mb-4">
          <div className="text-left text-[#EEEEEE]">
            <p>Name: {userData.name}</p>
            <p>Username: {userData.username}</p>
            <p>catchPhrase: {userData.company.catchPhrase}</p>
          </div>
          <div className="text-left text-[#EEEEEE]">
            <p>Address: {userData.address.suite}, {userData.address.city}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userPosts.map((post) => (
          <div key={post.id}>
            <Post post={post} onClick={handlePostClick} />
          </div>
        ))}
      </div>
      {selectedPost && <PostPopup post={selectedPost} onClose={handleClosePopup} />}
    </div>
  );
};

export default UserProfile;
