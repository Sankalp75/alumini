"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { AlumniProfile } from "@/types/alumni";
import { toCSV } from "@/lib/firestore";

export function ExportButton({ profiles }: { profiles: AlumniProfile[] }) {
  const handleExport = () => {
    const csv = toCSV(profiles);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `alumni_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  return <Button variant="secondary" size="sm" onClick={handleExport}><Download className="h-4 w-4"/> Download CSV</Button>;
}
