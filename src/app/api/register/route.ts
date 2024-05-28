import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import config from "@/config/config";
import User from "@/models/user";
export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  await connectToDB();

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return NextResponse.json({ message: "Email is already existed" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, config.passwordSalt);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json({ message: "User is registered" }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
