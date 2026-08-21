import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="font-heading text-4xl font-bold text-[#1A2332]">Page not found</h1>
      <p className="mt-2 text-sm text-[#8B95A5]">The page you’re looking for doesn’t exist.</p>
      <Button variant="primary" asChild className="mt-6"><Link href="/">Go home</Link></Button>
    </div>
  );
}
