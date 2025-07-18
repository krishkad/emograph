import { NextRequest, NextResponse } from "next/server";


export function GET(req: NextRequest, res: NextResponse) {
  try {
    
  } catch (error: any) {
    return NextResponse.json({success: false , message: "Internal server errror"});
  }
    
}