"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import DataTable from "./DataTable";

const AdminContent = ({ applicants }) => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <div className="p-8 text-center">Loading admin dashboard…</div>;
  if (!session?.user) return <div className="p-8 text-center">Authentication required.</div>;
  if (session.user.role !== "admin") return <div className="p-8 text-center">Access denied.</div>;
  return <div><DataTable data={applicants} /></div>;
};
export default AdminContent;
