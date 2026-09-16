import { ReactNode } from "react";
import PageContainer from "../layout/PageContainer";

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function CardGrid({
  children,
  columns = 3,
  className = "",
}: CardGridProps) {
  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <PageContainer className={className}>
      <div className={`grid gap-6 ${columnClasses[columns]}`}>
        {children}
      </div>
    </PageContainer>
  );
}