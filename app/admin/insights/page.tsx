"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "../../lib/supabase/client";

interface Insight {
  id: string;
  title: string;
  slug: string;
  author: string | null;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
}

export default function AdminInsightsPage() {
  const router = useRouter();

  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadInsights() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from("insights")
      .select("id, title, slug, author, status, published_at, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Unable to load insights.");
    } else {
      setInsights(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadInsights();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");

    /*
     * Delete all Storage objects belonging to this insight before deleting
     * the database row. This covers both the current fixed-path format:
     *
     *   insights/<insightId>
     *
     * and any older extension-based files:
     *
     *   insights/<insightId>.jpg
     *   insights/<insightId>.png
     *   insights/<insightId>.webp
     *
     * If Storage cleanup fails, we stop here so the database record is not
     * deleted while its associated image is left behind.
     */
    const { data: storageFiles, error: storageListError } =
      await supabase.storage.from("insight-covers").list("insights", {
        limit: 1000,
      });

    if (storageListError) {
      console.error(storageListError);
      setError(
        "Unable to delete the insight because its cover image could not be checked.",
      );
      return;
    }

    const filesToDelete = (storageFiles ?? [])
      .filter((file) => file.name === id || file.name.startsWith(`${id}.`))
      .map((file) => `insights/${file.name}`);

    if (filesToDelete.length > 0) {
      const { error: storageDeleteError } = await supabase.storage
        .from("insight-covers")
        .remove(filesToDelete);

      if (storageDeleteError) {
        console.error(storageDeleteError);
        setError(
          "Unable to delete the insight because its cover image could not be removed.",
        );
        return;
      }
    }

    /*
     * The insight relationship tables use ON DELETE CASCADE, so deleting
     * the insight row also removes its rows from:
     *
     *   insight_sectors
     *   insight_audiences
     *
     * The cover_image_url and all other insight content are removed with
     * the insights row itself.
     */
    const { error: databaseDeleteError } = await supabase
      .from("insights")
      .delete()
      .eq("id", id);

    if (databaseDeleteError) {
      console.error(databaseDeleteError);
      setError(
        "The cover image was removed, but the insight could not be deleted from the database. Please try again.",
      );
      return;
    }

    setInsights((current) => current.filter((insight) => insight.id !== id));
  }

  return (
    <main className="min-h-screen bg-surface admin-dashboard-root">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              Val<span className="text-secondary">Insight</span>
            </Link>

            <p className="mt-1 text-xs uppercase tracking-wider text-muted">
              Content Management System
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/insights"
              target="_blank"
              className="text-sm font-semibold text-primary hover:text-secondary"
            >
              View Website
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-surface"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              CMS
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary">
              Insights
            </h1>

            <p className="mt-2 text-sm text-muted">
              Create and manage ValInsight articles.
            </p>
          </div>

          <Link
            href="/admin/insights/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold !text-white hover:bg-primary-light"
          >
            + Add Insight
          </Link>
        </div>

        {error && (
          <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
          {loading ? (
            <div className="p-10 text-center text-sm text-muted">
              Loading insights...
            </div>
          ) : insights.length === 0 ? (
            <div className="p-12 text-center">
              <h2 className="text-xl font-semibold text-primary">
                No insights yet
              </h2>

              <p className="mt-2 text-sm text-muted">
                Create your first insight to get started.
              </p>

              <Link
                href="/admin/insights/new"
                className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-light"
              >
                Create First Insight
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Insight
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Author
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Updated
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {insights.map((insight) => (
                    <tr key={insight.id}>
                      <td className="px-6 py-5">
                        <p className="font-semibold text-primary">
                          {insight.title}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          /insights/{insight.slug}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-700">
                        {insight.author || "—"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            insight.status === "published"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {insight.status === "published"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-muted">
                        {new Date(insight.updated_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/admin/insights/${insight.id}/edit`}
                            className="text-sm font-semibold text-primary hover:text-secondary"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(insight.id, insight.title)
                            }
                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
