import type { ReactNode } from "react";
import type { Bilingual, ComponentDoc, PropRow } from "./types";

interface AiPrimitiveDocOptions {
  slug: string;
  name: string;
  category: "chat" | "agent" | "shell";
  description: Bilingual;
  preview: () => ReactNode;
  importStatement: string;
  usageSnippet: string;
  apiName: string;
  props: PropRow[];
  accessibility: Bilingual[];
}

export function createAiPrimitiveDoc(
  options: AiPrimitiveDocOptions,
): ComponentDoc {
  return {
    slug: options.slug,
    name: options.name,
    category: options.category,
    status: "new",
    description: options.description,
    preview: options.preview,
    importStatement: options.importStatement,
    usageSnippet: options.usageSnippet,
    examples: [],
    api: [{ name: options.apiName, props: options.props }],
    accessibility: options.accessibility,
  };
}
