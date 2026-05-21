import { db } from "../lib/db";
import { emitToPost } from "../sockets";
import { notificationService } from "./notification.service";
import { notFound } from "../utils/errors";

async function recalculatePost(tx: typeof db, postId: string) {
  const [upvotes, downvotes] = await Promise.all([
    tx.postVote.count({ where: { postId, value: 1 } }),
    tx.postVote.count({ where: { postId, value: -1 } }),
  ]);
  return tx.post.update({
    where: { id: postId },
    data: { upvotes, downvotes, score: upvotes - downvotes },
    select: { id: true, upvotes: true, downvotes: true, score: true, authorId: true },
  });
}

async function recalculateComment(tx: typeof db, commentId: string) {
  const [upvotes, downvotes] = await Promise.all([
    tx.commentVote.count({ where: { commentId, value: 1 } }),
    tx.commentVote.count({ where: { commentId, value: -1 } }),
  ]);
  return tx.comment.update({
    where: { id: commentId },
    data: { upvotes, downvotes, score: upvotes - downvotes },
    select: { id: true, upvotes: true, downvotes: true, score: true, authorId: true, postId: true },
  });
}

export const voteService = {
  async votePost(userId: string, postId: string, value: -1 | 0 | 1) {
    const post = await db.post.findFirst({ where: { id: postId, deletedAt: null }, select: { id: true } });
    if (!post) throw notFound("Post");

    const result = await db.$transaction(async (tx) => {
      const existing = await tx.postVote.findUnique({ where: { userId_postId: { userId, postId } } });
      if (value === 0 || existing?.value === value) {
        await tx.postVote.deleteMany({ where: { userId, postId } });
      } else {
        await tx.postVote.upsert({
          where: { userId_postId: { userId, postId } },
          create: { userId, postId, value },
          update: { value },
        });
      }

      return recalculatePost(tx as typeof db, postId);
    });

    if (value === 1) {
      await notificationService.create({
        userId: result.authorId,
        actorId: userId,
        type: "UPVOTE",
        entityType: "post",
        entityId: postId,
        message: "Your post received an upvote",
      });
    }

    emitToPost(postId, "post:vote", result);
    return result;
  },

  async voteComment(userId: string, commentId: string, value: -1 | 0 | 1) {
    const comment = await db.comment.findFirst({ where: { id: commentId, deletedAt: null }, select: { id: true } });
    if (!comment) throw notFound("Comment");

    const result = await db.$transaction(async (tx) => {
      const existing = await tx.commentVote.findUnique({ where: { userId_commentId: { userId, commentId } } });
      if (value === 0 || existing?.value === value) {
        await tx.commentVote.deleteMany({ where: { userId, commentId } });
      } else {
        await tx.commentVote.upsert({
          where: { userId_commentId: { userId, commentId } },
          create: { userId, commentId, value },
          update: { value },
        });
      }

      return recalculateComment(tx as typeof db, commentId);
    });

    if (value === 1) {
      await notificationService.create({
        userId: result.authorId,
        actorId: userId,
        type: "UPVOTE",
        entityType: "comment",
        entityId: commentId,
        message: "Your comment received an upvote",
      });
    }

    emitToPost(result.postId, "comment:vote", result);
    return result;
  },
};
