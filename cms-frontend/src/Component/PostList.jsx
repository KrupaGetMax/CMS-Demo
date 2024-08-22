// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [editPost, setEditPost] = useState(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [newBody, setNewBody] = useState("");
//   const [newImage, setNewImage] = useState(null);
//   const [newAuthor, setNewAuthor] = useState(""); // Add state for author

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/posts").then((response) => {
//       setPosts(response.data);
//     });
//   }, []);

//   const handleEditClick = (post) => {
//     setEditPost(post);
//     setNewTitle(post.title);
//     setNewBody(post.body);
//     setNewImage(post.imageUrl);
//     setNewAuthor(post.author); // Set author when editing
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", newTitle);
//     formData.append("body", newBody);
//     formData.append("author", newAuthor); // Append author
//     if (newImage) {
//       formData.append("image", newImage);
//     }

//     axios
//       .put(`http://localhost:5000/api/posts/${editPost._id}`, formData)
//       .then((response) => {
//         setPosts(
//           posts.map((post) =>
//             post._id === response.data._id ? response.data : post
//           )
//         );
//         setEditPost(null);
//       });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
//       setPosts(posts.filter((post) => post._id !== id));
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Posts
//       </h2>
//       {editPost && (
//         <div className="mb-6 p-4 border border-gray-300 rounded-lg">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">
//             Edit Post
//           </h3>
//           <form
//             onSubmit={handleUpdate}
//             className="space-y-4"
//             encType="multipart/form-data"
//           >
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Body:
//               </label>
//               <textarea
//                 value={newBody}
//                 onChange={(e) => setNewBody(e.target.value)}
//                 required
//                 className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Author:
//               </label>
//               <input
//                 type="text"
//                 value={newAuthor}
//                 onChange={(e) => setNewAuthor(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">
//                 Image:
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewImage(e.target.files[0])}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
//             >
//               Update Post
//             </button>
//           </form>
//         </div>
//       )}
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           className="bg-gray-50 p-5 rounded-lg shadow-md mb-6"
//         >
//           {post.imageUrl && (
//             <img
//               src={`http://localhost:5000${post.imageUrl}`}
//               alt={post.title}
//               className="w-full h-48 object-cover mb-4 rounded-md"
//             />
//           )}
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//             {post.title}
//           </h3>
//           <p className="text-gray-700 mb-2">By: {post.author}</p>{" "}
//           {/* Display author */}
//           <p className="text-gray-700">{post.body}</p>
//           <div className="mt-4 flex justify-between">
//             <button
//               onClick={() => handleEditClick(post)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(post._id)}
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newAuthor, setNewAuthor] = useState(""); // Add state for author

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleEditClick = (post) => {
    setEditPost(post);
    setNewTitle(post.title);
    setNewBody(post.body);
    setNewImage(post.imageUrl);
    setNewAuthor(post.author); // Set author when editing
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("body", newBody);
    formData.append("author", newAuthor); // Append author
    if (newImage) {
      formData.append("image", newImage);
    }

    axios
      .put(`http://localhost:5000/api/posts/${editPost._id}`, formData)
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post._id === response.data._id ? response.data : post
          )
        );
        setEditPost(null);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
      setPosts(posts.filter((post) => post._id !== id));
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Posts
      </h2>
      {editPost && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Edit Post
          </h3>
          <form
            onSubmit={handleUpdate}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Title:
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Body:
              </label>
              <textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                required
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Author:
              </label>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Image:
              </label>
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
            >
              Update Post
            </button>
          </form>
        </div>
      )}
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-50 p-5 rounded-lg shadow-md mb-6"
        >
          {post.imageUrl && (
            <img
              src={`http://localhost:5000${post.imageUrl}`}
              alt={post.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-700 mb-2">By: {post.author}</p>{" "}
          {/* Display author */}
          <p className="text-gray-700 line-clamp-3">{post.body}</p>{" "}
          {/* Display only a preview of the body */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleEditClick(post)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
