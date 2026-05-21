import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { isAllowedClientOrigin } from "../config/env";
import { verifyAccessToken } from "../utils/tokens";

let io: Server | undefined;

export function initSockets(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin(origin, callback) {
        callback(null, isAllowedClientOrigin(origin));
      },
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next();

    try {
      const payload = verifyAccessToken(token);
      socket.data.userId = payload.sub;
      next();
    } catch {
      next(new Error("Invalid socket token"));
    }
  });

  io.on("connection", (socket) => {
    if (socket.data.userId) {
      socket.join(`user:${socket.data.userId}`);
    }
  });

  return io;
}

export function emitToUser(userId: string, event: string, payload: unknown) {
  io?.to(`user:${userId}`).emit(event, payload);
}

export function emitToPost(postId: string, event: string, payload: unknown) {
  io?.to(`post:${postId}`).emit(event, payload);
}
