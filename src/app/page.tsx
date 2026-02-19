"use client";

import { LayoutWrapper } from "@/components/layout-wrapper";
import { MoveRight, Languages, Code, Brain, PenTool, Lock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { IntegratedBookMarquee } from "@/components/home/book-marquee";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <LayoutWrapper>
        {/* 1. Opening Hook - Philosophical Line */}
        <section className="min-h-[60vh] flex flex-col justify-center items-start space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight leading-[1.2]">
              "The destination is merely an excuse <br />
              <span className="italic text-muted-foreground">to justify the journey.</span>"
            </h1>
            <p className="max-w-xl text-lg text-muted/80 leading-relaxed font-light">
              An obsession with the process over the outcome. Where the act of writing outweighs the finished book, and the silence between words speaks louder than the sentence itself.
            </p>
          </motion.div>
        </section>

        {/* 2. About / Cognitive Profile */}
        <section className="py-20 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-2">
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted">Cognitive Profile</h2>
              <p className="text-xl md:text-2xl font-serif">The Architect</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Languages className="w-5 h-5" />
                  <span className="font-semibold">Multilingual Mind</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Thinking across English, French, German, and Japanese. Each language offers a different lens for logic and emotion.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Code className="w-5 h-5" />
                  <span className="font-semibold">Code-Literate Writer</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Bridging the gap between syntax and semantics. Structured logic meets chaotic creativity.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Brain className="w-5 h-5" />
                  <span className="font-semibold">NEET UG Aspirant</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  A discipline rooted in biology and systems. Understanding the mechanism of life to write about living it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Active Works Dashboard */}
        <section className="py-20 border-t border-border/40 space-y-12">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Active Works</h2>
            <span className="text-[10px] md:text-xs font-mono text-muted border border-border px-2 py-1 rounded">LIVE DASHBOARD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-muted/5 p-6 md:p-8 rounded-xl border border-border space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Daily Schedule</span>
                  <h3 className="text-2xl font-serif mt-1">Mother</h3>
                </div>
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress today</span>
                  <span className="font-mono">800 / 800 words</span>
                </div>
                <div className="h-1 w-full bg-muted/20 rounded-full overflow-hidden">
                  <div className="h-full bg-foreground w-full transition-all duration-1000 ease-out" />
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                A granular look at maternal bonds. Written daily to capture the mundane evolution of love.
              </p>
            </div>

            {/* Project 2 */}
            <div className="bg-muted/5 p-6 md:p-8 rounded-xl border border-border space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">M / W / F</span>
                  <h3 className="text-2xl font-serif mt-1">Love</h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span className="font-mono">1200 / 2400 words</span>
                </div>
                <div className="h-1 w-full bg-muted/20 rounded-full overflow-hidden">
                  <div className="h-full bg-foreground w-[50%] transition-all duration-1000 ease-out" />
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Exploring connection in the digital age. Updated three times a week to allow for reflection gaps.
              </p>
            </div>
          </div>
        </section>

        {/* 3.5 Infinite Repository (Marquee) */}
        <IntegratedBookMarquee />

        {/* 4. Psychological Lab */}
        <section className="py-20 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold">Psychological Lab</h2>
              <p className="text-muted leading-relaxed">
                Story science, not just story art. I treat characters as subjects, observing their symptoms, perceptions, and consciousness under specific variables.
              </p>
              <ul className="space-y-4 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                  Symptom Analysis
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                  Perception Shifts
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                  Consciousness Mapping
                </li>
              </ul>
            </div>
            <div className="aspect-square md:aspect-video bg-foreground/5 rounded-2xl flex items-center justify-center border border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <span className="text-muted font-mono italic">Lab Experiment: Active</span>
            </div>
          </div>
        </section>

        {/* 5. Selected Fragments */}
        <section className="py-20 border-t border-border/40 space-y-12">
          <h2 className="text-3xl font-serif font-bold">Fragments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              "The silence was heavy, not empty. It held the weight of everything they almost said.",
              "He didn't want to be understood, he just wanted to be witnessed.",
              "Nostalgia is just memory formatted for consumption."
            ].map((fragment, i) => (
              <div key={i} className="group cursor-default">
                <div className="h-full p-6 border-l-2 border-border group-hover:border-foreground transition-colors duration-500">
                  <p className="font-serif italic text-xl leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                    "{fragment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Process & Tools */}
        <section className="py-20 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <div className="max-w-md space-y-6">
              <h2 className="text-3xl font-serif font-bold">Process & Tools</h2>
              <p className="text-muted leading-relaxed">
                I design the experience of reading. Every story is a system, every chapter a component.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  <span className="font-bold text-sm">Figma Systems</span>
                </div>
                <p className="text-xs text-muted">Visualizing plots before writing words.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span className="font-bold text-sm">UI Logic</span>
                </div>
                <p className="text-xs text-muted">Structure that guides the reader's eye.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="font-bold text-sm">Encryption</span>
                </div>
                <p className="text-xs text-muted">Hidden layers for the curious.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Invitation */}
        <section className="min-h-[50vh] flex flex-col items-center justify-center space-y-8 text-center border-t border-border/40">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tight">
            Read with me, <br />
            <span className="text-muted-foreground font-light italic">not just about me.</span>
          </h2>
          <button className="group flex items-center gap-3 text-lg font-medium border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-all">
            Enter the Library <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

      </LayoutWrapper>
    </main >
  );
}
