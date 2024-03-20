import React, { useRef, useEffect } from "react";

const PostPopup = ({ post, onClose }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClose]);

  return (
    <div className="max-w-96 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50">
      <div ref={popupRef} className="bg-white border border-gray-300 rounded p-4 text-center shadow-lg">
        <h2 className="text-l mb-4 font-semibold">{post.title}</h2>
        <p className="text-base mb-8">{post.body}</p>
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
