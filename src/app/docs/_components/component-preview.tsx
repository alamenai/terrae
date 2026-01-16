import { highlightCode } from "@/lib/highlight";
import { ComponentPreviewClient } from "./component-preview-client";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

export async function ComponentPreview({
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const highlightedCode = await highlightCode(code, "tsx");

  return (
    <ComponentPreviewClient
      code={code}
      highlightedCode={highlightedCode}
      className={className}
    >
      {children}
    </ComponentPreviewClient>
  );
}
