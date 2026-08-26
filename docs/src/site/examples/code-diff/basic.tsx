import { CodeDiff } from "aios-ui-kit/code-diff";

export default function CodeDiffBasic() {
  return (
    <CodeDiff
      filename="agent.ts"
      lines={[
        { oldLine: 1, type: "remove", content: 'const state = "idle"' },
        { newLine: 1, type: "add", content: 'const state = "running"' },
      ]}
    />
  );
}
