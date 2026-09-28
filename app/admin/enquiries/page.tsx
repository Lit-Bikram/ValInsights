"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase/client";

type EnquiryStatus = "new" | "read" | "replied";

interface Enquiry {
  id: string;
  name: string;
  organisation: string | null;
  email: string;
  phone: string | null;
  requirement_type: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

function statusClass(status: EnquiryStatus) {
  if (status === "new") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "replied") {
    return "bg-green-50 text-green-700";
  }

  return "bg-gray-100 text-gray-700";
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminEnquiriesPage() {
  const router = useRouter();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function loadEnquiries() {
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
      .from("contact_submissions")
      .select(
        "id, name, organisation, email, phone, requirement_type, message, status, created_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Enquiries load error:", error);
      setError("Unable to load enquiries.");
    } else {
      setEnquiries((data ?? []) as Enquiry[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function updateStatus(enquiryId: string, status: EnquiryStatus) {
    setUpdatingStatus(true);
    setError("");

    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", enquiryId);

    if (error) {
      console.error("Enquiry status update error:", error);
      setError("Unable to update the enquiry status.");
      setUpdatingStatus(false);
      return;
    }

    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === enquiryId ? { ...enquiry, status } : enquiry,
      ),
    );

    setSelectedEnquiry((current) =>
      current && current.id === enquiryId ? { ...current, status } : current,
    );

    setUpdatingStatus(false);
  }

  const filteredEnquiries = useMemo(() => {
    if (filter === "all") {
      return enquiries;
    }

    return enquiries.filter((enquiry) => enquiry.status === filter);
  }, [enquiries, filter]);

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter((enquiry) => enquiry.status === "new").length,
      read: enquiries.filter((enquiry) => enquiry.status === "read").length,
      replied: enquiries.filter((enquiry) => enquiry.status === "replied")
        .length,
    };
  }, [enquiries]);

  return (
    <main className="min-h-screen bg-[#eef3f7]">
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
              href="/admin/insights"
              className="text-sm font-semibold text-primary hover:text-secondary"
            >
              Insights
            </Link>

            <Link
              href="/"
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

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              CMS
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary">
              Enquiries
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage contact requests submitted through the ValInsight website.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-xl border bg-white p-5 text-left transition ${
              filter === "all"
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              All Enquiries
            </p>

            <p className="mt-2 text-3xl font-bold text-primary">{counts.all}</p>
          </button>

          <button
            type="button"
            onClick={() => setFilter("new")}
            className={`rounded-xl border bg-white p-5 text-left transition ${
              filter === "new"
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              New
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-700">
              {counts.new}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFilter("read")}
            className={`rounded-xl border bg-white p-5 text-left transition ${
              filter === "read"
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Read
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-700">
              {counts.read}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFilter("replied")}
            className={`rounded-xl border bg-white p-5 text-left transition ${
              filter === "replied"
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Replied
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {counts.replied}
            </p>
          </button>
        </div>

        {/* Enquiry list */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
          {loading ? (
            <div className="p-10 text-center text-sm text-muted">
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center">
              <h2 className="text-xl font-semibold text-primary">
                No enquiries found
              </h2>

              <p className="mt-2 text-sm text-muted">
                There are no contact enquiries in this category.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Requirement
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Received
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="transition hover:bg-surface/60"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-primary">
                          {enquiry.name}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                          {enquiry.email}
                        </p>

                        {enquiry.organisation && (
                          <p className="mt-1 text-xs text-muted">
                            {enquiry.organisation}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-gray-700">
                          {enquiry.requirement_type}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            enquiry.status,
                          )}`}
                        >
                          {statusLabels[enquiry.status]}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-muted">
                        {formatDate(enquiry.created_at)}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="text-sm font-semibold text-primary hover:text-secondary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEnquiry(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Contact Enquiry
                </p>

                <h2 className="mt-2 text-2xl font-bold text-primary">
                  {selectedEnquiry.name}
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {formatDate(selectedEnquiry.created_at)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-md px-3 py-2 text-xl text-gray-500 hover:bg-surface hover:text-primary"
                aria-label="Close enquiry"
              >
                ×
              </button>
            </div>

            {/* Modal content */}
            <div className="space-y-7 px-6 py-7">
              {/* Contact details */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Contact Details
                </h3>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted">Name</p>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {selectedEnquiry.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Organisation</p>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {selectedEnquiry.organisation || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Email</p>

                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="mt-1 block text-sm font-medium text-primary hover:text-secondary"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Phone</p>

                    {selectedEnquiry.phone ? (
                      <a
                        href={`tel:${selectedEnquiry.phone}`}
                        className="mt-1 block text-sm font-medium text-primary hover:text-secondary"
                      >
                        {selectedEnquiry.phone}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-primary">
                        Not provided
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Requirement */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Requirement
                </h3>

                <p className="mt-3 rounded-lg bg-surface p-4 text-sm font-medium text-primary">
                  {selectedEnquiry.requirement_type}
                </p>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Message
                </h3>

                <div className="mt-3 rounded-lg border border-border bg-white p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Enquiry Status
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  {(["new", "read", "replied"] as EnquiryStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={updatingStatus}
                        onClick={() => updateStatus(selectedEnquiry.id, status)}
                        className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                          selectedEnquiry.status === status
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-white text-gray-700 hover:border-primary hover:text-primary"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {statusLabels[status]}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-border bg-[#eef3f7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted">
                Submission ID: {selectedEnquiry.id}
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  style={{ color: "#ffffff" }}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold hover:bg-primary-light"
                >
                  Reply by Email
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
