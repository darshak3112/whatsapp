import getPrismaInstance from "../utils/PrismaClient.js";
import { generateToken04 } from "../utils/TokenGenerator.js";


export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) res.json({ msg: "Email is required", status: false });

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) res.json({ msg: "User not found", status: false });
    else res.json({ msg: "User found", status: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email || !name || !profilePicture)
      res.send({ msg: "Email, Name and Image are required" });

    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: {
        email,
        name,
        about,
        profilePicture,
      },
    });
    return res.json({ msg: "Success", status: true, user });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      },
    });
    const usersGroupByInitialLetter = {};

    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupByInitialLetter[initialLetter]) {
        usersGroupByInitialLetter[initialLetter] = [];
      }
      usersGroupByInitialLetter[initialLetter].push(user);
    });
    return res.send({ users: usersGroupByInitialLetter }).status(200);
  } catch (err) {
    next(err);
  }
};

export const generateToken = async (req, res, next) => {
  try {
    const appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_ID;
    const userId = req.params.userId;
    const effectiveTime = 3600;
    const payload = "";
    if (appId && serverSecret && userId) {
      const token = await generateToken04(appId, userId, serverSecret, effectiveTime, payload);
      return res.status(200).json({ token })
    }
    return res.status(404).send("user id, app id and server secret is required");
  } catch (error) {
       next(error);
  }
}