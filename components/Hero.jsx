"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const float = reduceMotion ? {} : { y: [0, -16, 0], rotate: [0, 5, 0] };
  return (
    <section className="hero-shell">
      <div className="aurora aurora-one" /><div className="aurora aurora-two" />
      <div className="hero-grid" />
      <div className="hero-content">
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="eyebrow"><Sparkles size={15}/> RECRUITMENT 2026 · BUILD WHAT'S NEXT</motion.div>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.08}}>
          Your next <span>chapter</span><br/>starts with a bold idea.
        </motion.h1>
        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.16}}>
          Discover ambitious teams, solve meaningful problems, and turn curiosity into real-world impact.
        </motion.p>
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.24}} className="hero-actions">
          <Link className="primary-cta" href="/departments">Explore departments <ArrowRight size={18}/></Link>
          <a className="secondary-cta" href="#experience">See the experience</a>
        </motion.div>
        <div className="hero-proof" id="experience">
          <div><Users/><span><b>Collaborate</b><small>with driven people</small></span></div>
          <div><Zap/><span><b>Build</b><small>projects that matter</small></span></div>
        </div>
      </div>
      <motion.div className="orb-stage" animate={float} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}>
        <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
        <div className="glass-orb"><div className="orb-core"/><span className="orb-label">CREATE<br/>IMPACT</span></div>
        <motion.div className="floating-card card-one" animate={reduceMotion?{}:{y:[0,-10,0]}} transition={{duration:4,repeat:Infinity}}><span>01</span><b>Imagine</b><small>ideas into action</small></motion.div>
        <motion.div className="floating-card card-two" animate={reduceMotion?{}:{y:[0,12,0]}} transition={{duration:5,repeat:Infinity}}><span>∞</span><b>Explore</b><small>new possibilities</small></motion.div>
      </motion.div>
      <div className="scroll-cue"><span/>SCROLL TO DISCOVER</div>
    </section>
  );
}
