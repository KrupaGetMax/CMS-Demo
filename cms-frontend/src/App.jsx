import React from "react";
import PostList from "./Component/PostList";
import PostForm from "./Component/PostForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Simple CMS
        </h1>
      </header>
      <main className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Create Post
          </h2>
          <PostForm />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Posts</h2>
          <PostList />
        </section>
      </main>
    </div>
  );
};

export default App;
