/* ============================================================
   AURORA VTOL — INDIEGOGO CAMPAIGN PAGE
   Design: Deep Space Mission Control
   v6 — Implementation Partnership & South African Development:
   - New "Implementation Path" section (after Working Prototype)
   - New "Industrial Development Path" section (South African focus)
   - Updated hero subheadline with South African mechanical development
   - Updated "What Contributions Unlock" opening for partnership emphasis
   - New FAQ item: "Is Aurora being developed with an implementation partner?"
   - New "Future Applications" section (cargo, industrial use)
   - GitHub link fixed to point to aurora-vtol technical repo
   - Named Bronberg Dynamics partnership with Dr Gert Erasmus
   - Full section reordering for credibility flow
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import {
  Github,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Play,
  ExternalLink,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────
const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030420333/WpzXq6yH633ZkdNRUJzomP/aurora-hero-ring-dVRkb9zhZbURiSu2asYD5f.webp";
const SOFTWARE_VIZ_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030420333/WpzXq6yH633ZkdNRUJzomP/aurora-software-viz-3De9ZGdyuZy4NvFGVbXvDE.webp";
const RING_DIAGRAM_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030420333/WpzXq6yH633ZkdNRUJzomP/aurora-ring-diagram-2vDjFiZtJuka6Geos2An8o.webp";
const LAB_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030420333/WpzXq6yH633ZkdNRUJzomP/aurora-prototype-lab-ngk72bVJ4sNAukSYV6Bwg8.webp";

// ── Campaign stats — update these when the campaign is live ──
const FUNDING_GOAL = 85000;
const AMOUNT_RAISED = 0;
const BACKERS = 0;
const DAYS_LEFT = 30;

const BUDGET_ITEMS = [
  { label: "Mechanical CAD & Packaging", pct: 25, color: "#00D4FF" },
  { label: "Propulsion & Actuator Subsystems", pct: 20, color: "#00A8CC" },
  { label: "Electronics, Control Hardware & Sensors", pct: 20, color: "#0080A0" },
  { label: "Test Rigs, Safety Hardware & Instrumentation", pct: 15, color: "#005F78" },
  { label: "BOM Iteration & Prototype Procurement", pct: 10, color: "#003F52" },
  { label: "Documentation, Communication & Project Execution", pct: 10, color: "#002030" },
];

const PERK_TIERS = [
  {
    amount: 10,
    title: "Supporter",
    description:
      "Help launch Project Aurora and receive campaign updates. Your name in the digital supporter list.",
    perks: [
      "Campaign update emails",
      "Digital supporter badge",
      "Access to contributor-only announcements",
    ],
    highlight: false,
  },
  {
    amount: 25,
    title: "Aurora Insider",
    description:
      "Receive detailed development updates and contributor-only technical progress posts as the project advances.",
    perks: [
      "All Supporter perks",
      "Contributor-only progress updates",
      "Milestone summaries",
    ],
    highlight: false,
  },
  {
    amount: 50,
    title: "Engineering Backer",
    description:
      "Get behind-the-scenes access to CAD progress, subsystem decisions, and test milestones.",
    perks: [
      "All Aurora Insider perks",
      "Contributor-only technical notes",
      "Selected CAD & test snapshots",
    ],
    highlight: false,
  },
  {
    amount: 100,
    title: "Prototype Insider",
    description:
      "Early access to deeper engineering updates, subsystem decisions, and development logs as they happen.",
    perks: [
      "All Engineering Backer perks",
      "Early access to engineering updates",
      "Subsystem decision logs",
    ],
    highlight: true,
  },
  {
    amount: 250,
    title: "Aurora Wall",
    description:
      "Your name listed on the project supporter wall in all project materials and documentation.",
    perks: [
      "All Prototype Insider perks",
      "Name on the Aurora Supporter Wall",
      "Listed in project documentation",
    ],
    highlight: false,
  },
  {
    amount: 500,
    title: "Founding Contributor",
    description:
      "Named recognition in the prototype documentation pack and milestone update series.",
    perks: [
      "All Aurora Wall perks",
      "Named in prototype documentation",
      "Recognition in milestone updates",
    ],
    highlight: false,
  },
  {
    amount: 1000,
    title: "Sponsor Tier",
    description:
      "Recognition as a founding sponsor in milestone updates, project acknowledgments, and all major project materials.",
    perks: [
      "All Founding Contributor perks",
      "Founding sponsor recognition",
      "Named in all major project materials",
      "Direct project acknowledgment",
    ],
    highlight: false,
  },
];

const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    title: "Mechanical Definition",
    items: [
      "Airframe, ring, and internal packaging concept",
      "Actuator and propulsion placement",
      "Access and maintainability layout",
      "Structural concept refinement",
    ],
    output: "Deliverable: packaging CAD and subsystem layout pack",
    status: "funded",
  },
  {
    phase: "Phase 2",
    title: "Prototype System Definition",
    items: [
      "Propulsion candidate selection",
      "Actuator subsystem definition",
      "Electronics and power architecture",
      "Compute and sensor integration",
      "BOM and supplier package creation",
    ],
    output: "Deliverable: BOM and prototype architecture document",
    status: "funded",
  },
  {
    phase: "Phase 3",
    title: "Rigging & Subsystem Validation",
    items: [
      "Test rigs and bench validation setups",
      "Hardware-connected ArduPilot workflows",
      "Mission Planner validation loops",
      "Instrumentation and safety setup",
    ],
    output: "Deliverable: tested rig videos and validation report",
    status: "stretch",
  },
  {
    phase: "Phase 4",
    title: "Autonomous Demonstrator",
    items: [
      "Integrated prototype assembly",
      "Controlled ground validation",
      "Constrained autonomous test program",
      "Iteration based on measured results",
      "Transparent engineering updates",
    ],
    output: "Deliverable: autonomous demonstrator footage and engineering report",
    status: "stretch",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is Aurora a manned aircraft project?",
    a: "No. Aurora is an autonomous prototype research program. This campaign funds autonomous prototype development only — mechanical definition, subsystem architecture, test rigs, and demonstrator integration. No manned flight testing is part of this campaign scope or timeline.",
  },
  {
    q: "Do you already have a working aircraft prototype?",
    a: "The current working prototype is the software-first VTOL control and validation stack — maneuver logic, allocator studies, replay and validation workflows, and integration with ArduPilot and Mission Planner. What you see today is the live prototype: software-generated maneuvers replayed and inspected through ArduPilot and Mission Planner workflows. This campaign funds the physical engineering step that follows.",
  },
  {
    q: "Why not build hardware first?",
    a: "Because hardware is expensive, slow to change, and unforgiving of assumptions that were never tested. Aurora uses software first to reduce that risk before committing to expensive fabrication. The control-stack foundation already exists — this campaign funds the transition from that foundation to a physical autonomous prototype.",
  },
  {
    q: "What makes Aurora different from a normal VTOL?",
    a: "Aurora explores a ring-based architecture with distributed control and an unusual set of maneuver goals: decoupled motion, lateral movement, redirect behavior, braking, and repel-style obstacle response. These are studied through the software platform before hardware is built, which is the opposite of how most VTOL programs approach the problem.",
  },
  {
    q: "Will this campaign produce a passenger aircraft?",
    a: "No. The funded outcome is an autonomous prototype path, not a passenger-ready aircraft. Those are future stages that depend on the success of this foundational engineering work. The campaign is explicit about this scope throughout.",
  },
  {
    q: "What will contributors actually see if the campaign succeeds?",
    a: "Visible deliverables include CAD progress updates, subsystem definition documents, BOM milestones, bench and rig testing reports, and autonomous prototype integration updates — all shared transparently with contributors at each phase milestone. Phase 1 delivers a packaging CAD and subsystem layout pack. Phase 2 delivers a BOM and prototype architecture document. Stretch phases deliver rig validation reports and autonomous demonstrator footage.",
  },
  {
    q: "Why Indiegogo Flexible Funding?",
    a: "Flexible Funding means every contribution goes directly toward the project regardless of whether the $85,000 primary goal is reached. Phases 1 and 2 are fully funded at $85,000. Any contributions received before that threshold still accelerate early work. Every dollar raised beyond $85,000 pushes Phases 3 and 4 closer to execution.",
  },
  {
    q: "Is Aurora being developed with an implementation partner?",
    a: "Yes. Aurora is moving beyond software-only development and into a physical prototype path with South African engineering implementation support from Bronberg Dynamics. This strengthens the project by combining the existing control-stack platform with a practical route into mechanical definition, subsystem integration, and prototype testing.",
  },
];

// ─── Utility hooks ────────────────────────────────────────────
function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    if (target === 0) { setCount(0); return; }
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, isVisible, duration]);
  return count;
}

// ─── Sub-components ───────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050D1A]/95 backdrop-blur-md border-b border-[#00D4FF]/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#00D4FF] flex items-center justify-center animate-ring-pulse">
            <div className="w-3 h-3 rounded-full bg-[#00D4FF]/60" />
          </div>
          <span className="display-font text-xl font-bold tracking-widest text-white uppercase">
            Project Aurora
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-[#F0F4FF]/70">
          <a href="#story" className="hover:text-[#00D4FF] transition-colors">Story</a>
          <a href="#prototype" className="hover:text-[#00D4FF] transition-colors">Prototype</a>
          <a href="#roadmap" className="hover:text-[#00D4FF] transition-colors">Roadmap</a>
          <a href="#perks" className="hover:text-[#00D4FF] transition-colors">Perks</a>
          <a href="#faq" className="hover:text-[#00D4FF] transition-colors">FAQ</a>
        </div>
        <a
          href="https://github.com/gabrielnkuna/aurora-vtol"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#F0F4FF]/70 hover:text-[#00D4FF] transition-colors"
        >
          <Github size={16} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/40 via-[#050D1A]/60 to-[#050D1A]/80" />
      </div>

      <div className="relative z-10 container max-w-4xl text-center">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-mono tracking-widest uppercase">
            • Software Engineering First
          </span>
        </div>

        <h1 className="display-font text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Aurora VTOL
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-[#00D4FF] mb-6 leading-tight">
          Funding the leap from software-proven control to an autonomous prototype
        </h2>

        <p className="text-lg text-[#F0F4FF]/80 mb-8 leading-relaxed max-w-2xl mx-auto">
          Aurora already has a public control and validation stack. This campaign funds the next step: South African mechanical development, subsystem architecture, test rigs, and autonomous prototype integration.
        </p>

        <p className="text-base text-[#F0F4FF]/70 mb-12 leading-relaxed max-w-3xl mx-auto">
          Aurora is a software-first VTOL research and prototyping program built around a 16-fan, 32-vane ring architecture. The control, maneuver, and validation stack is already built and public. This campaign funds the transition into a real autonomous prototype path.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#perks"
            className="px-8 py-3 bg-[#00D4FF] text-[#050D1A] font-bold rounded-lg hover:bg-[#00D4FF]/90 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/50"
          >
            Contribute Now
          </a>
          <a
            href="https://github.com/gabrielnkuna/aurora-vtol"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[#00D4FF]/50 text-[#00D4FF] font-bold rounded-lg hover:bg-[#00D4FF]/10 transition-all"
          >
            View Technical Repo
          </a>
        </div>
      </div>
    </section>
  );
}

function PrototypeVideoSection() {
  return (
    <section className="py-16 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="aspect-video bg-[#050D1A] rounded-lg border border-[#00D4FF]/20 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#00D4FF] flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#00D4FF]/50 transition-all">
                <Play size={32} className="text-[#00D4FF] fill-[#00D4FF]" />
              </div>
              <p className="text-[#F0F4FF]/70 text-sm">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampaignStatsSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const raisedCount = useCountUp(AMOUNT_RAISED, isVisible);
  const backersCount = useCountUp(BACKERS, isVisible);
  const progressPercent = (AMOUNT_RAISED / FUNDING_GOAL) * 100;

  return (
    <section ref={ref} className="py-16 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container">
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">
              ${raisedCount.toLocaleString()}
            </div>
            <div className="text-sm text-[#F0F4FF]/60">Raised</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">
              {backersCount.toLocaleString()}
            </div>
            <div className="text-sm text-[#F0F4FF]/60">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">
              {DAYS_LEFT}
            </div>
            <div className="text-sm text-[#F0F4FF]/60">Days Left</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0A1628] rounded-lg p-4 border border-[#00D4FF]/20">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#F0F4FF]/70">Progress</span>
              <span className="text-sm font-bold text-[#00D4FF]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#050D1A] rounded-full h-3 overflow-hidden border border-[#00D4FF]/20">
              <div
                className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#F0F4FF]/60">
              <span>${AMOUNT_RAISED.toLocaleString()}</span>
              <span>${FUNDING_GOAL.toLocaleString()} goal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Why Aurora</h2>

        <div className="space-y-6 text-[#F0F4FF]/80 leading-relaxed">
          <p>
            Most VTOL programs start with hardware assumptions and build control around them. Aurora reverses that logic: it begins with a software-first control and validation platform, tests the maneuver logic and architecture decisions in simulation and replay, and only then transitions to physical prototype development.
          </p>

          <p>
            The result is a more credible development path. The control stack is already public, already tested against ArduPilot and Mission Planner workflows, and already demonstrates the unusual maneuver goals that define Aurora: decoupled motion, lateral movement, redirect behavior, braking, and repel-style obstacle response.
          </p>

          <p>
            This campaign funds the next step: converting that software foundation into real mechanical design, subsystem architecture, prototype integration, and structured testing. The goal is not to simulate the aircraft. The goal is to build the engineering bridge from software to physical prototype.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrototypeSection() {
  return (
    <section id="prototype" className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">The Working Prototype</h2>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-[#00D4FF] mb-4">Control Stack & Validation</h3>
              <p className="text-[#F0F4FF]/80 leading-relaxed mb-4">
                The current prototype is the software-first VTOL control and validation stack: maneuver logic, allocator studies, replay and validation workflows, and integration with ArduPilot and Mission Planner.
              </p>
              <p className="text-[#F0F4FF]/70 text-sm">
                What you see today is the live prototype — software-generated maneuvers replayed and inspected through ArduPilot and Mission Planner workflows.
              </p>
            </div>
            <img src={SOFTWARE_VIZ_IMAGE} alt="Control Stack" className="rounded-lg border border-[#00D4FF]/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={RING_DIAGRAM_IMAGE} alt="Ring Architecture" className="rounded-lg border border-[#00D4FF]/20 order-2 md:order-1" />
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-bold text-[#00D4FF] mb-4">16 Fans. 32 Vanes.</h3>
              <p className="text-[#F0F4FF]/80 leading-relaxed mb-4">
                Aurora uses a ring-based architecture with distributed control across 16 propulsion units arranged in a circular topology. This enables unusual maneuver capabilities: decoupled motion, lateral movement, redirect behavior, braking, and repel-style obstacle response.
              </p>
              <p className="text-[#F0F4FF]/70 text-sm">
                The topology is studied and validated in software before any hardware is built.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImplementationPathSection() {
  return (
    <section className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <div className="mb-2 inline-block">
          <span className="text-xs font-mono tracking-widest uppercase text-[#00D4FF]">Implementation Path</span>
        </div>
        <h2 className="display-font text-4xl font-bold text-white mb-12">From control-stack platform to physical prototype</h2>

        <div className="space-y-6 text-[#F0F4FF]/80 leading-relaxed">
          <p>
            Project Aurora is not being advanced as a software-only concept. The software-first platform is now being used as the foundation for a physical prototype path in South Africa.
          </p>

          <p>
            Aurora is being developed with implementation collaboration from <a href="https://bronbergdynamics.co.za/" target="_blank" rel="noopener noreferrer" className="text-[#00D4FF] hover:underline font-semibold">Bronberg Dynamics under Dr Gert Erasmus</a>, bringing practical South African aerospace engineering capability into the next phase of development. This partnership is intended to convert the current control-stack into real engineering outputs: mechanical definition, subsystem architecture, prototype packaging, build planning, and structured validation.
          </p>

          <p className="text-[#F0F4FF]/70 italic">
            This matters because Aurora now combines a public software-first control and validation platform, a defined autonomous prototype scope, and a real implementation path toward hardware. The goal is not just to simulate the aircraft. The goal is to build the engineering bridge from software to physical prototype.
          </p>
        </div>
      </div>
    </section>
  );
}

function MotionSection() {
  return (
    <section className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">A Different Class of Motion</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-3">Decoupled Motion</h3>
            <p className="text-[#F0F4FF]/70 text-sm">
              Pitch, roll, and yaw can be controlled independently of forward motion, enabling precision positioning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-3">Lateral Movement</h3>
            <p className="text-[#F0F4FF]/70 text-sm">
              Direct side-to-side translation without banking, useful for confined spaces and precision approach.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-3">Redirect Behavior</h3>
            <p className="text-[#F0F4FF]/70 text-sm">
              Rapid heading changes without traditional banking maneuvers, enabling agile autonomous response.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-3">Braking & Repel</h3>
            <p className="text-[#F0F4FF]/70 text-sm">
              Rapid deceleration and obstacle repel behavior for safe autonomous operation in dynamic environments.
            </p>
          </div>
        </div>

        <img src={LAB_IMAGE} alt="Lab Setup" className="rounded-lg border border-[#00D4FF]/20 w-full" />
      </div>
    </section>
  );
}

function IndustrialDevelopmentSection() {
  return (
    <section className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <div className="mb-2 inline-block">
          <span className="text-xs font-mono tracking-widest uppercase text-[#00D4FF]">Industrial Development Path</span>
        </div>
        <h2 className="display-font text-4xl font-bold text-white mb-12">Designed to be developed and built in South Africa</h2>

        <div className="space-y-6 text-[#F0F4FF]/80 leading-relaxed">
          <p>
            Aurora is intended to follow a South African development path. The goal is not only to prove an autonomous VTOL prototype, but to build local design, integration, testing, and future production capability around it.
          </p>

          <p>
            That means this project is being shaped around local engineering execution, local prototype development, local subsystem integration, and a future path toward South African industrial participation.
          </p>

          <p>
            This campaign funds the prototype stage, but the wider objective is to create a real local technology asset — not just a one-off demonstrator.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContributionsUnlockSection() {
  return (
    <section className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">What Contributions Unlock</h2>

        <p className="text-[#F0F4FF]/80 leading-relaxed mb-12">
          Your contribution funds the transition from software research into physical engineering in partnership with real-world implementation capability. The immediate goal is an autonomous prototype stage — not a passenger aircraft, not manned testing, but a disciplined development program covering mechanical design, subsystem integration, prototype build, and structured validation.
        </p>

        <div className="space-y-4">
          {ROADMAP_PHASES.slice(0, 2).map((phase) => (
            <div key={phase.phase} className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-[#00D4FF] flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">{phase.phase}: {phase.title}</h3>
                  <ul className="space-y-1 text-sm text-[#F0F4FF]/70 mb-3">
                    {phase.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-[#00D4FF] font-semibold">{phase.output}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Development Roadmap</h2>

        <div className="space-y-4">
          {ROADMAP_PHASES.map((phase) => (
            <div
              key={phase.phase}
              className={`border rounded-lg p-6 transition-all ${
                phase.status === "funded"
                  ? "bg-[#050D1A] border-[#00D4FF]/40"
                  : "bg-[#050D1A]/50 border-[#00D4FF]/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-white">{phase.phase}: {phase.title}</h3>
                  <span className={`text-xs font-mono uppercase mt-1 inline-block px-2 py-1 rounded ${
                    phase.status === "funded"
                      ? "bg-[#00D4FF]/20 text-[#00D4FF]"
                      : "bg-[#00D4FF]/10 text-[#00D4FF]/60"
                  }`}>
                    {phase.status === "funded" ? "Funded" : "Stretch Goal"}
                  </span>
                </div>
              </div>
              <ul className="space-y-1 text-sm text-[#F0F4FF]/70 mb-3">
                {phase.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="text-xs text-[#00D4FF] font-semibold">{phase.output}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BudgetSection() {
  return (
    <section className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Budget Allocation</h2>

        <div className="space-y-4">
          {BUDGET_ITEMS.map((item) => (
            <div key={item.label} className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-[#F0F4FF]">{item.label}</span>
                <span className="text-sm font-bold text-[#00D4FF]">{item.pct}%</span>
              </div>
              <div className="w-full bg-[#050D1A] rounded-full h-2 overflow-hidden border border-[#00D4FF]/20">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#F0F4FF]/70 mt-8 leading-relaxed">
          Budget is allocated primarily to engineering deliverables and project execution. Phases 1 and 2 are fully funded at $85,000. Stretch funding accelerates Phases 3 and 4 (test rigs, validation, and autonomous demonstrator integration).
        </p>
      </div>
    </section>
  );
}

function PerksSection() {
  return (
    <section id="perks" className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container">
        <h2 className="display-font text-4xl font-bold text-white mb-4 text-center">Contribution Perks</h2>
        <p className="text-center text-[#F0F4FF]/70 mb-12 max-w-2xl mx-auto">
          Every contribution level includes transparent access to development progress and project updates.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERK_TIERS.map((tier) => (
            <div
              key={tier.amount}
              className={`rounded-lg border transition-all p-6 flex flex-col ${
                tier.highlight
                  ? "bg-gradient-to-br from-[#00D4FF]/20 to-[#050D1A] border-[#00D4FF]/60 shadow-lg shadow-[#00D4FF]/20 scale-105"
                  : "bg-[#050D1A] border-[#00D4FF]/20 hover:border-[#00D4FF]/40"
              }`}
            >
              <div className="mb-4">
                <div className="text-3xl font-bold text-[#00D4FF] mb-2">${tier.amount}</div>
                <h3 className="text-lg font-bold text-white">{tier.title}</h3>
              </div>
              <p className="text-sm text-[#F0F4FF]/70 mb-6 flex-grow">{tier.description}</p>
              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="text-xs text-[#F0F4FF]/60 flex items-start gap-2">
                    <span className="text-[#00D4FF] mt-1">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#perks"
                className={`w-full py-2 rounded-lg font-semibold text-center transition-all ${
                  tier.highlight
                    ? "bg-[#00D4FF] text-[#050D1A] hover:bg-[#00D4FF]/90 hover:shadow-lg hover:shadow-[#00D4FF]/50"
                    : "border border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10"
                }`}
              >
                Claim Perk
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureApplicationsSection() {
  return (
    <section className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Future Applications</h2>

        <p className="text-[#F0F4FF]/80 leading-relaxed">
          While this campaign is focused on the autonomous prototype stage, the longer-term commercial pathway for Aurora includes civilian autonomous applications such as industrial inspection, monitoring, infrastructure support, and cargo or delivery vehicle roles. The current prototype stage is about proving the engineering foundation required for those future applications.
        </p>
      </div>
    </section>
  );
}

function RisksSection() {
  return (
    <section className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Risks & Transparency</h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <AlertTriangle className="text-[#00D4FF] flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">Hardware Integration Risk</h3>
              <p className="text-[#F0F4FF]/70 text-sm">
                Translating software control logic into physical hardware introduces integration challenges. We mitigate this through structured test rigs and incremental validation before full prototype assembly.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <AlertTriangle className="text-[#00D4FF] flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">Supply Chain & Procurement</h3>
              <p className="text-[#F0F4FF]/70 text-sm">
                Component availability and lead times can impact timeline. We maintain supplier relationships and alternative component strategies to minimize delays.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <AlertTriangle className="text-[#00D4FF] flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">Technical Unknowns</h3>
              <p className="text-[#F0F4FF]/70 text-sm">
                Ring-based VTOL control in hardware is novel. We expect iteration and learning during the prototype phase. Transparent reporting of results — positive and negative — is built into the project plan.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <AlertTriangle className="text-[#00D4FF] flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">Regulatory & Safety</h3>
              <p className="text-[#F0F4FF]/70 text-sm">
                All testing will follow applicable local regulations and safety protocols. This is a research prototype program, not a commercial aircraft development. No manned testing is in scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 bg-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <h2 className="display-font text-4xl font-bold text-white mb-12">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#00D4FF]/20 rounded-lg overflow-hidden bg-[#0A1628] hover:border-[#00D4FF]/40 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#00D4FF]/5 transition-colors"
              >
                <span className="font-semibold text-white text-left">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#00D4FF] flex-shrink-0 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 bg-[#050D1A] border-t border-[#00D4FF]/10 text-[#F0F4FF]/80 text-sm leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubProofSection() {
  return (
    <section className="py-20 bg-[#0A1628] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl">
        <div className="mb-2 inline-block">
          <span className="text-xs font-mono tracking-widest uppercase text-[#00D4FF]">For Backers and Reviewers</span>
        </div>
        <h2 className="display-font text-4xl font-bold text-white mb-8">The Repo Is the Proof</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-4">What's in the Public Repository</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Control-stack source code</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Maneuver logic & validation</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>ArduPilot integration</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Mission Planner workflows</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Sample traces & logs</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Architecture documentation</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Topology & ICD specs</span>
                </div>
                <div className="flex items-center gap-2 text-[#F0F4FF]/80">
                  <CheckCircle size={16} className="text-[#00D4FF]" />
                  <span>Campaign-safe diagrams</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#00D4FF] mb-4">What Stays Private</h3>
            <p className="text-[#F0F4FF]/70 text-sm leading-relaxed mb-4">
              As the project moves into physical prototyping and commercialization, the following materials will remain private to protect supplier relationships and manufacturing strategy:
            </p>
            <ul className="space-y-2 text-sm text-[#F0F4FF]/70">
              <li>• Supplier quotes and procurement details</li>
              <li>• Detailed BOM costs and sourcing strategies</li>
              <li>• Final CAD, STEP files, and production drawings</li>
              <li>• Manufacturing conversations and vendor relationships</li>
              <li>• Investor-only planning and commercialization roadmaps</li>
            </ul>
          </div>

          <div className="bg-[#050D1A] border border-[#00D4FF]/20 rounded-lg p-6">
            <p className="text-[#F0F4FF]/80 text-sm leading-relaxed mb-4">
              <span className="font-semibold text-[#00D4FF]">Repository Scope Statement:</span> Aurora's current software-first prototype is public. Future private implementation details will remain private.
            </p>
            <p className="text-[#F0F4FF]/70 text-xs">
              The current Aurora control-stack and research platform are public to demonstrate real progress and invite technical scrutiny. Future private implementation details such as supplier-sensitive, manufacturing, and commercialization-specific materials will remain non-public.
            </p>
          </div>

          <a
            href="https://github.com/gabrielnkuna/aurora-vtol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D4FF] text-[#050D1A] font-bold rounded-lg hover:bg-[#00D4FF]/90 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/50"
          >
            <Github size={18} />
            View Aurora Control Stack on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0A1628] to-[#050D1A] border-t border-[#00D4FF]/20">
      <div className="container max-w-3xl text-center">
        <h2 className="display-font text-4xl font-bold text-white mb-6">Ready to Support Aurora?</h2>
        <p className="text-lg text-[#F0F4FF]/80 mb-8">
          Contribute to the next phase of autonomous VTOL development. Every contribution funds real engineering progress.
        </p>
        <a
          href="#perks"
          className="inline-block px-8 py-4 bg-[#00D4FF] text-[#050D1A] font-bold rounded-lg hover:bg-[#00D4FF]/90 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/50"
        >
          Contribute Now
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050D1A] border-t border-[#00D4FF]/20 py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">Project Aurora</h4>
            <p className="text-sm text-[#F0F4FF]/70">
              Software-first VTOL research and prototyping program.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-[#F0F4FF]/70">
              <li>
                <a href="https://github.com/gabrielnkuna/aurora-vtol" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4FF] transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://bronbergdynamics.co.za/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D4FF] transition-colors">
                  Bronberg Dynamics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Campaign</h4>
            <p className="text-sm text-[#F0F4FF]/70">
              Autonomous prototype development funded through Indiegogo Flexible Funding.
            </p>
          </div>
        </div>
        <div className="border-t border-[#00D4FF]/20 pt-8 text-center text-sm text-[#F0F4FF]/60">
          <p>© 2026 Project Aurora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-[#F0F4FF]">
      <Nav />
      <HeroSection />
      <PrototypeVideoSection />
      <CampaignStatsSection />
      <StorySection />
      <PrototypeSection />
      <ImplementationPathSection />
      <MotionSection />
      <IndustrialDevelopmentSection />
      <ContributionsUnlockSection />
      <RoadmapSection />
      <BudgetSection />
      <PerksSection />
      <FutureApplicationsSection />
      <RisksSection />
      <FAQSection />
      <GitHubProofSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
