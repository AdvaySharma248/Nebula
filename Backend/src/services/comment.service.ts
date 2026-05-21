import { db } from "../lib/db";
import { notificationService } from "./notification.service";
import { forbidden, notFound } from "../utils/errors";
import { extractMentions } from "../utils/mentions";
import { getPagination, paginationMeta } from "../utils/pagination";
import { sanitizeText } from "../utils/sanitize";

type ThreadComment = {
  id: string;
  parentId: string | null;
  replies?: ThreadComment[];
} & Record<string, unknown>;

function buildThread(comments: ThreadComment[]) {
  const map = new Map<string, ThreadComment>();
  const roots: ThreadComment[] = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of map.values()) {
    if (comment.parentId && map.has(comment.parentId)) {
      map.get(comment.parentId)?.replies?.push(comment);
    } else {
      roots.push(comment);
    }
  }

  return roots;
}

export const commentService = {
  async create(userId: string, input: { postId: string; parentId?: string; body: string }) {
    const post = await db.post.findFirst({
      where: { id: input.postId, deletedAt: null },
      select: { id: true, authorId: true, title: true },
    });
    if (!post) throw notFound("Post");

    const parent = input.parentId
      ? await db.comment.findFirst({
          where: { id: input.parentId, postId: input.postId, deletedAt: null },
          select: { id: true, authorId: true },
        })
      : null;
    if (input.parentId && !parent) throw notFound("Parent comment");

    const comment = await db.$transaction(async (tx) => {
      const created = await tx.comment.create({
        data: {
          body: sanitizeText(input.body),
          postId: input.postId,
          parentId: input.parentId,
          authorId: userId,
        },
        include: { author: { select: { id: true, username: true, displayName: true, avatarUrl: true } } },
      });
      await tx.post.update({ where: { id: input.postId }, data: { commentCount: { increment: 1 } } });
      return created;
    });

    await notificationService.create({
      userId: parent?.authorId ?? post.authorId,
      actorId: userId,
      type: parent ? "REPLY" : "REPLY",
      entityType: "comment",
      entityId: comment.id,
      message: parent ? "Someone replied to your comment" : `Someone commented on your post: ${post.title}`,
    });

    const mentions = extractMentions(input.body);
    if (mentions.length > 0) {
      const mentionedUsers = await db.user.findMany({
        where: { username: { in: mentions }, deletedAt: null },
        select: { id: true, username: true },
      });
      await Promise.all(
        mentionedUsers.map((user) =>
          notificationService.create({
            userId: user.id,
            actorId: userId,
            type: "MENTION",
            entityType: "comment",
            entityId: comment.id,
            message: `You were mentioned in a comment by @${comment.author.username}`,
          }),
        ),
      );
    }

    return comment;
  },

  async listByPost(postId: string, query: unknown) {
    const pagination = getPagination(query);
    const where = { postId, deletedAt: null };
    const [items, total] = await Promise.all([
      db.comment.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
        },
      }),
      db.comment.count({ where }),
    ]);

    return {
      items: buildThread(items as ThreadComment[]),
      meta: paginationMeta(pagination.page, pagination.limit, total),
    };
  },

  async update(userId: string, commentId: string, body: string) {
    const comment = await db.comment.findFirst({ where: { id: commentId, deletedAt: null } });
    if (!comment) throw notFound("Comment");
    if (comment.authorId !== userId) throw forbidden();

    return db.comment.update({
      where: { id: commentId },
      data: { body: sanitizeText(body) },
      include: { author: { select: { id: true, username: true, displayName: true, avatarUrl: true } } },
    });
  },

  async remove(userId: string, commentId: string) {
    const comment = await db.comment.findFirst({ where: { id: commentId, deletedAt: null } });
    if (!comment) throw notFound("Comment");
    if (comment.authorId !== userId) throw forbidden();

    await db.$transaction([
      db.comment.update({ where: { id: commentId }, data: { deletedAt: new Date() } }),
      db.post.update({ where: { id: comment.postId }, data: { commentCount: { decrement: 1 } } }),
    ]);
  },
};
