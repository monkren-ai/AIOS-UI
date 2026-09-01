import { AttachmentDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const attachmentDoc = createAiPrimitiveDoc({
  slug: "attachment",
  name: "Attachment",
  category: "chat",
  preview: () => <AttachmentDemo />,
  description: {
    zh: "文件和媒体附件，覆盖上传、进度、预览与删除。",
    en: "File and media attachments with upload, progress, preview, and removal.",
  },
  importStatement: `import { Attachment, AttachmentList } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<Attachment label="brief.pdf" type="pdf" onRemove={remove} />`,
  apiName: "Attachment",
  props: [
    {
      name: "type",
      type: "AttachmentType",
      default: `'unknown'`,
      description: { zh: "附件类型。", en: "Attachment type." },
    },
    {
      name: "loading / progress",
      type: "boolean / number",
      description: { zh: "上传状态和进度。", en: "Upload state and progress." },
    },
    {
      name: "onRemove",
      type: "() => void",
      description: {
        zh: "显示并处理删除按钮。",
        en: "Shows and handles removal.",
      },
    },
  ],
  accessibility: [
    {
      zh: "上传状态提供 busy、status 与 progressbar 语义，删除按钮拥有完整名称。",
      en: "Uploads expose busy, status, and progressbar semantics; remove buttons have full names.",
    },
  ],
});
