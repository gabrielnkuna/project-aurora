/* ============================================================
   AURORA VTOL — INDIEGOGO CAMPAIGN PAGE
   Design: Deep Space Mission Control
   v3 — Indiegogo Flexible Funding:
   - Platform: Indiegogo (Flexible Funding)
   - "Rewards" → "Perks"
   - "Back This Project" → "Contribute Now"
   - "Backers" kept (same on Indiegogo)
   - Added Flexible Funding explanation banner in perks section
   - Added Flexible Funding note under progress bar
   - Updated funding model language throughout
   - CTA buttons updated to Indiegogo framing
   - Nav "Rewards" → "Perks", section id="perks"
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
    a: "Not for this campaign. Aurora is being designed with a future two-occupant architecture in mind, but this campaign funds autonomous prototype development only. No manned flight testing is part of this campaign scope.",
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Aurora VTOL ring vehicle concept"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/40 via-[#050D1A]/20 to-[#050D1A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/60 via-transparent to-[#050D1A]/60" />
      </div>

      {/* Star field overlay */}
      <div className="absolute inset-0 star-field opacity-40" />

      {/* Content */}
      <div className="relative z-10 container text-center pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF] text-xs mono tracking-widest mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          SOFTWARE ENGINEERING FIRST
        </div>

        <h1
          className="display-font text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s", textShadow: "0 0 60px rgba(0,212,255,0.2)" }}
        >
          PROJECT
          <br />
          <span className="text-[#00D4FF] aurora-glow-text">AURORA</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-[#F0F4FF]/80 max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Autonomous VTOL, Engineered from Software Up
        </p>

        <p
          className="text-base text-[#F0F4FF]/60 max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          A software-first autonomous VTOL program that built and validated the control
          stack before physical prototyping — now raising funds to build the physical path forward.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#perks"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00D4FF] text-[#050D1A] font-semibold rounded-sm hover:bg-[#00D4FF]/90 transition-all aurora-glow text-sm tracking-wide uppercase"
          >
            Contribute Now
            <ArrowRight size={16} />
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#00D4FF]/40 text-[#F0F4FF]/80 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all rounded-sm text-sm tracking-wide uppercase"
          >
            Learn More
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-1 text-[#F0F4FF]/40 text-xs mono animate-bounce">
          <ChevronDown size={14} />
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/** Prominent video placeholder — replace with real demo when ready */
function PrototypeVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 bg-[#050D1A]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-3 uppercase text-center">
            Prototype Demo
          </div>
          <h2 className="display-font text-3xl sm:text-4xl font-bold text-white text-center mb-2">
            See the Control Stack in Action
          </h2>
          <p className="text-[#F0F4FF]/50 text-sm text-center mb-8">
            Aurora CLI → trace generated → Mission Planner path replay → metrics
          </p>

          {/* Video placeholder — swap the div below for a real <video> or YouTube embed */}
          <div
            className="relative w-full rounded-sm aurora-border overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
            onClick={() => setPlaying(true)}
          >
            <img
              src={SOFTWARE_VIZ_IMAGE}
              alt="Aurora software workflow preview"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-[#050D1A]/50 flex flex-col items-center justify-center gap-4">
              {!playing ? (
                <>
                  <div className="w-20 h-20 rounded-full border-2 border-[#00D4FF] flex items-center justify-center aurora-glow group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-[#00D4FF] ml-1" />
                  </div>
                  <div className="aurora-card rounded-sm px-4 py-2 text-center">
                    <div className="mono text-[#00D4FF] text-xs tracking-wide">VIDEO COMING SOON</div>
                    <div className="text-[#F0F4FF]/50 text-xs mt-1">
                      Demo of the live software workflow will be added here before launch
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-[#F0F4FF]/60 text-sm mono">
                  [Video will play here once uploaded]
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-[#F0F4FF]/30 mono text-center mt-3">
            The real software prototype — not concept art. Control stack, maneuver generation, and Mission Planner replay.
          </p>
        </div>
      </div>
    </section>
  );
}

function CampaignStats() {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const raised = useCountUp(AMOUNT_RAISED, isVisible);
  const backers = useCountUp(BACKERS, isVisible);
  const pct = FUNDING_GOAL > 0 ? Math.round((AMOUNT_RAISED / FUNDING_GOAL) * 100) : 0;

  return (
    <section ref={ref} className="py-12 border-y border-[#00D4FF]/15 bg-[#0A1628]/80 backdrop-blur-sm">
      <div className="container">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {[
            {
              value: AMOUNT_RAISED > 0 ? `$${raised.toLocaleString()}` : "$0",
              label: "Raised of $85,000 goal",
            },
            {
              value: BACKERS > 0 ? backers.toLocaleString() : "0",
              label: "Contributors",
            },
            {
              value: DAYS_LEFT.toString(),
              label: "Days to go",
            },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="display-font text-3xl sm:text-4xl font-bold text-[#00D4FF] aurora-glow-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[#F0F4FF]/50 mono tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-[#F0F4FF]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] rounded-full aurora-glow"
              style={{
                width: isVisible ? `${Math.max(pct, 0.5)}%` : "0%",
                transition: "width 2s ease-out",
                minWidth: pct === 0 ? "0%" : undefined,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs mono text-[#F0F4FF]/40">
            <span>{pct}% funded</span>
            <span>Goal: $85,000</span>
          </div>
        </div>

        {/* Flexible Funding note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#F0F4FF]/40 mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/60" />
          Indiegogo Flexible Funding — every contribution counts, regardless of goal
        </div>

        <div className="mt-5 text-center">
          <a
            href="#perks"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00D4FF] text-[#050D1A] font-semibold rounded-sm hover:bg-[#00D4FF]/90 transition-all aurora-glow text-sm tracking-wide uppercase"
          >
            Contribute Now
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
              The Problem
            </div>
            <h2 className="display-font text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Most VTOL programs start by committing to hardware too early.
            </h2>
            <div className="space-y-4 text-[#F0F4FF]/70 leading-relaxed">
              <p>
                Ambitious aircraft concepts usually fail when mechanical, control, and integration
                risks are discovered too late — after expensive fabrication has already begun. The
                hardware becomes a trap: slow to change, costly to iterate, and unforgiving of
                assumptions that were never tested.
              </p>
              <p>
                Aurora starts differently. We began with the control stack: maneuver logic,
                allocation studies, trace-based validation, and integration with ArduPilot and
                Mission Planner. That lets us stress the concept before committing to major
                hardware cost.
              </p>
              <p>
                Aurora is also different in shape and motion philosophy. Rather than following a
                typical wing-plus-rotor layout, Aurora explores a{" "}
                <strong className="text-[#F0F4FF]">ring-based vehicle architecture</strong> with
                distributed control — a platform to study a different class of maneuvers and
                control behavior.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src={SOFTWARE_VIZ_IMAGE}
              alt="Aurora software control stack visualization"
              className="w-full rounded-sm aurora-border"
            />
            <div className="absolute -bottom-4 -right-4 aurora-card rounded-sm p-4 max-w-xs">
              <div className="mono text-[#00D4FF] text-xs mb-2 tracking-wide">
                CONTROL STACK STATUS
              </div>
              {[
                "Maneuver generation",
                "Allocator studies",
                "ArduPilot integration",
                "Mission Planner replay",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-[#F0F4FF]/80 py-1"
                >
                  <CheckCircle size={12} className="text-[#00D4FF] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrototypeSection() {
  return (
    <section id="prototype" className="py-24 bg-[#0A1628]/50">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="text-center mb-16">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
            What Exists Today
          </div>
          <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
            The Working Prototype
          </h2>
          <p className="text-[#F0F4FF]/60 max-w-2xl mx-auto">
            What you see today is the live prototype: software-generated maneuvers replayed and
            inspected through ArduPilot and Mission Planner workflows. Project Aurora's current
            working prototype is the software-first VTOL control and validation stack — a real
            engineering platform, not a concept sketch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 lg:order-1">
            <img
              src={RING_DIAGRAM_IMAGE}
              alt="16-fan ring VTOL architecture diagram"
              className="w-full rounded-sm aurora-border"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="display-font text-3xl font-bold text-white mb-3">
              16 Fans. 32 Vanes. One Ring.
            </h3>
            <p className="text-sm text-[#00D4FF]/80 mono mb-5">
              This topology is currently modeled in software and used for allocation, fault, and
              maneuver studies.
            </p>
            <p className="text-[#F0F4FF]/70 leading-relaxed mb-6">
              Aurora is built around a ring-based control architecture with 16 distributed fan
              units and 32 vane actuators. The software stack models this topology explicitly —
              allowing us to study how force and moment can be distributed across the ring under
              normal operation, actuator faults, and degraded conditions.
            </p>

            <div className="space-y-3">
              {[
                {
                  label: "Fan units",
                  value: "16",
                  desc: "Distributed around the ring perimeter",
                },
                {
                  label: "Vane actuators",
                  value: "32",
                  desc: "Two per fan unit for directional control",
                },
                {
                  label: "Control layers",
                  value: "6",
                  desc: "From guidance to trace export",
                },
                {
                  label: "Maneuver modes",
                  value: "8+",
                  desc: "Including repel, snap-stop, redirect",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 aurora-card rounded-sm p-3"
                >
                  <div className="display-font text-2xl font-bold text-[#00D4FF] w-12 text-center aurora-glow-text">
                    {item.value}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#F0F4FF]">{item.label}</div>
                    <div className="text-xs text-[#F0F4FF]/50">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What it proves / doesn't prove */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aurora-card rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={18} className="text-[#00D4FF]" />
              <h3 className="display-font text-xl font-bold text-white">
                What the prototype proves now
              </h3>
            </div>
            <div className="space-y-2">
              {[
                "A structured control-stack architecture",
                "Maneuver generation and replay",
                "Software-first validation workflows",
                "Integration with ArduPilot",
                "Mission Planner visualization and testing",
                "A credible path from simulation into hardware engineering",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#F0F4FF]/70"
                >
                  <span className="text-[#00D4FF] mt-0.5 shrink-0">—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="aurora-card rounded-sm p-6 border-[#F0F4FF]/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-amber-400" />
              <h3 className="display-font text-xl font-bold text-white">
                What it does not prove yet
              </h3>
            </div>
            <p className="text-sm text-[#F0F4FF]/60 mb-4">
              We are being fully transparent. The current prototype is not yet:
            </p>
            <div className="space-y-2">
              {[
                "A completed airframe",
                "A finished autonomous aircraft",
                "A certified system",
                "A passenger-capable vehicle",
                "A manned flight prototype",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#F0F4FF]/50"
                >
                  <span className="text-amber-400/60 mt-0.5 shrink-0">—</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#F0F4FF]/40 mt-4 italic">
              Those are future stages. This campaign funds the transition from software prototype
              to physical autonomous prototype.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovementSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="text-center mb-16">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
            What Makes Aurora Different
          </div>
          <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
            A Different Class of Motion
          </h2>
          <p className="text-[#F0F4FF]/60 max-w-2xl mx-auto">
            Aurora is not being designed as a conventional VTOL. It explores a ring-based
            architecture intended to study more decoupled motion, stronger lateral maneuvering,
            and unique redirect, braking, and repel behaviors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Decoupled Motion",
              desc: "Move laterally while maintaining heading — studying whether translation and yaw can be managed more independently than conventional VTOL designs allow.",
              icon: "↔",
            },
            {
              title: "Redirect Behavior",
              desc: "Redirect quickly without large, slow transitions. The ring architecture is designed to study faster heading changes under controlled conditions.",
              icon: "↺",
            },
            {
              title: "Snap-Stop Braking",
              desc: "Brake aggressively in a controlled way — one of the core maneuver modes under active study in the software platform.",
              icon: "⬛",
            },
            {
              title: "Repel Response",
              desc: "Back away from obstacles while preserving nose direction — a safety-oriented maneuver behavior being studied through the allocator and simulation workflows.",
              icon: "⊘",
            },
            {
              title: "Fault-Aware Control",
              desc: "The allocator is designed to study degraded operation under actuator faults, dead fan groups, and reduced plenum effectiveness — before hardware exists.",
              icon: "⚡",
            },
            {
              title: "Power-Aware Planning",
              desc: "Battery, burst-power, and thermal constraints are modeled in simulation — so maneuver feasibility can be studied against real power limits.",
              icon: "⚙",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="aurora-card rounded-sm p-6 hover:border-[#00D4FF]/30 transition-colors group"
            >
              <div className="text-3xl mb-4 text-[#00D4FF]">{item.icon}</div>
              <h3 className="display-font text-xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#F0F4FF]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 aurora-card rounded-sm p-6 border-[#00D4FF]/20">
          <p className="text-[#F0F4FF]/70 text-sm leading-relaxed italic text-center max-w-3xl mx-auto">
            "We are not claiming those behaviors are fully proven in flight hardware yet. What we
            are saying is that the software platform already exists to study, validate, and
            de-risk them before committing to expensive prototype iterations."
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatFundingUnlocks() {
  return (
    <section className="py-24 bg-[#0A1628]/50">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
              What Contributions Unlock
            </div>
            <h2 className="display-font text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              From Software Research to Physical Engineering
            </h2>
            <p className="text-[#F0F4FF]/70 leading-relaxed mb-8">
              Your contribution will fund the transition from software research into physical
              engineering. The primary goal is an autonomous prototype stage — not a passenger
              aircraft, not manned testing, but a disciplined engineering program that de-risks
              the physical implementation.
            </p>

            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Mechanical CAD & Airframe Concept",
                  desc: "Airframe, ring, internal packaging, actuator placement, maintenance access, and structural concept needed for a real prototype path.",
                },
                {
                  num: "02",
                  title: "Propulsion & Actuator Architecture",
                  desc: "Propulsion layout, actuation approach, mounting architecture, and subsystem interfaces required for a real autonomous demonstrator.",
                },
                {
                  num: "03",
                  title: "BOMs & Supplier-Ready Engineering Packages",
                  desc: "Bill of materials, component candidates, sourcing options, and prototype manufacturing packages.",
                },
                {
                  num: "04",
                  title: "Prototype Electronics & Control Integration",
                  desc: "Autopilot integration, power distribution, sensors, computing, wiring, communication, and system harnessing.",
                },
                {
                  num: "05",
                  title: "Test Rigs & Subsystem Validation",
                  desc: "Bench-test setups, subsystem test rigs, and controlled validation equipment to reduce risk before full integrated testing.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-4">
                  <div className="display-font text-2xl font-bold text-[#00D4FF]/40 w-10 shrink-0 aurora-glow-text">
                    {item.num}
                  </div>
                  <div>
                    <div className="font-semibold text-[#F0F4FF] mb-1">{item.title}</div>
                    <div className="text-sm text-[#F0F4FF]/60 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={LAB_IMAGE}
              alt="Aurora engineering laboratory"
              className="w-full rounded-sm aurora-border"
            />
            <div className="absolute top-4 left-4 aurora-card rounded-sm px-3 py-2">
              <div className="mono text-[#00D4FF] text-xs tracking-wide">CAMPAIGN SCOPE</div>
              <div className="text-xs text-[#F0F4FF]/60 mt-1">Autonomous prototype only</div>
              <div className="text-xs text-[#F0F4FF]/40">No manned testing in this campaign</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="text-center mb-16">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
            Campaign Roadmap
          </div>
          <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
            Four Phases to Autonomous Prototype
          </h2>
          <p className="text-[#F0F4FF]/60 max-w-xl mx-auto">
            Flexible Funding means every contribution counts. Phases 1 and 2 are the primary
            goal at $85,000. Phases 3 and 4 unlock as contributions grow beyond that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_PHASES.map((phase, i) => (
            <div
              key={phase.phase}
              className={`aurora-card rounded-sm p-6 relative flex flex-col ${
                phase.status === "funded"
                  ? "border-[#00D4FF]/30"
                  : "border-[#F0F4FF]/10"
              }`}
            >
              <div
                className={`mono text-xs tracking-widest mb-1 ${
                  phase.status === "funded" ? "text-[#00D4FF]" : "text-[#F0F4FF]/40"
                }`}
              >
                {phase.phase} · {phase.status === "funded" ? "PRIMARY GOAL" : "STRETCH"}
              </div>
              <h3 className="display-font text-xl font-bold text-white mb-4">
                {phase.title}
              </h3>
              <div className="space-y-2 flex-1">
                {phase.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs text-[#F0F4FF]/60"
                  >
                    <span
                      className={`mt-0.5 shrink-0 ${
                        phase.status === "funded"
                          ? "text-[#00D4FF]"
                          : "text-[#F0F4FF]/30"
                      }`}
                    >
                      —
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              {/* Deliverable output */}
              <div
                className={`mt-4 pt-4 border-t text-xs mono leading-relaxed ${
                  phase.status === "funded"
                    ? "border-[#00D4FF]/20 text-[#00D4FF]/70"
                    : "border-[#F0F4FF]/10 text-[#F0F4FF]/30"
                }`}
              >
                {phase.output}
              </div>

              {/* Phase connector line */}
              {i < ROADMAP_PHASES.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-[#00D4FF]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BudgetSection() {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  return (
    <section className="py-24 bg-[#0A1628]/50">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="text-center mb-16">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
            Budget Breakdown
          </div>
          <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
            Where the Contributions Go
          </h2>
          <p className="text-[#F0F4FF]/60 max-w-xl mx-auto">
            All contributions go directly toward engineering deliverables, prototype development,
            testing, and project execution — with documentation and communication included as
            first-class project costs. Flexible Funding means contributions are put to work
            immediately as they arrive.
          </p>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto space-y-4">
          {BUDGET_ITEMS.map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-[#F0F4FF]/80">{item.label}</span>
                <span className="mono text-sm font-medium text-[#00D4FF]">{item.pct}%</span>
              </div>
              <div className="h-2 bg-[#F0F4FF]/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all ease-out"
                  style={{
                    width: isVisible ? `${item.pct}%` : "0%",
                    backgroundColor: item.color,
                    transition: `width 1.2s ease-out ${i * 0.15}s`,
                    boxShadow: `0 0 8px ${item.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerksSection() {
  return (
    <section id="perks" className="py-24">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="text-center mb-12">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
            Perks
          </div>
          <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
            Contribute to Project Aurora
          </h2>
          <p className="text-[#F0F4FF]/60 max-w-xl mx-auto">
            Choose your level of involvement. All contributors receive transparent engineering
            updates as the project advances.
          </p>

          {/* Flexible Funding explanation */}
          <div className="mt-6 inline-flex items-start gap-3 aurora-card rounded-sm px-5 py-3 max-w-xl text-left">
            <span className="text-[#00D4FF] text-lg mt-0.5">ⓘ</span>
            <div>
              <div className="mono text-[#00D4FF] text-xs tracking-wide mb-1">FLEXIBLE FUNDING</div>
              <p className="text-xs text-[#F0F4FF]/60 leading-relaxed">
                This campaign uses Indiegogo Flexible Funding — every contribution goes directly
                toward the project regardless of whether the goal is reached. Phases 1 &amp; 2 are
                funded at $85,000. Every dollar raised beyond that accelerates Phases 3 and 4.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERK_TIERS.map((tier) => (
            <div
              key={tier.amount}
              className={`aurora-card rounded-sm p-6 flex flex-col relative ${
                tier.highlight
                  ? "border-[#00D4FF]/50 aurora-glow"
                  : "hover:border-[#00D4FF]/25 transition-colors"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00D4FF] text-[#050D1A] text-xs font-bold mono tracking-wide rounded-sm">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-4">
                <div className="display-font text-3xl font-bold text-[#00D4FF] aurora-glow-text mb-1">
                  ${tier.amount.toLocaleString()}
                  {tier.amount >= 1000 && <span className="text-lg">+</span>}
                </div>
                <div className="display-font text-xl font-bold text-white">{tier.title}</div>
              </div>

              <p className="text-sm text-[#F0F4FF]/60 leading-relaxed mb-4 flex-1">
                {tier.description}
              </p>

              <div className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <div
                    key={perk}
                    className="flex items-start gap-2 text-xs text-[#F0F4FF]/70"
                  >
                    <CheckCircle size={12} className="text-[#00D4FF] shrink-0 mt-0.5" />
                    {perk}
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 text-sm font-semibold tracking-wide uppercase rounded-sm transition-all ${
                  tier.highlight
                    ? "bg-[#00D4FF] text-[#050D1A] hover:bg-[#00D4FF]/90 aurora-glow"
                    : "border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10"
                }`}
              >
                Claim Perk — ${tier.amount.toLocaleString()}
                {tier.amount >= 1000 ? "+" : ""}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RisksSection() {
  return (
    <section className="py-24 bg-[#0A1628]/50">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
              Risks & Transparency
            </div>
            <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
              We Are Not Hiding the Risks
            </h2>
            <p className="text-[#F0F4FF]/60">
              Aurora is ambitious, and the risks are real. Here is our honest assessment.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                risk: "Mechanical packaging complexity",
                mitigation:
                  "The software-first approach means we understand the control requirements before committing to packaging decisions. CAD work will be iterative and documented.",
              },
              {
                risk: "Actuator and propulsion integration",
                mitigation:
                  "Subsystem definition work in Phase 2 will identify integration risks early, before hardware procurement begins.",
              },
              {
                risk: "Longer-than-expected validation cycles",
                mitigation:
                  "Timelines are estimates. We will communicate honestly if they shift, and contributors will receive transparent updates at every milestone.",
              },
              {
                risk: "Scope changes based on engineering findings",
                mitigation:
                  "Engineering reality may require adjustments to the plan. We will document and explain any changes as they arise.",
              },
            ].map((item) => (
              <div key={item.risk} className="aurora-card rounded-sm p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#F0F4FF] mb-1">{item.risk}</div>
                    <div className="text-sm text-[#F0F4FF]/60 leading-relaxed">
                      {item.mitigation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 aurora-card rounded-sm p-6 border-[#00D4FF]/20">
            <p className="text-[#F0F4FF]/70 text-sm leading-relaxed">
              That is exactly why Aurora started with software engineering first. We chose this
              path to reduce uncertainty before expensive hardware commitments. Contributors will
              get transparent milestone reporting, honest explanations of tradeoffs, and clear
              updates if timelines shift.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">FAQ</div>
            <h2 className="display-font text-4xl sm:text-5xl font-bold text-white">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="aurora-card rounded-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#00D4FF]/5 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={16} className="text-[#00D4FF] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#F0F4FF] text-sm">{item.q}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#00D4FF] shrink-0 ml-4 transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-7 text-sm text-[#F0F4FF]/60 leading-relaxed border-l border-[#00D4FF]/20 ml-2">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GitHubSection() {
  return (
    <section className="py-24 bg-[#0A1628]/50">
      <div className="container">
        <div className="aurora-section-divider mb-16" />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#00D4FF] text-xs tracking-widest mb-4 uppercase">
              For Backers and Reviewers
            </div>
            <h2 className="display-font text-4xl sm:text-5xl font-bold text-white mb-4">
              The Repo Is the Proof
            </h2>
            <p className="text-[#F0F4FF]/60 max-w-2xl mx-auto leading-relaxed">
              Aurora's current software-first control platform is fully public. The repository
              is not a pitch deck — it is a working engineering platform you can read, run,
              and scrutinize.
            </p>
          </div>

          {/* What the public repo contains */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="aurora-card rounded-sm p-6 border-[#00D4FF]/30">
              <div className="flex items-center gap-2 mb-5">
                <Github size={16} className="text-[#00D4FF]" />
                <div className="mono text-[#00D4FF] text-xs tracking-wide uppercase">Public Repository</div>
              </div>
              <div className="space-y-2">
                {[
                  "src/aurora_vtol/ — full control-stack source",
                  "tests/ — validation test suite",
                  "docs/architecture.md",
                  "docs/icd.md — interface control document",
                  "docs/topology.md — ring architecture model",
                  "docs/command_reference.md",
                  "Sample traces and replay data",
                  "Mission Planner screenshots",
                  "Campaign-safe architecture diagrams",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#F0F4FF]/70">
                    <CheckCircle size={11} className="text-[#00D4FF] shrink-0 mt-0.5" />
                    <span className="mono">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="aurora-card rounded-sm p-6 border-[#F0F4FF]/10">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle size={16} className="text-amber-400" />
                <div className="mono text-amber-400/80 text-xs tracking-wide uppercase">Kept Private (when it exists)</div>
              </div>
              <p className="text-xs text-[#F0F4FF]/50 leading-relaxed mb-4">
                As the project moves into physical prototyping, the following will remain
                non-public:
              </p>
              <div className="space-y-2">
                {[
                  "Supplier quotes and negotiations",
                  "Exact BOM costs and procurement data",
                  "Final CAD / STEP / production drawings",
                  "Manufacturing conversations",
                  "Detailed hardware packaging files",
                  "Investor-only planning documents",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#F0F4FF]/40">
                    <span className="text-amber-400/50 shrink-0 mt-0.5">—</span>
                    <span className="mono">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transparency statement */}
          <div className="aurora-card rounded-sm p-6 border-[#00D4FF]/20 mb-8">
            <div className="mono text-[#00D4FF] text-xs tracking-wide mb-3 uppercase">Repository Scope Statement</div>
            <p className="text-sm text-[#F0F4FF]/70 leading-relaxed mb-3">
              This repository contains the current public Aurora software-first research platform,
              including control-stack workflows, validation tools, and integration examples. It does
              not imply that all future implementation details will be public. As the project moves
              into physical prototyping, supplier-sensitive, manufacturing-sensitive, and
              commercialization-specific materials may be kept private.
            </p>
            <p className="text-sm text-[#F0F4FF]/50 leading-relaxed italic">
              Aurora's current software-first prototype is public. Future private implementation
              details will remain private.
            </p>
          </div>

          {/* README callouts */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                label: "Research & Validation Platform",
                desc: "This is a research and validation platform — not production flight code and not certified avionics.",
              },
              {
                label: "Autonomous Prototype Stage",
                desc: "Physical implementation details are still in progress. No manned testing is part of this campaign.",
              },
              {
                label: "Open to Scrutiny",
                desc: "The public repo is open specifically to invite technical scrutiny and demonstrate real progress.",
              },
            ].map((item) => (
              <div key={item.label} className="aurora-card rounded-sm p-4">
                <div className="mono text-[#00D4FF] text-xs tracking-wide mb-2">{item.label}</div>
                <p className="text-xs text-[#F0F4FF]/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://github.com/gabrielnkuna/aurora-vtol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#00D4FF]/40 text-[#F0F4FF]/80 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all rounded-sm text-sm tracking-wide uppercase"
            >
              <Github size={16} />
              View the Public Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/5 to-transparent" />
      <div className="absolute inset-0 star-field opacity-30" />

      <div className="container relative z-10 text-center">
        <div className="aurora-section-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          <div className="mono text-[#00D4FF] text-xs tracking-widest mb-6 uppercase">
            Join the Mission
          </div>
          <h2 className="display-font text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6">
            Project Aurora is not asking you to fund a fantasy.
          </h2>
          <p className="text-xl text-[#F0F4FF]/70 leading-relaxed mb-4">
            It is asking you to back the next disciplined step in an engineering program.
          </p>
          <p className="text-[#F0F4FF]/50 leading-relaxed mb-12">
            From software-proven control and validation, to real mechanical design, to subsystem
            implementation, to autonomous prototype testing. We have built the software-first
            foundation. Now we want to build the physical path forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#perks"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#00D4FF] text-[#050D1A] font-bold rounded-sm hover:bg-[#00D4FF]/90 transition-all aurora-glow text-sm tracking-widest uppercase"
            >
              Contribute to Aurora
              <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/gabrielnkuna/aurora-vtol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 border border-[#00D4FF]/40 text-[#F0F4FF]/70 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all rounded-sm text-sm tracking-widest uppercase"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>

          <div className="aurora-card rounded-sm p-6 max-w-lg mx-auto">
            <div className="mono text-[#00D4FF] text-xs tracking-wide mb-3 uppercase">
              Current Status — Indiegogo Campaign
            </div>
            <div className="mono text-xs text-[#F0F4FF]/50 space-y-1">
              <div className="flex justify-between">
                <span>Control stack</span>
                <span className="text-[#00D4FF]">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>ArduPilot integration</span>
                <span className="text-[#00D4FF]">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>Mission Planner replay</span>
                <span className="text-[#00D4FF]">✓ Complete</span>
              </div>
              <div className="flex justify-between">
                <span>Mechanical CAD</span>
                <span className="text-amber-400">⟳ Pending funding</span>
              </div>
              <div className="flex justify-between">
                <span>Physical prototype</span>
                <span className="text-amber-400">⟳ Pending funding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#00D4FF]/10 py-8 bg-[#050D1A]">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border border-[#00D4FF]/60 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00D4FF]/60" />
          </div>
          <span className="display-font text-sm font-bold tracking-widest text-[#F0F4FF]/60 uppercase">
            Project Aurora
          </span>
        </div>
        <div className="text-xs text-[#F0F4FF]/30 mono text-center">
          Indiegogo Flexible Funding · Software Engineering First · Autonomous Prototype Stage
        </div>
        <a
          href="https://github.com/gabrielnkuna/aurora-vtol"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[#F0F4FF]/40 hover:text-[#00D4FF] transition-colors"
        >
          <Github size={14} />
          gabrielnkuna/aurora-vtol
        </a>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-[#F0F4FF]">
      <Nav />
      <HeroSection />
      <PrototypeVideoSection />
      <CampaignStats />
      <StorySection />
      <PrototypeSection />
      <MovementSection />
      <WhatFundingUnlocks />
      <RoadmapSection />
      <BudgetSection />
      <PerksSection />
      <RisksSection />
      <FAQSection />
      <GitHubSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
