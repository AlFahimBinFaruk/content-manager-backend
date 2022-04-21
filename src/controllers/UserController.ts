import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
//user model
import User from "../model/UserModel";

//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password }: UserInterface = req.body;

  //see if user has provided all info
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all info");
  }

  //see if user alrady exits
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User already exits");
  }

  //everything is ok then proceed
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  //if user is created successfully
  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: genarateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Creds");
  }
});

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password }: UserInterface = req.body;
  //if the user exits
  const user = await User.findOne({ email });

  //then if the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: genarateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Creds");
  }
});

//login with google
export const loginWithGoogle = asyncHandler(async (req, res) => {
  const { username, email }: UserInterface = req.body;

  //if the user exits we will send them the data or create a new one..Becoz this is login with google route so,the logic is different..

  //see if user has provided all info
  if (!username || !email) {
    res.status(400);
    throw new Error("Please provide all info");
  }

  //see if user alrady exits
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(201).json({
      id: userExits.id,
      username: userExits.username,
      email: userExits.email,
      token: genarateToken(userExits.id),
    });
  } else {
    //if user dont exits create one..
    const user = await User.create({
      username,
      email,
      loginWithGoogle: true,
    });

    //if user is created successfully
    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: genarateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Creds");
    }
  }
});

//update account
export const updateAccount = asyncHandler(async (req, res) => {
  const id = req.user.id;
  let { password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    req.body = { ...req.body, password };
  }
  //see if the user exits.
  const userExits: any = await User.findById(id);

  if (!userExits) {
    res.status(400);
    throw new Error("please provide a valid id");
  }

  const updatedUserCreds = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  //send the upated user data
  res.status(200).json({ id: id, data: updatedUserCreds });
});

//function genarate token
const genarateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
