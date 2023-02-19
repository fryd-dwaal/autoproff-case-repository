import { User } from "~/types/user";
import { db } from "~/api/db";
export const addUser = async (user: User) => {
  try {
    const id = await db.users.add({
      firstName: user.firstName,
      lastName: user.lastName,
      workshop: user.workshop,
      phone: user.phone,
      email: user.email,
      jobTitle: user.jobTitle,
    });

    return { success: true, userId: id };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await db.users.delete(userId);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
