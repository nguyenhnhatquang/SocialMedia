require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./utils/SocketServer");

const corsOptions = {
  Credential: "true",
};

// Config app
const app = express();

app.use(express.json());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser());

// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Routes
app.use("/api", require("./routes/userRouter.js"));
app.use("/api", require("./routes/authRouter.js"));
app.use("/api", require("./routes/adminRouter.js"));
app.use("/api", require("./routes/commentRouter.js"));
app.use("/api", require("./routes/messageRouter.js"));
app.use("/api", require("./routes/notifyRouter.js"));
app.use("/api", require("./routes/postRouter.js"));

// Connection Database
require("./utils/ConnectDB");

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
