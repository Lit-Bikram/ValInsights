import { ReactNode } from "react";

interface TiptapNode {
  type?: string;
  text?: string;
  attrs?: {
    level?: number;
    href?: string;
    target?: string;
  };
  marks?: {
    type: string;
  }[];
  content?: TiptapNode[];
}

interface InsightContentProps {
  content: {
    type?: string;
    content?: TiptapNode[];
  } | null;
}

function applyMarks(
  text: ReactNode,
  marks?: { type: string }[]
): ReactNode {
  if (!marks) {
    return text;
  }

  return marks.reduce((result, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{result}</strong>;

      case "italic":
        return <em>{result}</em>;

      case "strike":
        return <s>{result}</s>;

      case "code":
        return (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
            {result}
          </code>
        );

      default:
        return result;
    }
  }, text);
}

function renderNode(node: TiptapNode, index: number): ReactNode {
  const children =
    node.content?.map((child, childIndex) =>
      renderNode(child, childIndex)
    ) ?? null;

  switch (node.type) {
    case "text":
      return (
        <span key={index}>
          {applyMarks(node.text ?? "", node.marks)}
        </span>
      );

    case "paragraph":
      return (
        <p key={index} className="mb-6 leading-8 text-gray-700">
          {children}
        </p>
      );

    case "heading": {
      const level = node.attrs?.level ?? 2;

      if (level === 1) {
        return (
          <h1
            key={index}
            className="mb-6 mt-10 text-4xl font-bold tracking-tight text-primary"
          >
            {children}
          </h1>
        );
      }

      if (level === 3) {
        return (
          <h3
            key={index}
            className="mb-4 mt-8 text-2xl font-bold text-primary"
          >
            {children}
          </h3>
        );
      }

      return (
        <h2
          key={index}
          className="mb-5 mt-10 text-3xl font-bold tracking-tight text-primary"
        >
          {children}
        </h2>
      );
    }

    case "bulletList":
      return (
        <ul
          key={index}
          className="mb-6 ml-6 list-disc space-y-2 text-gray-700"
        >
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol
          key={index}
          className="mb-6 ml-6 list-decimal space-y-2 text-gray-700"
        >
          {children}
        </ol>
      );

    case "listItem":
      return <li key={index}>{children}</li>;

    case "blockquote":
      return (
        <blockquote
          key={index}
          className="my-8 border-l-4 border-secondary pl-6 text-lg italic leading-8 text-gray-600"
        >
          {children}
        </blockquote>
      );

    case "hardBreak":
      return <br key={index} />;

    case "horizontalRule":
      return <hr key={index} className="my-10 border-border" />;

    case "image":
      return (
        <img
          key={index}
          src={node.attrs?.href}
          alt=""
          className="my-8 w-full rounded-xl"
        />
      );

    default:
      return (
        <div key={index}>
          {children}
        </div>
      );
  }
}

export default function InsightContent({
  content,
}: InsightContentProps) {
  if (!content?.content) {
    return (
      <p className="text-muted">
        No article content is available.
      </p>
    );
  }

  return (
    <div className="text-base sm:text-lg">
      {content.content.map((node, index) =>
        renderNode(node, index)
      )}
    </div>
  );
}