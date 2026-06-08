import handler from "@/server/analyze";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  let statusCode = 200;
  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(payload: unknown) {
      return new Response(JSON.stringify(payload), {
        status: statusCode,
        headers: { "content-type": "application/json" },
      });
    },
  };

  return handler({ method: "POST", body }, res);
}
