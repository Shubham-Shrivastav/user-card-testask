import React from "react";

const Post = ({ post, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(post);
  };

  return (
    <div className="bg-[#31363F] border border-gray-300 rounded p-4 m-2 cursor-pointer hover:scale-105" onClick={handleClick}>
      <h2 className="text-xl font-semi-bold text-[#76ABAE]">{post.title}</h2>
      <p className="text-base mt-2 text-[#EEEEEE]">{post.body}</p>
    </div>
  );
};

export default Post;
