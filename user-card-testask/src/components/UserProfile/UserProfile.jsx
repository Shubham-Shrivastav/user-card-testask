import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Post from "../Posts/Post";
import PostPopup from "../PostsPopUp/PostPopUp";

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
    return <div>Loading...</div>;
  }

  if (error || !userData) {
    return <div className="user-profile bg-gray-200 p-4 text-center relative">Error fetching user data</div>;
  }

  return (
    <div className="user-profile bg-gray-200 p-4 text-center relative">
      <h1 className="mb-4">Profile Page</h1>
      <div className="go-back-button absolute top-4 left-4">
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
        </Link>
      </div>
      <div className="user-details bg-white border border-gray-300 rounded p-4 mb-4">
        <div className="user-row flex justify-between mb-4">
          <div className="user-column text-left">
            <p>Name: {userData.name}</p>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
          </div>
          <div className="user-column text-left">
            <p>Address: {userData.address.street}, {userData.address.suite}, {userData.address.city}, {userData.address.zipcode}</p>
            <p>Website: {userData.website}</p>
            <p>Company: {userData.company.name}</p>
          </div>
        </div>
      </div>

      <div className="user-posts flex flex-wrap">
        {userPosts.map((post) => (
          <div key={post.id} className="post-wrapper flex-grow-0 flex-shrink-0 w-1/3 mb-4">
            <Post post={post} onClick={handlePostClick} />
          </div>
        ))}
      </div>
      {selectedPost && <PostPopup post={selectedPost} onClose={handleClosePopup} />}
    </div>
  );
};

export default UserProfile;
