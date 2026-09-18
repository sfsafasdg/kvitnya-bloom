import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminPasswordConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!adminPasswordConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-6 text-center">
        <p className="max-w-md text-muted">
          Панель тимчасово недоступна. Зверніться до технічної підтримки сайту.
        </p>
      </div>
    );
  }
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  return <AdminShell>{children}</AdminShell>;
}
