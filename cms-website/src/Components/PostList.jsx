import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Latest Posts
      </h2>
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="block bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {post.imageUrl && (
                <img
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 truncate">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {formatDate(post.createdAt)} by {post.author}
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  {post.body.length > 150
                    ? `${post.body.slice(0, 150)}...`
                    : post.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
