import React, { useRef, useEffect } from "react";

const PostPopup = ({ post, onClose }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (popupRef.current && popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClose]);

  return (
    <div className="post-popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="post-popup-content bg-white border border-gray-300 rounded p-4 text-center">
        <h2 className="text-2xl mb-4">{post.title}</h2>
        <p className="text-base mb-8">{post.content}</p>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostPopup;
