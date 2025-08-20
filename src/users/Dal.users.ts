import { UserModel } from './users.model';
import { UserInterface } from './users.model';
import { generateUserPassword } from './secret';

const usersDAL = {
  getUserByEmail: async (email: string) => {
    try {
      const user = await UserModel.findOne({ email });
      return user
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },

  createUser: async (user: UserInterface) => {
    try {
      let { password, ...rest } = user;
      if (password) {
        password = generateUserPassword(password);
        return await UserModel.create({ ...rest, password });
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error?.code === 11000) {
        throw new Error("Email already in use");
      }
      throw error;
    }
  }
};

export default usersDAL;










