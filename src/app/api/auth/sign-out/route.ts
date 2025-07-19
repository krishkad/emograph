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

    const response = NextResponse.json({ success: true, message: "ok" });

    response.cookies.delete("emograph-token");

    return response;
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
