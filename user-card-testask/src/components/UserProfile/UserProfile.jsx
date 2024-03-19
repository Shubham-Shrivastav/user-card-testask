import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Post from "../Posts/Post";
import PostPopup from "../PostsPopUp/PostPopUp";

const UserProfile = ({ users }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const { id } = useParams();
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return <div className="user-profile bg-gray-200 p-4 text-center relative">User not found</div>;
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePopup = (e) => {
    console.log("pop close triggered..");
    setSelectedPost(null);
  };

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
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Catch phrase: {user.catchPhrase}</p>
          </div>
          <div className="user-column text-left">
            <p>Address: {user.address}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
      </div>

      <div className="user-posts flex flex-wrap">
        {user.posts.map((post) => (
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
