import Image from "next/image";
import Link from "next/link";

type AdminBrandProps = {
  href?: string;
  compact?: boolean;
  dark?: boolean;
};

export default function AdminBrand({
  href = "/admin/insights",
  compact = false,
  dark = false,
}: AdminBrandProps) {
  const content = (
    <span className={`admin-brand ${dark ? "admin-brand--dark" : ""} ${compact ? "admin-brand--compact" : ""}`}>
      <Image
        src={dark ? "/admin/valinsight-admin-logo-dark.svg" : "/admin/valinsight-admin-logo.svg"}
        alt="Valuation Insights Admin"
        width={compact ? 176 : 214}
        height={compact ? 48 : 58}
        priority
        className="admin-brand__image"
      />
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
