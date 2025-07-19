import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTE_DEEPSEEK_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
      });
    }

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat", // You can also try "deepseek/deepseek-coder"
      messages: [{ role: "user", content: `${message}, guess my emotion (eg. good, neutral, sad) just as with one of these words without any extra text. only reply in these words strickly (good, neutral, sad)` }],
      temperature: 0.7,
    });

    console.log({ response: response.choices[0].message.content });

    if (!response.choices[0].message.content) {
      return NextResponse.json({
        success: false,
        message: "failed to generate response",
      });
    }

    const emoNote = await prisma.emonote.create({
      data: {
        description: message,
        emotions: response.choices[0].message.content,
        userId,
      },
    });

    if (!emoNote) {
      return NextResponse.json({
        success: false,
        message: "failed to create eno note",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: response?.choices[0].message.content,
      emoNote
    });
  } catch (error: any) {
    console.error("[DEEPSEEK_ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
