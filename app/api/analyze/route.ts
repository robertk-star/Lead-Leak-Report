import handler from "@/server/analyze";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  let statusCode = 200;
  let capturedResponse: Response | null = null;

  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(payload: unknown) {
      capturedResponse = new Response(JSON.stringify(payload), {
        status: statusCode,
        headers: { "content-type": "application/json" },
      });
      return capturedResponse;
    },
  };

  try {
    const returnedResponse = await handler({ method: "POST", body }, res);

    if (returnedResponse instanceof Response) {
      return returnedResponse;
    }

    if (capturedResponse) {
      return capturedResponse;
    }

    return new Response(
      JSON.stringify({ error: "Analyzer completed without returning a response." }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Analyzer failed unexpectedly.",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
