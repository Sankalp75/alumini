"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, LayoutDashboard, Search, Megaphone, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/colleges", label: "Colleges", icon: GraduationCap },
  { href: "/directory", label: "Directory", icon: Search },
  { href: "/feed", label: "Feed", icon: Megaphone },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHero = pathname === "/";
  const navBg = scrolled
    ? "bg-white border-b border-[#E2DDD6] shadow-sm"
    : isHero
      ? "bg-[#1B3A5C] border-b border-white/10"
      : "bg-white border-b border-[#E2DDD6]";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={cn("sticky top-0 z-40 transition-colors duration-150", navBg)}>
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-6 w-[3px] bg-[#C9A86A] inline-block" aria-hidden />
            <span className="font-heading text-[17px] font-bold tracking-tight" style={{ color: scrolled || !isHero ? "#1B3A5C" : "#fff" }}>
              Alumni Connect
            </span>
            <span className="hidden sm:inline text-[10px] font-semibold tracking-[0.12em] uppercase border border-current px-1.5 py-0.5 opacity-70" style={{ color: scrolled || !isHero ? "#1B3A5C" : "#fff" }}>Govt. of Punjab</span>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("text-sm transition-colors relative py-1 border-b-2",
                    active ? "text-[#1B3A5C] font-semibold border-[#C9A86A]" : scrolled || !isHero ? "text-[#4B5563] hover:text-[#1A2332] border-transparent" : "text-white/80 hover:text-white border-transparent")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link href="/admin" className={cn("text-sm relative py-1 border-b-2", pathname.startsWith("/admin") ? "text-[#1B3A5C] font-semibold border-[#C9A86A]" : scrolled || !isHero ? "text-[#4B5563] hover:text-[#1A2332] border-transparent" : "text-white/80 hover:text-white border-transparent")}>
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-7 w-20 animate-pulse bg-[#EDE9E3] border border-[#E2DDD6]" />
          ) : user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D6F] focus-visible:ring-offset-2">
                    <Avatar className="h-7 w-7 border border-[#E2DDD6] rounded-none">
                      <AvatarImage src={profile?.photoURL || undefined} />
                      <AvatarFallback className="bg-[#E8EDF3] text-[#1B3A5C] text-xs font-semibold rounded-none">
                        {(profile?.name || user.email || "U").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn("hidden sm:block text-sm font-medium max-w-[120px] truncate", scrolled || !isHero ? "text-[#1A2332]" : "text-white")}>{profile?.name || user.email?.split("@")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-none">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{profile?.name || "Alumni"}</p>
                    <p className="text-xs text-[#8B95A5] truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(`/profile/${user.uid}`)}><User className="mr-2 h-4 w-4" /> View Profile</DropdownMenuItem>
                  {isAdmin && <DropdownMenuItem onClick={() => router.push("/admin")}><LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard</DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-[#C0392B] focus:text-[#C0392B]"><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-none" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu className={cn("h-5 w-5", !scrolled && isHero ? "text-white" : "text-[#1A2332]")} />
              </Button>
            </>
          ) : (
            <>
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className={cn("rounded-none border", scrolled || !isHero ? "border-[#E2DDD6] text-[#1B3A5C] hover:bg-[#F8F7F5]" : "border-white/20 text-white hover:bg-white hover:text-[#1B3A5C]")}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="rounded-none bg-[#C9A86A] text-[#1A2332] hover:bg-[#B8975A] border-0 shadow-none">
                  <Link href="/register">Join the Network</Link>
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-none" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu className={cn("h-5 w-5", !scrolled && isHero ? "text-white" : "text-[#1A2332]")} />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile drawer — solid, no blur */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-[#1A2332]/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[320px] max-w-[85vw] h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E2DDD6]">
              <span className="font-heading font-bold text-[#1B3A5C] flex items-center gap-2"><span className="h-5 w-[3px] bg-[#C9A86A] inline-block" />Alumni Connect</span>
              <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-1 overflow-y-auto">
              <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA]">Home</Link>
              <Link href="/colleges" onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA] flex items-center justify-between">Colleges <span className="text-xs bg-[#F1EFEA] px-2 py-0.5">New</span></Link>
              <Link href="/directory" onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA]">Directory</Link>
              <Link href="/feed" onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA]">Feed</Link>
              {isAdmin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA] text-[#1B3A5C]">Admin Dashboard</Link>}
              {user ? (
                <>
                  <Link href={`/profile/${user.uid}`} onClick={() => setMobileOpen(false)} className="py-3 font-medium border-b border-[#F1EFEA]">My Profile</Link>
                  <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="py-3 text-left font-medium text-[#C0392B]">Sign out</button>
                </>
              ) : (
                <div className="mt-6 flex flex-col gap-3">
                  <Button variant="secondary" asChild className="rounded-none"><Link href="/login">Login</Link></Button>
                  <Button asChild className="rounded-none bg-[#C9A86A] text-[#1A2332] hover:bg-[#B8975A]"><Link href="/register" onClick={() => setMobileOpen(false)}>Join the Network</Link></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
