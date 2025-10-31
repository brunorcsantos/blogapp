import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import dbConnection from "./lib/mongoDB.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(port, () => {
  dbConnection();
  console.log(`App listening on port ${port}`);
});
