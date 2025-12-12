"use client";
import { createClient } from "./utils/supabase/client";

export default function Home() {
  const supabase = createClient();

  const submitWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const { data, error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      console.error("Error joining waitlist:", error.message);
      alert("There was an error joining the waitlist. Please try again.");
    } else {
      alert("Thank you for joining the waitlist! We'll be in touch.");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <header className="flex items-center justify-between py-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-cyan-500 text-slate-950 px-3 py-1 font-semibold uppercase tracking-wide">SnapStock</div>
          <span className="text-sm text-slate-300 hidden sm:inline">Parts tracking built for FIRST Robotics teams</span>
        </div>

        <nav className="flex items-center gap-4">
          <a href="#product" className="text-sm text-slate-300 hover:text-white">Product</a>
          <a href="#features" className="text-sm text-slate-300 hover:text-white">Use cases</a>
          <a href="#contact" className="text-sm text-slate-300 hover:text-white">Contact</a>

          <a
            href="mailto:sid@thefossrant.com?subject=SnapStock%20Demo%20Request"
            className="text-sm px-3 py-2 rounded-md border border-cyan-500/50 hover:bg-cyan-500/10"
            aria-label="Request demo"
          >
            Get a demo
          </a>

          <form
            onSubmit={submitWaitlist}
            className="hidden sm:flex items-center gap-2"
            aria-label="Join waitlist"
          >
            <input
              name="email"
              type="email"
              placeholder="you@frc-team.com"
              required
              className="px-3 py-2 rounded-md border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-md text-sm font-semibold hover:bg-cyan-400"
            >
              Join Waitlist
            </button>
          </form>
        </nav>
      </header>

      <section className="grow flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Never lose track of bolts, batteries, or bumpers again.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              SnapStock lets your pit crew snap a photo of any tote or shelf and instantly see counts for screws, motors, pneumatics, and wiring. Keep your robot legal, your BOM clean, and your drive team calm.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <form onSubmit={submitWaitlist} className="flex w-full sm:w-auto gap-2">
                <label htmlFor="hero-email" className="sr-only">Email</label>
                <input
                  id="hero-email"
                  name="email"
                  type="email"
                  placeholder="mentor@team.org"
                  required
                  className="flex-1 min-w-0 px-3 py-3 rounded-md border border-slate-700 bg-slate-900 text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-cyan-500 text-slate-950 rounded-md font-semibold hover:bg-cyan-400"
                >
                  Join Waitlist
                </button>
              </form>

              <a
                href="mailto:sid@thefossrant.com?subject=SnapStock%20Demo%20Request"
                className="inline-flex items-center justify-center px-5 py-3 border border-cyan-500/50 rounded-md text-sm hover:bg-cyan-500/10"
                aria-label="Request demo"
              >
                Get a demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Early-access teams get onboarding help, pit-crew playbooks, and tailored part libraries for FRC & FTC hardware.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4" id="features">
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900 shadow-[0_0_40px_-25px_rgba(34,211,238,0.8)]">
                <h4 className="font-semibold">Match Day Ready</h4>
                <p className="text-sm text-slate-300 mt-2">Snap a bin, instantly see what’s low, and auto-generate a refill list before queuing.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-950">
                <h4 className="font-semibold">STEM-Friendly Ops</h4>
                <p className="text-sm text-slate-300 mt-2">Student-friendly UI, mentor approvals, and CSV exports for bill-of-materials and inspection binders.</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900">
                <h4 className="font-semibold">Off-Season Proof</h4>
                <p className="text-sm text-slate-300 mt-2">Track practice robot parts, spare drivetrains, and outreach kits without spreadsheets.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 p-6 bg-slate-950/70 shadow-lg">
            <h3 className="font-semibold text-lg text-slate-100">What teams get</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>• Photo-based bin scanning tuned for FRC hardware sizes</li>
              <li>• Battery board tracking with charge cycles and flags</li>
              <li>• Auto-export BOM PDFs and CSVs for inspection and Chairman&apos;s docs</li>
              <li>• Lightweight offline mode for venues with spotty arena Wi-Fi</li>
            </ul>

            <div className="mt-6">
              <a
                href="#product"
                className="inline-block px-4 py-2 bg-cyan-500 text-slate-950 rounded-md hover:bg-cyan-400 text-sm font-semibold"
              >
                See how it works
              </a>
              <a
                href="mailto:hello@snapstock.com?subject=FIRST%20Robotics%20Intro"
                className="ml-3 text-sm text-cyan-300 hover:underline"
              >
                Ask about pricing
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Built with input from student captains and mentors. Perfect for regionals, champs, and off-season events.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 py-12" id="product">
          <h2 className="text-3xl font-extrabold text-center">See SnapStock in action</h2>
          <p className="mt-8 text-lg text-slate-300 text-center">
            SnapStock is designed to make inventory management effortless for FIRST Robotics teams. 
            Stay tuned for a detailed walkthrough of how SnapStock can help your team stay organized 
            and competition-ready.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 py-12" id="features">
          <h2 className="text-3xl font-extrabold text-center">Use cases</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-900">
              <h3 className="font-semibold text-lg">Pre-Competition Prep</h3>
              <p className="mt-2 text-slate-300">Quickly scan your pit bins to identify low-stock items and generate a refill list before heading to the competition.</p>
            </div>
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-950">
              <h3 className="font-semibold text-lg">Inspection Ready</h3>
              <p className="mt-2 text-slate-300">Easily export your bill of materials in PDF or CSV format to ensure your robot meets all inspection requirements.</p>
            </div>
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-900">
              <h3 className="font-semibold text-lg">Off-Season Organization</h3>
              <p className="mt-2 text-slate-300">Keep track of practice robot parts, spare drivetrains, and outreach kits without the hassle of spreadsheets.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 py-12 text-center" id="contact">
          <h2 className="text-3xl font-extrabold">Ready to streamline your team&apos;s inventory management?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Join the SnapStock waitlist today and be among the first to experience hassle-free parts tracking designed specifically for FIRST Robotics teams.
          </p>
          <form onSubmit={submitWaitlist} className="mt-6 flex flex-col sm:flex-row justify-center gap-3" aria-label="Join waitlist">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-md border border-slate-700 bg-slate-900 text-slate-100 focus:border-cyan-500 focus:outline-none w-full sm:w-auto"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 text-slate-950 rounded-md font-semibold hover:bg-cyan-400"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400">© {new Date().getFullYear()} SnapStock — Inventory that keeps your robot on the field.</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="text-sm text-slate-300 hover:underline">Terms</a>
            <a href="/privacy" className="text-sm text-slate-300 hover:underline">Privacy</a>
            <a href="mailto:hello@snapstock.com" id="contact" className="text-sm text-slate-300 hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
