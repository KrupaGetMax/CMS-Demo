import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Post not found");
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error)
    return (
      <p className="text-red-500 text-center mt-5 text-xl font-semibold">
        {error}
      </p>
    );
  if (!post)
    return (
      <p className="text-gray-500 text-center mt-5 text-xl font-semibold">
        Loading...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt={post.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
        <p className="font-medium">{post.author}</p>
        <p>{formatDate(post.createdAt)}</p>
      </div>
      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
      />
    </div>
  );
};

export default PostDetail;
