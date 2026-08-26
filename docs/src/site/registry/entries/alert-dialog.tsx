import { Button } from "aios-ui-kit/button";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "aios-ui-kit/alert-dialog";
import type { ComponentDoc } from "../types";

function Preview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Erase
      </AlertDialogTrigger>
      <AlertDialogContent destructive>
        <AlertDialogTitle destructive>Erase storage?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="secondary" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>
            Erase
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const alertDialogDoc: ComponentDoc = {
  slug: "alert-dialog",
  name: "AlertDialog",
  category: "overlays",
  status: "new",
  baseUi: "AlertDialog",
  description: {
    zh: "要求用户明确确认或取消的高风险对话框。",
    en: "A high-stakes dialog requiring an explicit confirm or cancel action.",
  },
  preview: () => <Preview />,
  importStatement: `import { AlertDialog, AlertDialogContent } from 'aios-ui-kit/alert-dialog'`,
  usageSnippet: `<AlertDialog>\n  <AlertDialogTrigger>Erase</AlertDialogTrigger>\n  <AlertDialogContent>…</AlertDialogContent>\n</AlertDialog>`,
  examples: [],
  api: [
    {
      name: "AlertDialogContent",
      props: [
        {
          name: "destructive",
          type: "boolean",
          default: "false",
          description: {
            zh: "启用红色危险操作强调。",
            en: "Enable destructive red emphasis.",
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "使用 alertdialog 语义并锁定焦点；不要提供右上角静默关闭按钮。",
      en: "Uses alertdialog semantics and traps focus; do not add a silent top-corner close control.",
    },
  ],
};
