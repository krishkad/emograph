import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CREATE USER
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
      });
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email },
    });

    if (isUserExist) {
      return NextResponse.json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json({
        success: false,
        message: "failed to create user",
      });
    }

    const { password: _, ...others } = newUser;

    const tokenData = others;

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string);

    const response = new NextResponse(
      JSON.stringify({ success: true, data: others }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.cookies.set("emograph-token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
