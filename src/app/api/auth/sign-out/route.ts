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

    const response = new NextResponse(
      JSON.stringify({ success: true, message: "ok" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.cookies.delete("emograph-token");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
