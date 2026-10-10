import Link from "next/link";
import {
  Cookie,
  CheckCircle2,
  Trash2,
  HardDrive,
  Lock,
  Layers,
  Clock,
  ChevronRight,
  Ban,
} from "lucide-react";
import { LegalNav } from "@/components/layout/LegalNav";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata = {
  title: "Cookie & Local Storage Policy",
  description:
    "Official Cookie, HTML5 Web Storage, and Client-Side Data Transparency Statement for Flunked.online.",
  alternates: {
    canonical: "https://flunked.online/cookies",
  },
};

export default function CookiePage() {
  const sections = [
    { id: "mechanisms", title: "1. Technical Clarification: Cookies vs. HTML5 Web Storage" },
    { id: "inventory", title: "2. Exhaustive Key-Value Storage Inventory" },
    { id: "prohibitions", title: "3. Absolute Prohibitions: Zero Ad Pixels & No Fingerprinting" },
    { id: "clearing-guide", title: "4. Browser-by-Browser Audit & Storage Clearing Guide" },
    { id: "gpc-dnt", title: "5. Global Privacy Control (GPC) & Do-Not-Track Signals" },
    { id: "regulatory", title: "6. Statutory Alignment (DPDP Act 2023 & IT Rules)" },
    { id: "contact", title: "7. Storage Audit Inquiries & Technical Privacy Desk" },
  ];

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="Cookie Policy" backLabel="Back to Tools Hub" />

      {/* Shared Legal Navigation */}
      <LegalNav />

      {/* Main Legal Card */}
      <article className="bg-white border-2 border-black rounded-2xl p-6 sm:p-12 shadow-neo space-y-10">
        {/* Document Header */}
        <header className="border-b-2 border-black pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm">
              <Cookie className="w-3.5 h-3.5 text-black" />
              <span>STORAGE TRANSPARENCY STATEMENT</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-bg border-2 border-black text-xs font-mono font-bold text-black">
              <Clock className="w-3.5 h-3.5 text-black/70" />
              <span>Effective Date: Academic Cycle 2024–2026</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black text-white text-xs font-mono font-bold">
              <span>Zero Tracking Pixels · Zero Third-Party Cookies</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Cookie &amp; Client-Side Storage Policy
          </h1>

          <p className="text-xs sm:text-sm font-mono text-black/70 font-semibold leading-relaxed">
            This policy outlines how Flunked.online utilizes browser-level HTML5 Web Storage
            (localStorage) and session memory strictly for technical authentication and tutorial
            state—without third-party tracking cookies or surveillance beacons.
          </p>
        </header>

        {/* Executive Plain English Callout */}
        <section className="p-6 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>The Clean Web Commitment (In Plain English)</span>
          </div>
          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed font-sans">
            Flunked.online refuses to compromise student devices. We do not use third-party
            marketing cookies, cross-site tracking beacons, or behavioral fingerprinting scripts. We
            use modern, client-side{" "}
            <strong className="text-black font-black">HTML5 Local Storage</strong> strictly to keep
            your session authenticated between tool clicks and remember if you have dismissed the
            onboarding tutorial. You can audit, inspect, and completely wipe this data from your
            browser at any time with a single click.
          </p>
          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed font-sans">
            We use Vercel Web Analytics to count page views and visitors. It does not use cookies
            and does not follow users across sites. It records page views, referrer, browser and
            device type, and approximate country. Vercel acts as the data processor.
          </p>
        </section>

        {/* Table of Contents / Interactive Jump Links */}
        <section className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black">
            <Layers className="w-4 h-4 text-black" />
            <span>Storage Policy Contents &amp; Technical Sections</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-flunked-yellow border border-transparent hover:border-black text-black/80 hover:text-black transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="truncate">{s.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Policy Body */}
        <div className="space-y-12 text-black/90 font-sans leading-relaxed text-sm sm:text-base divide-y-2 divide-black/10">
          {/* Section 1 */}
          <section id="mechanisms" className="space-y-4 pt-6">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                1
              </span>
              <span>Technical Clarification: Cookies vs. HTML5 Web Storage</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                To provide transparency under India&apos;s{" "}
                <strong className="text-black font-bold">
                  Digital Personal Data Protection Act, 2023
                </strong>{" "}
                and international privacy standards, it is essential to distinguish between legacy
                HTTP Cookies and modern HTML5 Web Storage:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                  <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <Cookie className="w-3.5 h-3.5 text-black" />
                    <span>Traditional HTTP Cookies</span>
                  </span>
                  <p className="text-xs text-black/80 leading-relaxed">
                    Cookies are small text fragments sent back and forth between a browser and a web
                    server on{" "}
                    <strong className="text-black font-bold">every single HTTP request</strong>.
                    Commercial ad tech abuses cookies to construct cross-site surveillance
                    histories.{" "}
                    <strong className="text-black font-black">
                      Flunked.online does NOT deploy tracking or advertising cookies.
                    </strong>
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                  <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-black" />
                    <span>W3C HTML5 Local Storage</span>
                  </span>
                  <p className="text-xs text-black/80 leading-relaxed">
                    HTML5 Web Storage allows web applications to store key-value data directly in
                    the browser. Local Storage is{" "}
                    <strong className="text-black font-bold">
                      never automatically transmitted over the network
                    </strong>{" "}
                    with document requests, providing vastly superior privacy, security, and zero
                    server-side exposure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="inventory" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                2
              </span>
              <span>Exhaustive Key-Value Storage Inventory</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Below is the complete, comprehensive registry of every data item Flunked.online
                stores or handles inside your web browser client:
              </p>

              <div className="overflow-x-auto border-2 border-black rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-flunked-yellow border-b-2 border-black font-black text-black">
                    <tr>
                      <th className="p-3">Key Identifier</th>
                      <th className="p-3">Mechanism</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Operational Purpose</th>
                      <th className="p-3">Duration &amp; Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-black bg-white text-black/85 font-medium">
                    <tr>
                      <td className="p-3 font-bold font-mono">flunked_user</td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] uppercase font-bold">
                          Strictly Necessary
                        </span>
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Stores a JSON object containing your student name or nickname, campus name,
                        and timestamp. Allows you to access calculator tools immediately across tabs
                        without re-entering your details.
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Persistent until user clicks &quot;Reset Profile&quot; or browser cache is
                        cleared.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono">flunked_tutorial_completed</td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 bg-flunked-yellow border border-black text-black rounded text-[10px] uppercase font-bold">
                          Functional UI
                        </span>
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Stores a boolean flag (<code className="font-bold">&quot;true&quot;</code>)
                        once you finish or dismiss the 4-step onboarding guide, preventing the modal
                        from popping up automatically.
                      </td>
                      <td className="p-3 font-sans text-xs">Persistent across sessions.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono">
                        Tool Inputs (Attendance, CTC, Marks)
                      </td>
                      <td className="p-3">Browser DOM RAM</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 bg-zinc-200 text-black rounded text-[10px] uppercase font-bold">
                          Ephemeral Client
                        </span>
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Input numbers typed into calculator forms. Evaluated strictly in local
                        JavaScript scope; never stored in localStorage, cookies, or remote
                        databases.
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Flushed upon page reload or tab closure.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono">Vercel Web Analytics</td>
                      <td className="p-3">None (Cookieless)</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 bg-cyan-200 text-black rounded text-[10px] uppercase font-bold">
                          Privacy Metrics
                        </span>
                      </td>
                      <td className="p-3 font-sans text-xs">
                        We use Vercel Web Analytics to count page views and visitors. It does not
                        use cookies and does not follow users across sites. It records page views,
                        referrer, browser and device type, and approximate country. Vercel acts as
                        the data processor.
                      </td>
                      <td className="p-3 font-sans text-xs">
                        Zero client persistence (No cookies or persistent identifiers stored).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="prohibitions" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                3
              </span>
              <span>Absolute Prohibitions: Zero Ad Pixels &amp; No Fingerprinting</span>
            </h2>
            <div className="p-5 rounded-2xl bg-[#FFF5F5] border-2 border-black space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-rose-700 uppercase">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>What Flunked.online Strictly Rejects &amp; Prohibits</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm font-medium text-black/85">
                <li>
                  <strong className="text-black">No Advertising Beacons:</strong> We do not load
                  Meta Pixel, Google Analytics 4, TikTok trackers, X/Twitter conversion pixels, or
                  LinkedIn Insights tags;
                </li>
                <li>
                  <strong className="text-black">No Cross-Site Behavioral Graphing:</strong> We
                  never track what other educational, shopping, or university portals you browse
                  before or after visiting Flunked.online;
                </li>
                <li>
                  <strong className="text-black">No Device Fingerprinting:</strong> We strictly
                  prohibit canvas fingerprinting, WebGL shader inspection, audio context
                  fingerprinting, or font-enumeration profiling on student devices;
                </li>
                <li>
                  <strong className="text-black">No Third-Party Data Brokers:</strong> No analytics
                  software embedded on Flunked.online transmits your device data to data
                  aggregators. Vercel Web Analytics is used solely for aggregate visitor metrics
                  without cookies, with Vercel acting as the data processor.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="clearing-guide" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                4
              </span>
              <span>Browser-by-Browser Audit &amp; Storage Clearing Guide</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                You retain complete sovereign control over your browser&apos;s storage. You can
                immediately wipe all Flunked.online session state using either our one-click
                application control or native browser settings:
              </p>

              {/* Instant in-app action */}
              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-2">
                <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-black" />
                  <span>Method 1: One-Click Instant In-App Logout</span>
                </span>
                <p className="text-xs sm:text-sm text-black/85">
                  Click your verified campus badge in the top navigation header and choose{" "}
                  <strong className="text-black">&quot;Sign out&quot;</strong>. This triggers an
                  instantaneous JavaScript{" "}
                  <code className="font-mono font-bold">
                    localStorage.removeItem(&apos;flunked_user&apos;)
                  </code>{" "}
                  routine, wiping your active session token.
                </p>
              </div>

              {/* Browser native instructions */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs font-black uppercase text-black block">
                  Method 2: Native Browser Storage Purging
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1">
                    <span className="font-mono font-black text-black block">
                      Google Chrome &amp; Chromium
                    </span>
                    <p className="text-black/75">
                      Press{" "}
                      <kbd className="font-mono font-bold bg-zinc-100 px-1 rounded border">F12</kbd>{" "}
                      &gt; Application tab &gt; Storage &gt; Local Storage &gt; Right-click{" "}
                      <code className="font-bold">flunked.online</code> &gt; Clear. Or: Settings
                      &gt; Privacy &amp; Security &gt; Delete browsing data.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1">
                    <span className="font-mono font-black text-black block">
                      Apple Safari (iOS &amp; macOS)
                    </span>
                    <p className="text-black/75">
                      macOS: Safari &gt; Settings &gt; Privacy &gt; Manage Website Data &gt; Search
                      &quot;flunked.online&quot; &gt; Remove. iOS: Settings &gt; Safari &gt;
                      Advanced &gt; Website Data &gt; Delete.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1">
                    <span className="font-mono font-black text-black block">Mozilla Firefox</span>
                    <p className="text-black/75">
                      Click the padlock icon next to the URL &gt; Clear cookies and site data &gt;
                      Confirm. Or: Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data
                      &gt; Clear Data.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1">
                    <span className="font-mono font-black text-black block">
                      Brave &amp; Microsoft Edge
                    </span>
                    <p className="text-black/75">
                      Brave Shields automatically isolates local data. To clear: Settings &gt;
                      Privacy &gt; Clear Browsing Data &gt; Select Cookies and Site Data &gt; Clear
                      Now.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="gpc-dnt" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                5
              </span>
              <span>Global Privacy Control (GPC) &amp; Do-Not-Track Signals</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Flunked.online natively honors the{" "}
                <strong className="text-black font-bold">Global Privacy Control (GPC)</strong> and{" "}
                <strong className="text-black font-bold">Do Not Track (DNT)</strong> browser
                signals. Because our infrastructure does not load behavioral trackers or sell
                student profiles, our platform is inherently compliant with your browser&apos;s
                highest privacy configuration by default.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="regulatory" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                6
              </span>
              <span>Statutory Alignment (DPDP Act 2023 &amp; IT Rules)</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>Our storage practices comply with:</p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">
                    Digital Personal Data Protection Act, 2023 (DPDP Act):
                  </strong>{" "}
                  Section 6 (Consent) and Section 8 (Data Security &amp; Minimization Obligations);
                </li>
                <li>
                  <strong className="text-black">Information Technology Act, 2000:</strong> Section
                  43A and Section 72A (Reasonable Security Practices for Computer Systems);
                </li>
                <li>
                  <strong className="text-black">International Best Practices:</strong> Principles
                  of the EU e-Privacy Directive (Article 5(3)) exempting strictly necessary
                  technical session storage from intrusive consent banners.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="contact" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                7
              </span>
              <span>Storage Audit Inquiries &amp; Technical Privacy Desk</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                If you have questions regarding client storage mechanics, wish to report a security
                observation, or seek technical verification of our client-side sandboxing, please
                address our engineering privacy desk:
              </p>
              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm font-mono text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-black text-black">
                  <Lock className="w-4 h-4 text-black" />
                  <span>Technical Data Storage Inquiries</span>
                </div>
                <div className="text-black/85">
                  <span>Electronic Dispatch: </span>
                  <a
                    href="mailto:privacy@flunked.online"
                    className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                  >
                    privacy@flunked.online
                  </a>
                </div>
                <div className="text-black/70 text-xs">
                  Subject Line Recommendation:{" "}
                  <code className="font-bold text-black">
                    &quot;Storage &amp; Cookie Audit Request&quot;
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <footer className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black/70">
          <div>
            <span>
              © {new Date().getFullYear()} Flunked.online. Transparent Client-Side Storage.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-black underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-black underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-black underline">
              Academic Disclaimer
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
