import { ThemeDefinition, ThemeImportResult } from "./themes.mjs";

//#region src/ThemeProvider/dtcg.d.ts
declare const MAX_THEME_FILE_SIZE: number;
interface ParseOptions {
  fileName?: string;
  fileSize?: number;
}
declare function parseDtcgTheme(input: unknown, options?: ParseOptions): ThemeImportResult;
declare function serializeDtcgTheme(theme: ThemeDefinition): string;
//#endregion
export { MAX_THEME_FILE_SIZE, parseDtcgTheme, serializeDtcgTheme };
//# sourceMappingURL=dtcg.d.mts.map