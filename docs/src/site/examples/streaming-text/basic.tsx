import * as React from "react";
import { StreamingText } from "aios-ui-kit/conversation";
import { Button } from "aios-ui-kit/button";

const chunks = [
  "正在分析任务。 / Analyzing the task.",
  " 正在检查相关组件。 / Checking related components.",
  " 已生成可验证的结果。 / The verifiable result is ready.",
];

export default function StreamingTextBasic() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (count >= chunks.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 720);
    return () => window.clearTimeout(timer);
  }, [count]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <div className="min-h-24 border border-border-visible bg-surface p-4 text-body-sm leading-6">
        <StreamingText variant="fade" streaming={count < chunks.length}>
          {chunks.slice(0, count).join("")}
        </StreamingText>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            setCount((value) => Math.min(chunks.length, value + 1))
          }
          disabled={count >= chunks.length}
        >
          追加文本 / Append text
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCount(0)}
          disabled={count === 0}
        >
          重播 / Replay
        </Button>
      </div>
      <div className="grid gap-3 text-body-sm sm:grid-cols-3">
        <p>
          <strong className="font-mono text-caption">PLAIN</strong>
          <br />
          <StreamingText variant="plain">立即显示 / Immediate</StreamingText>
        </p>
        <p>
          <strong className="font-mono text-caption">FADE</strong>
          <br />
          <StreamingText variant="fade">柔和追加 / Soft append</StreamingText>
        </p>
        <p>
          <strong className="font-mono text-caption">TAIL</strong>
          <br />
          <StreamingText variant="tail">尾部提示 / Tail cue</StreamingText>
        </p>
      </div>
    </div>
  );
}
