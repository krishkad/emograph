import { NextRequest, NextResponse } from "next/server";


export function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({success: true, data: "good"});
  } catch (error: any) {
    return NextResponse.json({success: false , message: "Internal server errror"});
  }
    
}