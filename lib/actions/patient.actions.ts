"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return newUser;
  } catch (error: unknown) {
    if (error instanceof AppwriteException && error.code === 409) {
      const existingUsers = await users.list([Query.equal("email", [user.email])]);

      return existingUsers.users[0];
    }

    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error("Failed to load user", error);

    if (error instanceof AppwriteException && error.code === 404) {
      return null;
    }

    throw error;
  }
};
