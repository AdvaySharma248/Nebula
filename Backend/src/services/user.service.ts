import { db } from "../lib/db";
import { conflict, forbidden, notFound } from "../utils/errors";
import { getPagination, paginationMeta } from "../utils/pagination";
import { sanitizeText } from "../utils/sanitize";

const userPublicSelect = {
  id: true,
  username: true,
  displayName: true,
  bio: true,
  avatarUrl: true,
  bannerUrl: true,
  createdAt: true,
  _count: {
    select: {
      posts: true,
      comments: true,
      followers: true,
      following: true,
      memberships: true,
    },
  },
} as const;

export const userService = {
  async getProfile(username: string) {
    const user = await db.user.findFirst({
      where: { username: username.toLowerCase(), deletedAt: null },
      select: userPublicSelect,
    });
    if (!user) throw notFound("User");
    return user;
  },

  async updateMe(userId: string, input: { displayName?: string; bio?: string; avatarUrl?: string; bannerUrl?: string }) {
    return db.user.update({
      where: { id: userId },
      data: {
        displayName: input.displayName,
        bio: input.bio ? sanitizeText(input.bio) : undefined,
        avatarUrl: input.avatarUrl,
        bannerUrl: input.bannerUrl,
      },
      select: userPublicSelect,
    });
  },

  async deleteMe(userId: string) {
    await db.user.update({
      where: { id: userId },
      data: { deletedAt: new Date(), email: `deleted-${userId}@deleted.local`, username: `deleted-${userId}` },
    });
    await db.session.updateMany({ where: { userId }, data: { revokedAt: new Date() } });
  },

  async listUserPosts(username: string, query: unknown) {
    const user = await db.user.findUnique({ where: { username: username.toLowerCase() }, select: { id: true } });
    if (!user) throw notFound("User");
    const pagination = getPagination(query);
    const where = { authorId: user.id, deletedAt: null, published: true };
    const [items, total] = await Promise.all([
      db.post.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: "desc" },
        include: { community: { select: { id: true, name: true, slug: true } } },
      }),
      db.post.count({ where }),
    ]);
    return { items, meta: paginationMeta(pagination.page, pagination.limit, total) };
  },

  async listUserComments(username: string, query: unknown) {
    const user = await db.user.findUnique({ where: { username: username.toLowerCase() }, select: { id: true } });
    if (!user) throw notFound("User");
    const pagination = getPagination(query);
    const where = { authorId: user.id, deletedAt: null };
    const [items, total] = await Promise.all([
      db.comment.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: "desc" },
        include: { post: { select: { id: true, title: true } } },
      }),
      db.comment.count({ where }),
    ]);
    return { items, meta: paginationMeta(pagination.page, pagination.limit, total) };
  },

  async savedPosts(userId: string, query: unknown) {
    const pagination = getPagination(query);
    const [items, total] = await Promise.all([
      db.savedPost.findMany({
        where: { userId },
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: "desc" },
        include: {
          post: {
            include: {
              author: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
              community: { select: { id: true, name: true, slug: true } },
            },
          },
        },
      }),
      db.savedPost.count({ where: { userId } }),
    ]);
    return { items: items.map((item) => item.post), meta: paginationMeta(pagination.page, pagination.limit, total) };
  },

  async follow(userId: string, targetUserId: string) {
    if (userId === targetUserId) throw forbidden("You cannot follow yourself");
    const target = await db.user.findFirst({ where: { id: targetUserId, deletedAt: null }, select: { id: true } });
    if (!target) throw notFound("User");

    return db.follow.upsert({
      where: { followerId_followingId: { followerId: userId, followingId: targetUserId } },
      create: { followerId: userId, followingId: targetUserId },
      update: {},
    });
  },

  async unfollow(userId: string, targetUserId: string) {
    await db.follow.deleteMany({ where: { followerId: userId, followingId: targetUserId } });
  },

  async block(userId: string, targetUserId: string) {
    if (userId === targetUserId) throw forbidden("You cannot block yourself");
    const target = await db.user.findFirst({ where: { id: targetUserId, deletedAt: null }, select: { id: true } });
    if (!target) throw notFound("User");

    await db.follow.deleteMany({
      where: {
        OR: [
          { followerId: userId, followingId: targetUserId },
          { followerId: targetUserId, followingId: userId },
        ],
      },
    });

    return db.blockedUser.upsert({
      where: { blockerId_blockedId: { blockerId: userId, blockedId: targetUserId } },
      create: { blockerId: userId, blockedId: targetUserId },
      update: {},
    });
  },

  async unblock(userId: string, targetUserId: string) {
    await db.blockedUser.deleteMany({ where: { blockerId: userId, blockedId: targetUserId } });
  },

  async ensureUniqueUsername(username: string) {
    const existing = await db.user.findUnique({ where: { username: username.toLowerCase() }, select: { id: true } });
    if (existing) throw conflict("Username is already taken");
  },
};
