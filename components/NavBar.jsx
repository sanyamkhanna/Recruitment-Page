"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogIn, Sparkles } from "lucide-react";
import UserButton from "./UserButton";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { authClient } from "@/lib/auth-client";

export default function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  return (
    <>
      <header className="site-header">
        <nav className="nav-wrap">
          <Link href="/" className="brand" aria-label="Recruitment portal home">
            <span className="brand-mark">R</span><span>RECRUIT<span>+</span></span>
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/departments">Departments</Link>
            {isAdmin && <Link href="/admin">Admin</Link>}
          </div>

          <div className="nav-auth">
            <ThemeToggle />
            {isPending ? (
              <span className="nav-loading">•••</span>
            ) : !session?.user ? (
              <button type="button" className="nav-signin" onClick={() => setAuthOpen(true)}>
                <LogIn size={15} /> Sign in <span>↗</span>
              </button>
            ) : <UserButton user={session.user} />}
          </div>
        </nav>
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
