import * as React from "react";
import { StreamingText } from "aios-ui-kit/conversation";
import type { ComponentDoc } from "../types";
import Basic from "../../examples/streaming-text/basic";
import source from "../../examples/streaming-text/basic.tsx?raw";

const previewText = "正在生成回答。 / Generating the response.";

function StreamingTextPreview() {
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    if (length >= previewText.length) return;
    const timer = window.setTimeout(
      () => setLength((value) => Math.min(previewText.length, value + 2)),
      45,
    );
    return () => window.clearTimeout(timer);
  }, [length]);

  return (
    <StreamingText streaming={length < previewText.length}>
      {previewText.slice(0, length)}
    </StreamingText>
  );
}

export const streamingTextDoc: ComponentDoc = {
  slug: "streaming-text",
  name: "StreamingText",
  category: "chat",
  status: "new",
  description: {
    zh: "为新追加的流式文本提供短暂反馈；初始内容和已稳定内容保持静止，避免整段回答反复闪动。",
    en: "Gives newly appended stream content brief feedback while initial and settled content remain still.",
  },
  preview: () => <StreamingTextPreview />,
  importStatement: `import { StreamingText } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<StreamingText variant="fade" streaming={isStreaming}>{response}</StreamingText>`,
  examples: [
    {
      id: "basic",
      title: { zh: "追加与变体", en: "Appending and variants" },
      description: {
        zh: "示例会自动追加内容；也可手动追加或重播。reduced motion 下自动关闭动画。",
        en: "The example appends automatically; you can also append or replay it. Animation is disabled under reduced motion.",
      },
      code: source,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: "StreamingText",
      props: [
        {
          name: "children",
          type: "string",
          required: true,
          description: {
            zh: "完整的当前文本。",
            en: "The complete current text.",
          },
        },
        {
          name: "variant",
          type: "'plain' | 'fade' | 'tail'",
          default: "'fade'",
          description: {
            zh: "追加内容的反馈方式。",
            en: "Feedback treatment for appended content.",
          },
        },
        {
          name: "streaming",
          type: "boolean",
          default: "false",
          description: {
            zh: "显示输入光标并暴露 busy 状态。",
            en: "Show the typing caret and expose a busy state.",
          },
        },
        {
          name: "className",
          type: "string",
          description: { zh: "根元素样式覆盖。", en: "Root style override." },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "根元素使用礼貌级 `aria-live`，只播报流式变化。",
      en: "The root uses a polite `aria-live` region for streaming updates.",
    },
    {
      zh: "系统偏好减少动态效果时，token 动画会被禁用。",
      en: "Token animation is disabled when reduced motion is preferred.",
    },
  ],
};
