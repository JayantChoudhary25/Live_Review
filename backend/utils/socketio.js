const socketIO = require("socket.io");

let io; // Global variable to store Socket.IO instance

// Initialize Socket.IO and export the server instance
exports.init = (server) => {
  io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Broadcasting to all connected clients
    socket.on("newReview", (data) => {
      // Broadcast the new review to all connected clients
      io.emit("newReview", data);
    });

    socket.on("updatedReview", (data) => {
      // Broadcast the updated review to all connected clients
      io.emit("updatedReview", data);
    });

    socket.on("deletedReview", (data) => {
      // Broadcast the deleted review to all connected clients
      io.emit("deletedReview", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

exports.closeIO = () => {
  if (io) {
    io.close();
  }
};
