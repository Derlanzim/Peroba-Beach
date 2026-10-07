import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const corpo = await req.json();
    if (typeof corpo?.checkin !== "string" || typeof corpo?.checkout !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    // TODO (futuro): salvar a solicitação em banco de dados / painel administrativo.
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
