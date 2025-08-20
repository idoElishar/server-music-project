import usersDAL from './Dal.users';
import { sendVerificationEmail } from './mailer.users';
import { comparePassword } from './secret';
import { UserInterface } from './users.model';

const usersService = {
  registerUser: async (user: UserInterface) => {
    const existingUser = await usersDAL.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const newUser = await usersDAL.createUser(user);
    if (!newUser) throw new Error("faild to create user");
    await sendVerificationEmail(user.email)
    return { success: true, message: 'Registration successful', user: newUser };
  },

  loginUser: async (email: string, password: string) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user?.password) {
      throw new Error("Invalid email or password.");
    }
    const ok = comparePassword(password, user.password);
    if (!ok) {
      throw new Error("Invalid email or password.");
    }
    return { username: user.username, email: user.email, _id: user._id };
  }
}


export default usersService;




