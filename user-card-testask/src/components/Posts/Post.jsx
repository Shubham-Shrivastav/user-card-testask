import React from "react";

const Post = ({ post, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(post);
  };

  return (
    <div className="post-card bg-white border border-gray-300 rounded p-4 m-2 cursor-pointer hover:scale-105" onClick={handleClick}>
      <h2 className="post-title text-xl font-bold">{post.title}</h2>
      <p className="post-content text-base mt-2 text-gray-700">{post.content}</p>
    </div>
  );
};

export default Post;
