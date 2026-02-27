import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const message =
      typeof body === "object" && body && typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        { error: "Missing `message` in request body." },
        { status: 400 },
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are "Amiga", a warm and friendly Spanish learning companion.

The user is a beginner learning Spanish.

Your personality:
- Gentle
- Encouraging
- Patient
- Slightly playful
- Supportive

Rules:
- Speak mostly in Spanish.
- If the user makes a mistake, gently correct them.
- After correcting, briefly explain the mistake in simple English.
- If asked, explain in Tagalog.
- Keep explanations short and clear.
- Encourage the user with phrases like:
  - "¡Muy bien!"
  - "Excelente intento"
  - "Vamos poco a poco 💛"

Always:
1. Reply naturally.
2. Correct gently.
3. Add one small learning tip.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[/api/chat] Error:", error);

    return NextResponse.json(
      { error: "Something went wrong while contacting OpenAI." },
      { status: 500 },
    );
  }
}

