"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";
import AdminBrand from "./AdminBrand";

type AdminHeaderProps = {
  backHref?: string;
  backLabel?: string;
  showDashboardLinks?: boolean;
  showInsightsLink?: boolean;
  showWebsiteLink?: boolean;
  showLogout?: boolean;
};

export default function AdminHeader({
  backHref,
  backLabel = "← Back to Insights",
  showDashboardLinks = false,
  showInsightsLink = false,
  showWebsiteLink = false,
  showLogout = false,
}: AdminHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <header className="admin-header">
      <div className="admin-header__inner">
        <AdminBrand dark />

        <div className="admin-header__actions">
          {showDashboardLinks && (
            <Link href="/admin/enquiries" className="admin-header__link">
              Enquiries
            </Link>
          )}

          {showInsightsLink && (
            <Link href="/admin/insights" className="admin-header__link">
              Insights
            </Link>
          )}

          {showWebsiteLink && (
            <Link
              href="/insights"
              target="_blank"
              rel="noreferrer"
              className="admin-header__link"
            >
              View Website
            </Link>
          )}

          {backHref && (
            <Link href={backHref} className="admin-header__back">
              {backLabel}
            </Link>
          )}

          {showLogout && (
            <button
              type="button"
              onClick={handleLogout}
              className="admin-header__logout"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
