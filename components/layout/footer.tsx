import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1A2332] text-white/70">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-lg font-bold text-white">Alumni Connect</span>
              <span className="h-2 w-2 rounded-full bg-[#C9A86A]" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">Centralized alumni data management for Government of Punjab — SIH25019.</p>
            <p className="mt-3 text-xs text-white/40">Smart Education • Smart India Hackathon 2026</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">Platform</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link></li>
              <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
              <li><Link href="/feed" className="hover:text-white transition-colors">Feed</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">Account</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">Institution</p>
            <p className="text-sm text-white/60">Directorate of Technical Education, Punjab</p>
            <p className="text-sm text-white/60"><Link href="/colleges" className="underline hover:text-white">24 Punjab colleges registered</Link></p>
            <p className="mt-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">SIH25019</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between md:items-center">
          <p className="text-xs text-white/40">© 2026 Alumni Connect. Built for Smart India Hackathon — Practice Round.</p>
          <p className="text-xs font-medium text-white/60">Govt. of Punjab</p>
        </div>
      </div>
    </footer>
  );
}
