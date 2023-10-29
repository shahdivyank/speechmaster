import { Server } from "socket.io";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

const SocketHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join", (room) => {
        socket.join(room);
      });

      socket.on("leave", (room) => {
        socket.leave(room);
      });

      socket.on("frames", (frame) => {
        socket.to(session.user.id).emit("frames", frame);
      });
    });
  }
  res.end();
};

export default SocketHandler;
