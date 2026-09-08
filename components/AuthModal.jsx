"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function AuthModal({ open, onClose, initialMode = "signin" }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const result = mode === "signup"
        ? await authClient.signUp.email({ email, password, name, callbackURL: "/" })
        : await authClient.signIn.email({ email, password, callbackURL: "/" });

      if (result?.error) {
        toast.error(result.error.message || "Authentication failed.");
        return;
      }

      toast.success(mode === "signup" ? "Account created successfully!" : "Welcome back!");
      onClose?.();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in is not available right now.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}
        >
          <motion.section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Authentication"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="auth-close" type="button" onClick={onClose} aria-label="Close sign in window">
              <X size={19} />
            </button>

            <div className="auth-orb auth-orb-one" />
            <div className="auth-orb auth-orb-two" />

            <div className="auth-side">
              <div className="auth-side-badge"><Sparkles size={15} /> RECRUIT+ 2026</div>
              <h2>Your next chapter<br /><span>starts here.</span></h2>
              <p>One account unlocks your department selections, application progress and recruitment updates.</p>
              <div className="auth-side-points">
                <span>01 <small>Choose up to two departments</small></span>
                <span>02 <small>Complete your application securely</small></span>
                <span>03 <small>Track your recruitment journey</small></span>
              </div>
            </div>

            <div className="auth-main">
              <div className="auth-heading">
                <p>WELCOME TO THE PORTAL</p>
                <h1>{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
                <span>{mode === "signin" ? "Sign in to continue your application." : "Start your recruitment journey in a minute."}</span>
              </div>

              <div className="auth-tabs" role="tablist">
                <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>Sign in</button>
                <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <AnimatePresence initial={false}>
                  {mode === "signup" && (
                    <motion.label className="auth-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <span>Full name</span>
                      <div><UserRound size={17} /><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" /></div>
                    </motion.label>
                  )}
                </AnimatePresence>

                <label className="auth-field">
                  <span>Email address</span>
                  <div><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
                </label>

                <label className="auth-field">
                  <span>Password</span>
                  <div><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label="Show or hide password">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                  </div>
                </label>

                <button className="auth-submit" type="submit" disabled={submitting}>
                  {submitting ? "Please wait..." : mode === "signin" ? "Sign in to portal" : "Create account"} <ArrowRight size={18} />
                </button>
              </form>

              <div className="auth-divider"><span>or continue with</span></div>
              <button className="google-button" type="button" onClick={handleGoogle}>
                <span className="google-mark">G</span> Google
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
