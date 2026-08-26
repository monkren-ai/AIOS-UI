import { CodeBlock } from "aios-ui-kit/code-block";

export default function CodeBlockBasic() {
  return (
    <CodeBlock
      filename="agent.ts"
      language="ts"
      code={'export const state = "running"\nconsole.log(state)'}
      showLineNumbers
    />
  );
}
