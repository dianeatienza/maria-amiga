import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const text =
      typeof body === "object" && body && typeof body.text === "string"
        ? body.text.trim()
        : "";

    if (!text) {
      return NextResponse.json(
        { error: "Missing `text` in request body." },
        { status: 400 },
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a translator. Translate the following Spanish (or mixed-language) text into simple, clear English. Reply with ONLY the English translation, no extra commentary.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const translation = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("[/api/translate] Error:", error);

    return NextResponse.json(
      { error: "Something went wrong while translating." },
      { status: 500 },
    );
  }
}

