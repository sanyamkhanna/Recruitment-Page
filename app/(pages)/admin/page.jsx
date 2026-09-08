import React from "react";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import { connect, serializeFirestoreData } from "@/lib/db";
import AdminContent from "@/components/AdminContent";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const access = await requireAdmin();
  if (!access.ok) redirect(access.status === 401 ? "/auth/signin" : "/");
  const db = await connect();
  const snapshot = await db.collection("formData").orderBy("createdAt", "desc").get();
  const applicants = snapshot.docs.map((doc) => ({ id: doc.id, _id: doc.id, ...serializeFirestoreData(doc.data()) }));
  return <main><NavBar /><AdminContent applicants={applicants} /></main>;
}
