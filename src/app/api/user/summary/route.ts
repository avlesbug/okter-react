import { NextResponse } from "next/server";
import { getUserSummary } from "~/lib/queries/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const user = await getUserSummary(userId);
  return NextResponse.json(user);
}
