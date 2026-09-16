"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from "../../../../lib/supabase/client";

type Option = {
  id: string;
  name: string;
  slug: string;
};

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: any;
  cover_image_url: string | null;
  author: string | null;
  status: "draft" | "published";
  published_at: string | null;
};

export default function EditInsightPage() {
  const router = useRouter();
  const params = useParams();

  const insightId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [insight, setInsight] = useState<Insight | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");

  const [sectors, setSectors] = useState<Option[]>([]);
  const [audiences, setAudiences] = useState<Option[]>([]);

  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [removeCoverImage, setRemoveCoverImage] = useState(false);

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
   * Check authentication
   */
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      loadInsight();
    }

    checkAuth();
  }, [router, insightId]);

  /*
   * Load the insight and its relationships
   */
  async function loadInsight() {
    setLoading(true);
    setError("");

    try {
      /*
       * Load the insight
       */
      const { data: insightData, error: insightError } = await supabase
        .from("insights")
        .select(
          "id, title, slug, excerpt, content, cover_image_url, author, status, published_at",
        )
        .eq("id", insightId)
        .single();

      if (insightError) {
        console.error("Insight loading error:", insightError);
        setError(insightError.message);
        setLoading(false);
        return;
      }

      if (!insightData) {
        setError("Insight not found.");
        setLoading(false);
        return;
      }

      /*
       * If the database does not contain a cover_image_url but the image
       * was uploaded to Storage, try to recover the image URL automatically.
       *
       * This also repairs older insights created before the cover-image
       * database update was working correctly.
       */
      let resolvedCoverImageUrl = insightData.cover_image_url;

      if (!resolvedCoverImageUrl) {
        const { data: storageFiles, error: storageListError } =
          await supabase.storage.from("insight-covers").list("insights", {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (storageListError) {
          console.error(
            "Cover image Storage listing error:",
            storageListError,
          );
        } else {
          const matchingFile = storageFiles?.find((file) =>
            file.name.startsWith(`${insightId}.`),
          );

          if (matchingFile) {
            const filePath = `insights/${matchingFile.name}`;

            const {
              data: { publicUrl },
            } = supabase.storage
              .from("insight-covers")
              .getPublicUrl(filePath);

            resolvedCoverImageUrl = publicUrl;

            /*
             * Repair the missing database URL. The select() makes sure
             * we know whether the UPDATE actually affected this insight.
             */
            const { data: repairedInsight, error: repairError } =
              await supabase
                .from("insights")
                .update({
                  cover_image_url: publicUrl,
                })
                .eq("id", insightId)
                .select("id, cover_image_url")
                .single();

            if (repairError || !repairedInsight?.cover_image_url) {
              console.error(
                "Cover image URL repair error:",
                repairError,
              );
            }
          }
        }
      }

      const loadedInsight: Insight = {
        ...insightData,
        cover_image_url: resolvedCoverImageUrl,
      };

      setInsight(loadedInsight);

      setTitle(insightData.title);
      setSlug(insightData.slug);
      setExcerpt(insightData.excerpt || "");
      setAuthor(insightData.author || "");

      /*
       * Put existing Tiptap content into editor
       */

      /*
       * Load sectors and audiences
       */
      const [sectorResult, audienceResult] = await Promise.all([
        supabase.from("sectors").select("id, name, slug").order("name"),

        supabase.from("audiences").select("id, name, slug").order("name"),
      ]);

      if (sectorResult.error) {
        console.error("Sector loading error:", sectorResult.error);
      }

      if (audienceResult.error) {
        console.error("Audience loading error:", audienceResult.error);
      }

      setSectors(sectorResult.data || []);
      setAudiences(audienceResult.data || []);

      /*
       * Load selected sector relationships
       */
      const { data: sectorRelations, error: sectorRelationError } =
        await supabase
          .from("insight_sectors")
          .select("sector_id")
          .eq("insight_id", insightId);

      if (sectorRelationError) {
        console.error("Sector relationship error:", sectorRelationError);
      }

      setSelectedSectors(sectorRelations?.map((item) => item.sector_id) || []);

      /*
       * Load selected audience relationships
       */
      const { data: audienceRelations, error: audienceRelationError } =
        await supabase
          .from("insight_audiences")
          .select("audience_id")
          .eq("insight_id", insightId);

      if (audienceRelationError) {
        console.error("Audience relationship error:", audienceRelationError);
      }

      setSelectedAudiences(
        audienceRelations?.map((item) => item.audience_id) || [],
      );

      setLoading(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Something went wrong while loading the insight.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editor && insight?.content) {
      editor.commands.setContent(insight.content);
    }
  }, [editor, insight]);

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
    setRemoveCoverImage(false);

    const previewUrl = URL.createObjectURL(file);
    setCoverImagePreview(previewUrl);
  }

  async function saveInsight(status: "draft" | "published") {
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
      setMessage("Editor is not ready.");
      return;
    }

    setSaving(true);

    try {
      /*
       * First update the main insight data.
       */
      const { data, error } = await supabase.rpc("update_insight", {
        p_insight_id: insightId,
        p_title: title.trim(),
        p_slug: slug.trim(),
        p_excerpt: excerpt.trim() || null,
        p_content: editor.getJSON(),
        p_author: author.trim() || "ValInsight",
        p_status: status,
        p_sector_ids: selectedSectors,
        p_audience_ids: selectedAudiences,
      });

      if (error) {
        console.error("Update insight error:", error);
        setMessage(error.message);
        setSaving(false);
        return;
      }

      console.log("Updated insight:", data);

      /*
       * Handle cover image removal.
       */
      if (removeCoverImage && !coverImageFile) {
        const oldImageUrl = insight?.cover_image_url;

        const { data: clearedInsight, error: imageUrlError } = await supabase
          .from("insights")
          .update({
            cover_image_url: null,
          })
          .eq("id", insightId)
          .select("id")
          .single();

        if (imageUrlError || !clearedInsight?.id) {
          console.error("Cover image URL removal error:", imageUrlError);
          setMessage(
            imageUrlError
              ? imageUrlError.message
              : "The cover image URL could not be removed from the database. Check the CMS owner UPDATE policy on insights.",
          );
          setSaving(false);
          return;
        }

        /*
         * Delete the old image from Storage after the database
         * has successfully been updated.
         */
        if (oldImageUrl) {
          try {
            const oldUrl = new URL(oldImageUrl);
            const marker = "/storage/v1/object/public/insight-covers/";

            if (oldUrl.pathname.includes(marker)) {
              const oldFilePath = decodeURIComponent(
                oldUrl.pathname.substring(
                  oldUrl.pathname.indexOf(marker) + marker.length,
                ),
              );

              const { error: deleteImageError } = await supabase.storage
                .from("insight-covers")
                .remove([oldFilePath]);

              if (deleteImageError) {
                console.error(
                  "Old cover image deletion error:",
                  deleteImageError,
                );

                setMessage(
                  "Insight was updated, but the old cover image could not be deleted from Storage.",
                );
                setSaving(false);
                return;
              }
            }
          } catch (parseError) {
            console.error("Old cover image URL parsing error:", parseError);
          }
        }
      }

      /*
       * Handle a new/replacement cover image.
       */
      if (coverImageFile) {
        /*
         * Always use one fixed Storage object per insight.
         * This makes every replacement an overwrite of the same object.
         */
        const filePath = `insights/${insightId}`;

        /*
         * Upload the new image first.
         */
        const { error: uploadError } = await supabase.storage
          .from("insight-covers")
          .upload(filePath, coverImageFile, {
            cacheControl: "0",
            upsert: true,
            contentType: coverImageFile.type,
          });

        if (uploadError) {
          console.error("Cover image upload error:", uploadError);

          setMessage(
            `Insight was updated, but image upload failed: ${uploadError.message}`,
          );
          setSaving(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("insight-covers").getPublicUrl(filePath);

        /*
         * Cache-bust the URL because the Storage object itself keeps
         * the same public path after replacement.
         */
        const versionedPublicUrl = `${publicUrl}?v=${Date.now()}`;

        /*
         * Save the new public URL in the database.
         */
        const { data: updatedInsight, error: imageUrlError } =
          await supabase
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
              ? `Image uploaded, but the image URL could not be saved: ${imageUrlError.message}`
              : "Image uploaded, but the image URL was not saved to the database. Check the CMS owner UPDATE policy on insights.",
          );
          setSaving(false);
          return;
        }

        /*
         * Clean up legacy extension-based objects for this insight.
         *
         * The new object is always:
         *   insights/<insightId>
         *
         * Existing objects such as <insightId>.jpg, <insightId>.png,
         * and <insightId>.webp are removed after the new object and
         * database URL have both succeeded.
         */
        const { data: storageFilesAfterUpload, error: storageListError } =
          await supabase.storage.from("insight-covers").list("insights", {
            limit: 100,
          });

        if (storageListError) {
          console.error(
            "Storage cleanup listing error:",
            storageListError,
          );

          setMessage(
            "Insight was updated, but old cover-image files could not be checked for cleanup.",
          );
          setSaving(false);
          return;
        }

        const legacyFilePaths =
          storageFilesAfterUpload
            ?.filter((file) => file.name.startsWith(`${insightId}.`))
            .map((file) => `insights/${file.name}`) || [];

        if (legacyFilePaths.length > 0) {
          const { error: cleanupError } = await supabase.storage
            .from("insight-covers")
            .remove(legacyFilePaths);

          if (cleanupError) {
            console.error("Legacy cover image cleanup error:", cleanupError);

            setMessage(
              "Insight was updated, but one or more old cover-image files could not be deleted from Storage.",
            );
            setSaving(false);
            return;
          }
        }
      }

      router.push("/admin/insights");
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Something went wrong while updating the insight.");
      setSaving(false);
    }
  }

  async function handleStatusChange(status: "draft" | "published") {
    await saveInsight(status);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-sm text-muted">Loading insight...</p>
      </main>
    );
  }

  if (error || !insight) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">
            Unable to load insight
          </h1>

          <p className="mt-3 text-sm text-red-600">
            {error || "Insight not found."}
          </p>

          <Link
            href="/admin/insights"
            className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface">
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
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            CMS
          </p>

          <h1 className="mt-2 text-3xl font-bold text-primary">Edit Insight</h1>

          <p className="mt-2 text-sm text-muted">
            Update the content and classification of this insight.
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
                  onChange={(event) => setTitle(event.target.value)}
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
                  className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />

                <p className="mt-2 text-xs text-muted">
                  Public URL: /insights/{slug}
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
                  className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Editor */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">Insight Content</h2>

            <p className="mt-2 text-sm text-muted">
              Edit the main content of the insight.
            </p>

            <div className="mt-6 overflow-hidden rounded-md border border-border">
              {editor && (
                <div className="flex flex-wrap gap-2 border-b border-border bg-surface p-3">
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBold().run()}
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
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
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
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
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
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
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
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
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
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
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

              <EditorContent editor={editor} />
            </div>
          </section>

          {/* Cover Image */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">Cover Image</h2>

            <p className="mt-2 text-sm text-muted">
              Replace or remove the cover image for this insight.
            </p>

            {/* Current / New Preview */}
            {(coverImagePreview ||
              (insight.cover_image_url && !removeCoverImage)) && (
              <div className="mt-6 overflow-hidden rounded-lg border border-border">
                <img
                  src={coverImagePreview || insight.cover_image_url || ""}
                  alt="Cover image preview"
                  className="h-auto max-h-[400px] w-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label
                htmlFor="cover-image"
                className="cursor-pointer rounded-md border border-primary px-5 py-3 text-center text-sm font-semibold text-primary hover:bg-surface"
              >
                {coverImagePreview || insight.cover_image_url
                  ? "Replace Image"
                  : "Choose Image"}

                <input
                  id="cover-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              </label>

              {(coverImagePreview ||
                (insight.cover_image_url && !removeCoverImage)) && (
                <button
                  type="button"
                  onClick={() => {
                    setCoverImageFile(null);
                    setCoverImagePreview("");
                    setRemoveCoverImage(true);
                    setMessage("");
                  }}
                  className="rounded-md border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove Image
                </button>
              )}
            </div>

            <p className="mt-3 text-xs text-muted">
              JPG, PNG, or WEBP · Maximum 5 MB
            </p>
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

          {/* Actions */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            {message && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href="/admin/insights"
                className="rounded-md border border-border px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-surface"
              >
                Cancel
              </Link>

              <button
                type="button"
                disabled={saving}
                onClick={() => saveInsight(insight.status)}
                className="rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {insight.status === "draft" ? (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleStatusChange("published")}
                  className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Publishing..." : "Publish"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleStatusChange("draft")}
                  className="rounded-md border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Unpublishing..." : "Unpublish"}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
