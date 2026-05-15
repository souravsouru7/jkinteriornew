import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    source: String(body.source ?? "contact-page"),
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? "—"),
    projectType: String(body.projectType ?? "—"),
    budget: String(body.budget ?? "—"),
    message: String(body.message ?? "—"),
  };

  if (!payload.name || !payload.phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    // No webhook configured — still return success so the UI works locally
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set");
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Sheets webhook error", res.status, await res.text());
      return NextResponse.json({ error: "Unable to save enquiry" }, { status: 502 });
    }
  } catch (err) {
    console.error("Sheets webhook fetch failed", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
