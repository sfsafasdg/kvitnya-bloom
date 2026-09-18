import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminPasswordConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!adminPasswordConfigured()) {
    redirect("/admin/login?setup=missing");
  }
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  return <AdminShell>{children}</AdminShell>;
}
