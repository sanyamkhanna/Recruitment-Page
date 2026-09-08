"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LockKeyhole, Sparkles, X } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { reviews } from "@/constants";
import { useSubmissions } from "@/components/SubmissionsProvider";

const departments = reviews;

export default function DepartmentsListPage() {
  const router = useRouter();
  const { submittedDepartments = [], isLoadingSubmissions } = useSubmissions();
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const remainingSlots = Math.max(0, 2 - submittedDepartments.length);
  const selected = useMemo(() => departments.filter((d) => selectedDepartments.includes(d.id)), [selectedDepartments]);

  const toggleDepartment = (department) => {
    if (submittedDepartments.includes(department.name)) {
      toast.error(`${department.name} has already been submitted.`);
      return;
    }
    setSelectedDepartments((current) => {
      if (current.includes(department.id)) return current.filter((id) => id !== department.id);
      if (current.length >= remainingSlots) {
        toast.error(`You can select up to ${remainingSlots} more department${remainingSlots === 1 ? "" : "s"}.`);
        return current;
      }
      return [...current, department.id];
    });
  };

  const goToApplication = () => {
    if (!selected.length) return toast.error("Choose at least one department to continue.");
    router.push(`/join/${selected.map((d) => d.id).join("/")}`);
  };

  return (
    <main className="departments-page">
      <NavBar />
      <div className="dept-ambient dept-ambient-one" />
      <div className="dept-ambient dept-ambient-two" />
      <div className="dept-noise" />

      <section className="dept-hero">
        <motion.div className="dept-hero-copy" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="section-kicker"><Sparkles size={14} /> STEP 01 · FIND YOUR FIT</span>
          <h1>Pick the teams<br /><span>you want to build with.</span></h1>
          <p>Choose up to two departments. Your selections unlock a tailored application with questions relevant to each team.</p>
          <div className="dept-hero-chips"><span>12 open teams</span><span>Choose up to 2</span><span>~5 min application</span></div>
        </motion.div>

        <motion.aside className="selection-panel" initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.6 }}>
          <div className="selection-panel-top"><span>Your shortlist</span><span className="selection-live">{isLoadingSubmissions ? "SYNCING" : "READY"}</span></div>
          <div className="selection-count"><strong>{selectedDepartments.length}</strong><span>/ {remainingSlots} available</span></div>
          <div className="selection-progress"><i style={{ width: `${remainingSlots ? Math.min(100, selectedDepartments.length / remainingSlots * 100) : 100}%` }} /></div>
          <AnimatePresence mode="wait">
            <motion.div className="selected-mini-list" key={selectedDepartments.join("|") || "empty"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              {selected.length ? selected.map((d) => <span key={d.id}>{d.name}<button onClick={() => toggleDepartment(d)} aria-label={`Remove ${d.name}`}><X size={12}/></button></span>) : <p>Nothing selected yet — explore the teams below.</p>}
            </motion.div>
          </AnimatePresence>
          <button type="button" onClick={goToApplication} disabled={!selected.length} className="selection-continue">Continue to application <ArrowRight size={18} /></button>
        </motion.aside>
      </section>

      <section className="department-grid-section">
        <div className="department-grid-heading">
          <div><span className="section-kicker">OPEN OPPORTUNITIES</span><h2>Find your <span>team.</span></h2></div>
          <p>Click a card to select it. Click again to remove it.</p>
        </div>

        <div className="department-grid">
          {departments.map((department, index) => {
            const isSelected = selectedDepartments.includes(department.id);
            const isSubmitted = submittedDepartments.includes(department.name);
            const Icon = department.icon;
            return (
              <motion.button type="button" key={department.id} className={`department-card ${isSelected ? "selected" : ""} ${isSubmitted ? "submitted" : ""}`} onClick={() => toggleDepartment(department)} disabled={isSubmitted}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: Math.min(index * 0.045, 0.3), duration: 0.42 }} whileHover={!isSubmitted ? { y: -7 } : undefined} whileTap={!isSubmitted ? { scale: 0.985 } : undefined}>
                <span className="department-glow" style={{ background: department.tone }} />
                <div className="department-card-top"><span className="department-icon" style={{ color: department.tone, borderColor: `${department.tone}55` }}><Icon size={24} /></span><span className={`department-state ${isSelected ? "checked" : ""}`}>{isSubmitted ? <LockKeyhole size={14} /> : isSelected ? <Check size={16} /> : <span />}</span></div>
                <div className="department-card-copy"><span className="department-number">TEAM {String(index + 1).padStart(2, "0")}</span><h3>{department.name}</h3><p>{department.description}</p></div>
                <div className="department-card-footer"><span>{isSubmitted ? "Application submitted" : isSelected ? "Selected · click to remove" : "Click to select"}</span><ArrowRight size={17} /></div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <div className="mobile-continue-bar"><span><b>{selectedDepartments.length}</b> / {remainingSlots} selected</span><button type="button" onClick={goToApplication} disabled={!selected.length}>Continue <ArrowRight size={17} /></button></div>
      <Footer />
    </main>
  );
}
