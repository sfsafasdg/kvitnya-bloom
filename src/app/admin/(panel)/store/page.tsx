import { StoreForm } from "@/components/admin/StoreForm";
import { store as fallback } from "@/data/store";
import { adminGetStore } from "@/lib/admin-sanity";

export default async function AdminStorePage() {
  const fromSanity = await adminGetStore();
  return (
    <div>
      <StoreForm initial={{ ...fallback, ...fromSanity }} />
    </div>
  );
}
