import { db } from "../lib/db";

export const settingsService = {
  async get(userId: string) {
    return db.userSettings.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  },

  async update(userId: string, input: {
    theme?: string;
    privacy?: Record<string, boolean>;
    notifications?: Record<string, boolean>;
    security?: Record<string, boolean | string | number>;
  }) {
    return db.userSettings.upsert({
      where: { userId },
      create: {
        userId,
        theme: input.theme,
        privacy: input.privacy,
        notifications: input.notifications,
        security: input.security,
      },
      update: {
        theme: input.theme,
        privacy: input.privacy,
        notifications: input.notifications,
        security: input.security,
      },
    });
  },
};
