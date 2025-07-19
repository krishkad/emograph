import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    console.log({email, password})

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
      });
    }

    const isUser = await prisma.user.findFirst({ where: { email } });

    if (!isUser) {
      return NextResponse.json({
        success: false,
        message: "user does'nt exist",
      });
    }

    const isHashMatch = bcrypt.compareSync(password, isUser.password);

    if (!isHashMatch) {
      return NextResponse.json({
        success: false,
        message: "invalid credentials",
      });
    }

    const { password: _, ...others } = isUser;

    const tokenData = others;

    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string);

    const response = NextResponse.json({ success: true, data: others });

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
