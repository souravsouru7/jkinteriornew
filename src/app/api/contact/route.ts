import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const crmUrl = process.env.CRM_URL;
  const crmApiKey = process.env.CRM_API_KEY;

  if (!crmUrl || !crmApiKey) {
    console.warn("CRM_URL or CRM_API_KEY not set");
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(`${crmUrl}/api/public/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": crmApiKey,
      },
      body: JSON.stringify({
        name,
        phone,
        email: String(body.email ?? "").trim(),
        project: String(body.projectType ?? "").trim(),
        budget: String(body.budget ?? "").trim(),
        message: String(body.message ?? "").trim(),
        source: "Website",
      }),
    });

    if (!res.ok) {
      console.error("CRM error", res.status, await res.text());
      return NextResponse.json({ error: "Unable to save enquiry" }, { status: 502 });
    }
  } catch (err) {
    console.error("CRM fetch failed", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
