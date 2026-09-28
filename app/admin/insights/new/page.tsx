"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from "../../../lib/supabase/client";

type Option = {
  id: string;
  name: string;
  slug: string;
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewInsightPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("ValInsight");

  const [sectors, setSectors] = useState<Option[]>([]);
  const [audiences, setAudiences] = useState<Option[]>([]);

  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");

  /*
   * Tiptap editor
   */
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "tiptap min-h-[350px] px-5 py-4 outline-none max-w-none",
      },
    },
  });

  /*
   * Authentication check
   */
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      setCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  /*
   * Load sectors and audiences
   */
  useEffect(() => {
    async function loadOptions() {
      const [sectorResult, audienceResult] = await Promise.all([
        supabase.from("sectors").select("id, name, slug").order("name"),
        supabase.from("audiences").select("id, name, slug").order("name"),
      ]);

      if (sectorResult.data) {
        setSectors(sectorResult.data);
      }

      if (audienceResult.data) {
        setAudiences(audienceResult.data);
      }
    }

    if (!checkingAuth) {
      loadOptions();
    }
  }, [checkingAuth]);

  /*
   * Auto-generate slug from title
   */
  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(createSlug(value));
  }

  /*
   * Sector selection
   */
  function toggleSector(id: string) {
    setSelectedSectors((current) =>
      current.includes(id)
        ? current.filter((sectorId) => sectorId !== id)
        : [...current, id],
    );
  }

  /*
   * Audience selection
   */
  function toggleAudience(id: string) {
    setSelectedAudiences((current) =>
      current.includes(id)
        ? current.filter((audienceId) => audienceId !== id)
        : [...current, id],
    );
  }

  function handleCoverImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setMessage("");
    setCoverImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setCoverImagePreview(previewUrl);
  }

  /*
   * Save the insight and optional cover image
   */
  async function handleSave(status: "draft" | "published") {
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (!slug.trim()) {
      setMessage("Please enter a slug.");
      return;
    }

    if (!editor) {
      setMessage("Editor is not ready yet.");
      return;
    }

    setSaving(true);

    try {
      /*
       * Step 1: Create the insight
       */
      const { data: insightId, error: createError } = await supabase.rpc(
        "create_insight",
        {
          p_title: title.trim(),
          p_slug: slug.trim(),
          p_excerpt: excerpt.trim() || null,
          p_content: editor.getJSON(),
          p_author: author.trim() || "ValInsight",
          p_status: status,
          p_sector_ids: selectedSectors,
          p_audience_ids: selectedAudiences,
        },
      );

      if (createError) {
        console.error("Create insight error:", {
          message: createError.message,
          code: createError.code,
          details: createError.details,
          hint: createError.hint,
          slugBeingSent: slug.trim(),
        });

        setMessage(`${createError.message} | Slug being sent: ${slug.trim()}`);

        setSaving(false);
        return;
      }

      /*
       * Step 2: Upload cover image if one was selected
       */
      if (coverImageFile) {
        console.log("COVER IMAGE SELECTED:", {
          name: coverImageFile.name,
          type: coverImageFile.type,
          size: coverImageFile.size,
        });

        /*
         * Use one fixed Storage object per insight.
         * Replacing an image therefore overwrites the same object,
         * regardless of whether the new file is JPG, PNG, or WEBP.
         */
        const filePath = `insights/${insightId}`;

        console.log("ABOUT TO UPLOAD:", {
          bucket: "insight-covers",
          filePath,
        });

        const { error: uploadError } = await supabase.storage
          .from("insight-covers")
          .upload(filePath, coverImageFile, {
            cacheControl: "0",
            upsert: true,
            contentType: coverImageFile.type,
          });

        if (uploadError) {
          console.error("Image upload error:", uploadError);

          setMessage(
            `Insight was created, but image upload failed: ${uploadError.message}`,
          );

          setSaving(false);
          return;
        }

        /*
         * Step 3: Get the public image URL
         */
        const {
          data: { publicUrl },
        } = supabase.storage.from("insight-covers").getPublicUrl(filePath);

        /*
         * Cache-bust the public URL so a previous image is not shown
         * from the browser/CDN cache after an overwrite.
         */
        const versionedPublicUrl = `${publicUrl}?v=${Date.now()}`;

        /*
         * Step 4: Save image URL to the insight
         */
        const { data: updatedInsight, error: imageUrlError } = await supabase
          .from("insights")
          .update({
            cover_image_url: versionedPublicUrl,
          })
          .eq("id", insightId)
          .select("id, cover_image_url")
          .single();

        if (imageUrlError || !updatedInsight?.cover_image_url) {
          console.error("Cover image URL update error:", imageUrlError);

          setMessage(
            imageUrlError
              ? `Insight was created, but the image URL could not be saved: ${imageUrlError.message}`
              : "Insight was created and the image was uploaded, but the image URL was not saved to the database. Check the CMS owner UPDATE policy on insights.",
          );

          setSaving(false);
          return;
        }
      }

      /*
       * Step 5: Return to CMS dashboard
       */
      router.push("/admin/insights");
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Something went wrong while saving the insight.");
      setSaving(false);
    }
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface admin-loading-root">
        <p className="text-sm text-muted">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface admin-editor-root">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin/insights"
              className="text-2xl font-bold text-primary"
            >
              Val<span className="text-secondary">Insight</span>
            </Link>

            <p className="mt-1 text-sm text-muted">Content Management System</p>
          </div>

          <Link
            href="/admin/insights"
            className="text-sm font-semibold text-muted hover:text-primary"
          >
            ← Back to Insights
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Add New Insight</h1>

          <p className="mt-2 text-sm text-muted">
            Create and publish a new ValInsight article.
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">
              Basic Information
            </h2>

            <div className="mt-6 space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Enter insight title"
                  className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Slug
                </label>

                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="insight-url-slug"
                  className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />

                <p className="mt-2 text-xs text-muted">
                  Public URL: /insights/{slug || "your-slug"}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Excerpt
                </label>

                <textarea
                  id="excerpt"
                  rows={4}
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Short description of the insight..."
                  className="mt-2 w-full resize-none rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Author
                </label>

                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  placeholder="Author name"
                  className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Cover Image */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">Cover Image</h2>

            <p className="mt-2 text-sm text-muted">
              Upload an image to use as the cover image for this insight.
            </p>

            <div className="mt-6">
              <label
                htmlFor="cover-image"
                className="block cursor-pointer rounded-lg border-2 border-dashed border-border p-8 text-center hover:bg-surface"
              >
                <div className="text-sm font-semibold text-primary">
                  Choose an image
                </div>

                <div className="mt-2 text-xs text-muted">
                  JPG, PNG, or WEBP · Maximum 5 MB
                </div>

                <input
                  id="cover-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              </label>

              {coverImageFile && (
                <p className="mt-3 text-sm text-muted">
                  Selected: {coverImageFile.name}
                </p>
              )}

              {coverImagePreview && (
                <div className="mt-6 overflow-hidden rounded-lg border border-border">
                  <img
                    src={coverImagePreview}
                    alt="Cover image preview"
                    className="h-auto max-h-[400px] w-full object-cover"
                  />
                </div>
              )}
            </div>
          </section>
          {/* Content Editor */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">Insight Content</h2>

            <p className="mt-2 text-sm text-muted">
              Write the main content of your insight below.
            </p>

            <div className="mt-6 overflow-hidden rounded-md border border-border">
              {/* Toolbar */}
              {editor && (
                <div className="flex flex-wrap gap-2 border-b border-border bg-surface p-3">
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleBold().run();
                    }}
                    className={`rounded px-3 py-2 text-sm font-semibold ${
                      editor.isActive("bold")
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Bold
                  </button>

                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleItalic().run();
                    }}
                    className={`rounded px-3 py-2 text-sm italic ${
                      editor.isActive("italic")
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Italic
                  </button>

                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={`rounded px-3 py-2 text-sm font-semibold ${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Heading
                  </button>

                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleBulletList().run();
                    }}
                    className={`rounded px-3 py-2 text-sm ${
                      editor.isActive("bulletList")
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    • List
                  </button>

                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={`rounded px-3 py-2 text-sm ${
                      editor.isActive("orderedList")
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    1. List
                  </button>

                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      editor.chain().focus().toggleBlockquote().run();
                    }}
                    className={`rounded px-3 py-2 text-sm ${
                      editor.isActive("blockquote")
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Quote
                  </button>
                </div>
              )}

              {/* Editor */}
              <EditorContent editor={editor} />
            </div>
          </section>

          {/* Classification */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">Classification</h2>

            <p className="mt-2 text-sm text-muted">
              Select the sectors and audiences relevant to this insight.
            </p>

            {/* Sectors */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700">Sectors</h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {sectors.map((sector) => (
                  <label
                    key={sector.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-surface"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes(sector.id)}
                      onChange={() => toggleSector(sector.id)}
                      className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700">{sector.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Audiences */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-700">
                Whom We Serve
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {audiences.map((audience) => (
                  <label
                    key={audience.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-surface"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAudiences.includes(audience.id)}
                      onChange={() => toggleAudience(audience.id)}
                      className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700">
                      {audience.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Status / Actions */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            {message && (
              <div className="mb-5 rounded-md border border-border bg-surface p-3 text-sm text-gray-700">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/insights"
                className="rounded-md border border-border px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-surface"
              >
                Cancel
              </Link>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("draft")}
                className="rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-surface disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("published")}
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-60"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
