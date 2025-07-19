import { prisma } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = req.cookies.get("emograph-token")?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "invalid credentials",
      });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET as string);

    const userId = (tokenData as JwtPayload).id;

    console.log({ userId });

    const emoNotes = await prisma.emonote.findMany({
      where: { userId },
    });

    if (!emoNotes) {
      return NextResponse.json({ success: false, message: "failed to fetch" });
    }

    console.log({ emoNotes });

    return NextResponse.json({
      success: true,
      message: "ok",
      data: emoNotes,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      message: "ok",
    });
  }
}
