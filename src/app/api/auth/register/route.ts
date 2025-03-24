import { NextResponse } from "next/server";
import userRegister from "@/libs/auth/userRegister";

export async function POST(req: Request) {
  try {
    const { name, email, password, tel } = await req.json();

    const result = await userRegister(name, email, password, tel);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "User registered successfully!", user: result.user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
