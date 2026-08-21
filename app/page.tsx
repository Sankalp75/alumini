import Link from "next/link";
import { Users, Search, Megaphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="bg-[#F8F7F5]">
      {/* HERO — solid institutional, not gradient mesh */}
      <section className="bg-[#1B3A5C] border-b-4 border-[#C9A86A]">
        <div className="container grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-start py-12 lg:py-20">
          <div className="pt-2">
            {/* gov crest + label — not a kicker, but provenance bar */}
            <div className="inline-flex items-center gap-3 border border-white/15 bg-white/[0.06] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#C9A86A]" aria-hidden />
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white/85 uppercase">Government of Punjab · Smart Education · SIH25019</span>
            </div>

            <h1 className="mt-6 font-heading text-[34px] sm:text-[42px] lg:text-[52px] font-[800] leading-[0.95] tracking-[-0.03em] text-white max-w-[18ch] text-balance">
              Your institution, <span className="font-[400] italic tracking-[-0.02em] text-[#E8D5B5]">still your home.</span>
            </h1>
            {/* taste: em-dash ban — use period, not — */}
            <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.6] text-white/80">
              A permanent, trusted home for every graduate. Find batchmates, stay current, and never lose touch with the place that shaped you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" asChild className="rounded-none bg-white text-[#1B3A5C] hover:bg-[#F1EFEA] px-7 shadow-none border-0">
                <Link href="/register">Join the Network <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="rounded-none bg-transparent border-white/30 text-white hover:bg-white hover:text-[#1B3A5C]">
                <Link href="/directory">Explore Directory</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-4 text-[12px] leading-none text-white/60">
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#1F7A4A]" />Verified records</span>
              <span>Secure</span>
              <span>Self-service</span>
              <span>Always current</span>
            </div>
            <p className="mt-2 text-[11px] text-white/40">Trusted by 2,000+ alumni records. Live database, updated as alumni join.</p>
          </div>

          {/* Right — institutional record preview, not floating glass cards */}
          <div className="lg:pl-6">
            <div className="bg-white border border-[#E2DDD6] overflow-hidden">
              <div className="h-1 w-full bg-[#C9A86A]" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=880&q=80&auto=format&fit=crop"
                alt="Students on campus walkway, Punjab institution"
                className="h-[300px] w-full object-cover"
                loading="eager"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-[#1B3A5C] text-white grid place-items-center text-[11px] font-bold">AS</div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1A2332] leading-none">Arjun Sharma · CSE 2021</p>
                      <p className="text-xs text-[#4B5563]">Software Engineer, Infosys • Bengaluru</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#1F7A4A] border border-[#B7E0C5] bg-[#E6F4EA] px-2 py-1">Verified</span>
                </div>
                <div className="mt-3 grid grid-cols-3 divide-x divide-[#E2DDD6] border border-[#E2DDD6] bg-[#F8F7F5] text-center">
                  <div className="py-2"><p className="text-xs text-[#8B95A5]">Batch</p><p className="text-sm font-semibold text-[#1A2332]">2021</p></div>
                  <div className="py-2"><p className="text-xs text-[#8B95A5]">Branch</p><p className="text-sm font-semibold text-[#1A2332]">CSE</p></div>
                  <div className="py-2"><p className="text-xs text-[#8B95A5]">Location</p><p className="text-sm font-semibold text-[#1A2332]">Bengaluru</p></div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#4B5563]">Search “Priya Kaur, ECE 2020” and see this record in under a second. No spreadsheet, no email chain.</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[#8B95A5]">Preview from live directory. Photos are illustrative; records are real.</p>
          </div>
        </div>
      </section>

      {/* VALUE — not 3 equal cards; 1 narrative + 3 border-top list (gov.uk pattern) */}
      <section className="py-14 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-10 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-20">
              <h2 className="font-heading text-[30px] lg:text-[36px] font-bold tracking-[-0.02em] leading-none text-[#1A2332] text-balance">From scattered sheets to living network.</h2>
              <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[#4B5563]">Institutions keep the record. Alumni keep it current. One source of truth replaces email threads and outdated spreadsheets.</p>
              <div className="mt-6 hidden lg:block h-px w-full bg-[#E2DDD6]" aria-hidden />
              <p className="mt-3 hidden lg:block text-xs text-[#8B95A5]">Public-sector service. Accessibility and trust over trend.</p>
            </div>

            <div className="divide-y divide-[#E2DDD6] border-y border-[#E2DDD6] bg-white">
              {[
                { icon: Users, title: "Stay discoverable", desc: "Update your profile once. Your institution always knows where you are. No emails lost, no records stale.", meta: "Self-service • No admin ticket" },
                { icon: Search, title: "Find anyone, instantly", desc: "Search by name, batch, or branch. Reconnect with a batchmate in seconds, not weeks. Filters are instant and shareable.", meta: "Search • Batch • Branch" },
                { icon: Megaphone, title: "Never miss what matters", desc: "Jobs, announcements, reunions. One feed, verified by your institution. No unverified forwards.", meta: "Verified • Announcements • Jobs" },
              ].map((item) => (
                <div key={item.title} className="grid sm:grid-cols-[auto_1fr] gap-4 p-6 sm:p-7">
                  <div className="h-9 w-9 border border-[#E2DDD6] bg-[#F8F7F5] grid place-items-center shrink-0">
                    <item.icon className="h-4 w-4 text-[#1B3A5C]" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1A2332]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#4B5563] max-w-[60ch]">{item.desc}</p>
                    <p className="mt-2 text-xs tracking-wide text-[#8B95A5]">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Gov.uk step nav, not 01/02/03 + dotted line */}
      <section className="bg-white border-y border-[#E2DDD6] py-14 lg:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="font-heading text-[28px] font-bold tracking-tight text-[#1A2332]">Three steps. Two minutes.</h2>
            <p className="mt-2 text-sm text-[#4B5563]">Built for varying digital literacy. Works on phone or desktop.</p>
          </div>

          <ol className="mt-8 grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { t: "Register", d: "Create your profile with batch, branch, and current role. Email verification only.", step: "Step 1" },
              { t: "Get discovered", d: "Your profile appears in the searchable directory for peers and your institution.", step: "Step 2" },
              { t: "Stay engaged", d: "Follow the feed for jobs, events, and institutional updates.", step: "Step 3" },
            ].map((s, idx) => (
              <li key={s.t} className="relative border border-[#E2DDD6] bg-[#F8F7F5] p-5 pl-6">
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A86A]" aria-hidden />
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#8B95A5]">{s.step}</p>
                <h3 className="mt-1 font-semibold text-[#1A2332]">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{s.d}</p>
                {idx < 2 && <span className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-px w-8 bg-[#E2DDD6]" aria-hidden />}
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-none"><Link href="/register">Create your profile</Link></Button>
            <Button variant="secondary" asChild className="rounded-none"><Link href="/colleges">Browse 24 Punjab colleges</Link></Button>
            <Button variant="secondary" asChild className="rounded-none"><Link href="/directory">View directory preview</Link></Button>
          </div>
        </div>
      </section>

      {/* COLLEGES TEASER — institutional */}
      <section className="bg-[#F8F7F5] py-8 border-y border-[#E2DDD6]">
        <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#1A2332]">24 registered colleges in Punjab</h2>
            <p className="text-sm text-[#4B5563]">From Punjab Engineering College to Sant Longowal and govt. polytechnics. Alumni select theirs during sign up.</p>
          </div>
          <div className="flex gap-2">
            <a href="/colleges" className="inline-flex items-center gap-1 border border-[#1B3A5C] bg-white px-4 py-2 text-sm font-semibold text-[#1B3A5C] hover:bg-[#1B3A5C] hover:text-white">Browse colleges</a>
            <a href="/register" className="inline-flex items-center gap-1 bg-[#1B3A5C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#14304E]">Register with your college</a>
          </div>
        </div>
      </section>

      {/* STATS  — institutional record table, not hero-metric cards */}
      <section className="py-10 lg:py-14">
        <div className="container">
          <div className="border border-[#E2DDD6] bg-white overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2DDD6] bg-[#F8F7F5] px-4 sm:px-6 py-3">
              <h2 className="text-sm font-semibold tracking-wide text-[#1A2332]">Live directory at a glance</h2>
              <span className="text-xs text-[#8B95A5]">Updated as alumni join • Seed data shown for demo</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2DDD6] divide-y lg:divide-y-0">
              {[
                { k: "Alumni records", v: "2,000+" },
                { k: "Batches connected", v: "30+" },
                { k: "Branches", v: "6" },
                { k: "Verified profiles", v: "100%" },
              ].map((s) => (
                <div key={s.k} className="px-6 py-6 text-left">
                  <p className="font-heading text-[32px] font-bold leading-none tracking-[-0.02em] text-[#1B3A5C]">{s.v}</p>
                  <p className="mt-2 text-xs font-medium tracking-[0.06em] uppercase text-[#4B5563]">{s.k}</p>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-[auto_1fr_auto] gap-3 border-t border-[#E2DDD6] bg-[#F8F7F5] px-4 sm:px-6 py-3 text-xs text-[#4B5563]">
              <span className="font-medium text-[#1A2332]">Directorate of Technical Education, Punjab</span>
              <span className="hidden lg:block text-[#C9C4BC]">·</span>
              <span>Replaces scattered spreadsheets with a single, auditable source of truth.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — single primary, no nested card slop,.gov.uk style action panel */}
      <section className="pb-14 lg:pb-20">
        <div className="container">
          <div className="border border-[#1B3A5C] bg-white">
            <div className="h-1 w-full bg-[#1B3A5C]" aria-hidden />
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 p-6 sm:p-8 lg:p-10 items-center">
              <div>
                <h2 className="font-heading text-[26px] font-bold tracking-tight text-[#1A2332]">Ready to reconnect?</h2>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[#4B5563]">Your profile is the first step. Join alumni who have already made themselves discoverable. No emails lost, no records stale.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button size="lg" asChild className="rounded-none px-7"><Link href="/register">Create your profile</Link></Button>
                  <span className="inline-flex items-center text-sm text-[#4B5563]">Already registered? <Link href="/login" className="ml-1 font-semibold text-[#1B3A5C] underline underline-offset-4">Log in</Link></span>
                </div>
              </div>
              <div className="border border-[#E2DDD6] bg-[#F8F7F5] p-4 text-sm">
                <p className="font-semibold text-[#1A2332]">What happens after you join?</p>
                <ul className="mt-2 space-y-1.5 text-[#4B5563] list-disc pl-5">
                  <li>You appear in the searchable directory</li>
                  <li>Batchmates can find you by name or company</li>
                  <li>You receive verified announcements in your feed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
