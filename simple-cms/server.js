// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON bodies

// // Serve static files (for images)
// app.use("/uploads", express.static("uploads"));

// // Multer setup for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Upload directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   },
// });

// const upload = multer({ storage: storage });

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/cms", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Schema for blog posts
// const postSchema = new mongoose.Schema({
//   title: String,
//   body: String,
//   imageUrl: String,
//   createdAt: { type: Date, default: Date.now },
//   author: String,

// });

// // Create a model for posts
// const Post = mongoose.model("Post", postSchema);

// // Routes

// // Get all posts
// app.get("/api/posts", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch posts" });
//   }
// });

// // Get a single post
// app.get("/api/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching post" });
//   }
// });

// // Create a new post with an image
// app.post("/api/posts", upload.single("image"), async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const newPost = new Post({
//       title,
//       body,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Save image URL
//     });
//     await newPost.save();
//     res.json(newPost);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create post" });
//   }
// });

// // Update a post
// app.put("/api/posts/:id", async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedPost);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update post" });
//   }
// });

// // Delete a post
// app.delete("/api/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post) {
//       // Remove associated image file if it exists
//       if (post.imageUrl) {
//         const filePath = path.join(__dirname, post.imageUrl);
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error("Error deleting image file:", err);
//           }
//         });
//       }
//       await Post.findByIdAndDelete(req.params.id);
//       res.json({ message: "Post deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete post" });
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log("Server is running on http://localhost:5000");
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files (for images)
app.use("/uploads", express.static("uploads"));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/cms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Schema for blog posts
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  author: String, // Author field
});

// Create a model for posts
const Post = mongoose.model("Post", postSchema);

// Routes

// Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get a single post
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post with an image
app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const newPost = new Post({
      title,
      body,
      author, // Include author
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Update a post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author, // Handle author update
        imageUrl: req.body.imageUrl // Handle image URL update
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      // Remove associated image file if it exists
      if (post.imageUrl) {
        const filePath = path.join(__dirname, post.imageUrl);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
