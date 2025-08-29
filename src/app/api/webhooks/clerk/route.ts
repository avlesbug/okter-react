// src/app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: Request) {
  console.log("Webhook received");
  console.log(process.env.CLERK_WEBHOOK_SECRET)
  const body = await req.text();
  const heads = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const event = wh.verify(body, {
      "svix-id": heads.get("svix-id")!,
      "svix-timestamp": heads.get("svix-timestamp")!,
      "svix-signature": heads.get("svix-signature")!,
    }) as any;

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, username } = event.data;

      await db.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address ?? "",
          name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          username: username
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
