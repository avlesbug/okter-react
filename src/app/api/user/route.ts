import { NextResponse } from "next/server";
import { getUserByClerkId } from "~/lib/queries/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });

  const user = await getUserByClerkId(clerkId);
  return NextResponse.json(user);
}
