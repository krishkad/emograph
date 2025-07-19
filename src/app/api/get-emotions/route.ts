import { NextRequest, NextResponse } from "next/server";


export function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({success: true, data: "good"});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({success: false , message: "Internal server errror"});
  }
    
}