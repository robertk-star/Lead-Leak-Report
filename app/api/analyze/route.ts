import handler from "@/server/analyze";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

function firstOnly<T>(items: T[] | undefined | null): T[] {
  return Array.isArray(items) ? items.slice(0, 1) : [];
}

function limitPreviewDetails(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;

  const result = payload as Record<string, any>;

  if (Array.isArray(result.findings)) {
    result.findings = result.findings.map((finding: Record<string, any>) => ({
      ...finding,
      fix: firstOnly(finding.fix),
    }));
  }

  result.localSeoGaps = firstOnly(result.localSeoGaps);
  result.webPersonChecklist = firstOnly(result.webPersonChecklist);

  if (result.fullReportDraft && typeof result.fullReportDraft === "object") {
    result.fullReportDraft = {
      ...result.fullReportDraft,
      topRecommendations: firstOnly(result.fullReportDraft.topRecommendations),
      copyPasteFixes: firstOnly(result.fullReportDraft.copyPasteFixes),
      gbpPosts: firstOnly(result.fullReportDraft.gbpPosts),
      sevenDayPlan: firstOnly(result.fullReportDraft.sevenDayPlan),
      webPersonChecklist: firstOnly(result.fullReportDraft.webPersonChecklist),
    };
  }

  return result;
}

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
      capturedResponse = new Response(JSON.stringify(limitPreviewDetails(payload)), {
        status: statusCode,
        headers: { "content-type": "application/json" },
      });
      return capturedResponse;
    },
  };

  try {
    const returnedResponse = await handler({ method: "POST", body }, res);

    if (returnedResponse instanceof Response) {
      const payload = await returnedResponse.json().catch(() => null);
      return new Response(JSON.stringify(limitPreviewDetails(payload)), {
        status: returnedResponse.status,
        headers: { "content-type": "application/json" },
      });
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
