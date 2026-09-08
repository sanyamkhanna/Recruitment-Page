import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { ok: false, status: 401, message: "Authentication required" };
  if (session.user.role !== "admin") return { ok: false, status: 403, message: "Administrator access required" };
  return { ok: true, session };
}
