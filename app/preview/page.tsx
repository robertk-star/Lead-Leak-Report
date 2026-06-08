import { Suspense } from "react";
import Preview from "@/clientPages/Preview";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9fafb] p-8 text-[#1a2332]">Loading preview...</div>}>
      <Preview />
    </Suspense>
  );
}
