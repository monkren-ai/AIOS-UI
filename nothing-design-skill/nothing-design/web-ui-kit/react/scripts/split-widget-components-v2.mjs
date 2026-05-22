/**
 * V2 Script to split WidgetSubComponents.tsx into individual component files.
 * This version properly handles:
 * - Internal function dependencies (transitive closure)
 * - Cross-file imports for exported dependencies
 * - Color token replacement
 * - ARIA attributes
 * - className merging
 * - Proper var() nesting
 * 
 * Run: node scripts/split-widget-components-v2.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, '..', 'src', 'components', 'widgets');
const SUB_DIR = path.resolve(SRC_DIR, 'sub');
const INPUT_FILE = '/tmp/WidgetSubComponents_original.tsx';

// Ensure sub directory exists and is clean
if (fs.existsSync(SUB_DIR)) {
  fs.rmSync(SUB_DIR, { recursive: true });
}
fs.mkdirSync(SUB_DIR, { recursive: true });

const content = fs.readFileSync(INPUT_FILE, 'utf-8');
const lines = content.split('\n');

// ---- Parse all functions (exported and internal) ----
const functions = []; // { name, exported, startLine, endLine, code }
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();
  
  const exportMatch = trimmed.match(/^export\s+function\s+(\w+)\s*\(/);
  const internalMatch = trimmed.match(/^function\s+(\w+)\s*\(/);
  
  if (exportMatch || internalMatch) {
    const isExported = !!exportMatch;
    const name = isExported ? exportMatch[1] : internalMatch[1];
    const startLine = i;
    
    // Find the end of the function by tracking braces
    let braceDepth = 0;
    let foundOpenBrace = false;
    let endLine = i;
    
    for (let j = i; j < lines.length; j++) {
      for (const ch of lines[j]) {
        if (ch === '{') {
          braceDepth++;
          foundOpenBrace = true;
        }
        if (ch === '}') braceDepth--;
      }
      if (foundOpenBrace && braceDepth === 0) {
        endLine = j;
        break;
      }
    }
    
    const code = lines.slice(startLine, endLine + 1).join('\n');
    functions.push({ name, exported: isExported, startLine, endLine, code });
    i = endLine + 1;
  } else {
    i++;
  }
}

console.log(`Parsed ${functions.length} functions (${functions.filter(f => f.exported).length} exported, ${functions.filter(f => !f.exported).length} internal)`);

// ---- Build function map ----
const funcMap = {};
for (const f of functions) {
  funcMap[f.name] = f;
}

// ---- Find all function references in a piece of code ----
function findReferencedFunctions(code) {
  const refs = new Set();
  for (const f of functions) {
    // Match as JSX component: <FuncName or as function call: FuncName(
    const jsxRegex = new RegExp(`<${f.name}[\\s/>]`);
    const callRegex = new RegExp(`\\b${f.name}\\s*\\(`);
    if (jsxRegex.test(code) || callRegex.test(code)) {
      refs.add(f.name);
    }
  }
  return refs;
}

// ---- Get all transitive dependencies (internal only) ----
function getAllInternalDeps(funcName, visited = new Set()) {
  if (visited.has(funcName)) return new Set();
  visited.add(funcName);
  
  const func = funcMap[funcName];
  if (!func) return new Set();
  
  const directRefs = findReferencedFunctions(func.code);
  const result = new Set();
  
  for (const ref of directRefs) {
    if (ref === funcName) continue;
    const refFunc = funcMap[ref];
    if (!refFunc) continue;
    
    if (!refFunc.exported) {
      result.add(ref);
      const transitive = getAllInternalDeps(ref, visited);
      for (const t of transitive) {
        result.add(t);
      }
    }
  }
  
  return result;
}

// ---- Get all exported dependencies ----
function getExportedDeps(funcName, visited = new Set()) {
  if (visited.has(funcName)) return new Set();
  visited.add(funcName);
  
  const func = funcMap[funcName];
  if (!func) return new Set();
  
  const directRefs = findReferencedFunctions(func.code);
  const result = new Set();
  
  for (const ref of directRefs) {
    if (ref === funcName) continue;
    const refFunc = funcMap[ref];
    if (!refFunc) continue;
    
    if (refFunc.exported) {
      result.add(ref);
    }
    // Also check transitive through internal deps
    if (!refFunc.exported) {
      const transitive = getExportedDeps(ref, visited);
      for (const t of transitive) result.add(t);
    }
  }
  
  return result;
}

// ---- Define grouping: which exported components go in which file ----
const groups = {
  'Record2': ['Record2'],
  'LocationAccess': ['LocationAccess'],
  'WatchAnalog': ['WatchAnalog'],
  'Compass': ['Compass'],
  'TempControl': ['TempControl'],
  'AutoRotate1': ['AutoRotate1'],
  'Active': ['Active'],
  'Watch1': ['Watch1'],
  'Active1': ['Active1'],
  'Recording': ['Recording'],
  'Glyphs1': ['Glyphs1'],
  'LocationAccess1': ['LocationAccess1'],
  'Glyphs2': ['Glyphs2'],
  'Campus': ['Campus'],
  'Location1': ['Location1'],
  'Flash': ['Flash'],
  'Weather1': ['Weather1'],
  'MicAccess': ['MicAccess'],
  'PairNewDevice': ['PairNewDevice'],
  'OverLimit': ['OverLimit', 'Overlimit'],
  'MusicPlayer': ['MusicPlayer', 'Icons', 'LoadingBar', 'Info3', 'Bullet'],
  'TotalTime': ['TotalTime', 'Graphic', 'Info4'],
  'StepsCounter': ['StepsCounter', 'StepsCount', 'Streak'],
  'OverLimit1': ['OverLimit1', 'Arrow', 'Icon32', 'LimitCount'],
  'LoadingBar1': ['LoadingBar1', 'LoadingBar2'],
  'Card': ['Card', 'Card1'],
  'Dots3': ['Dots3', 'Dots4'],
  'Play': ['Play', 'Dots5'],
  'NothingEar': ['NothingEar', 'Image'],
  'Card2': ['Card2'],
  'Date': ['Date', 'Date1'],
  'Counter': ['Counter', 'Dots6'],
  'Music': ['Music', 'Group1'],
  'Device': ['Device', 'Dots7'],
  'Mode': ['Mode', 'Icon33', 'Group30'],
  'DoubleDown': ['DoubleDown'],
  'SelectDevice': ['SelectDevice', 'Device1'],
  'Card3': ['Card3'],
  'ActivityTracker': ['ActivityTracker', 'Markers', 'Dates'],
  'Time': ['Time'],
  'Weather2': ['Weather2'],
  'Wedget': ['Wedget'],
};

// Build reverse map: exported name → file name
const exportToFile = {};
for (const [fileName, exportedNames] of Object.entries(groups)) {
  for (const expName of exportedNames) {
    exportToFile[expName] = fileName;
  }
}

// ---- Color token replacement ----
function replaceColors(code) {
  let result = code;
  
  // Map of hex colors to CSS custom properties
  const colorMap = [
    // Exact hex matches in fill/stroke attributes and var() fallbacks
    { hex: '#1A1D1C', token: 'var(--widget-dark-bg)', p3: null },
    { hex: '#1a1d1c', token: 'var(--widget-dark-bg)', p3: null },
    { hex: '#FCFAFE', token: 'var(--widget-card-bg)', p3: null },
    { hex: '#fcfafe', token: 'var(--widget-card-bg)', p3: null },
    { hex: '#D71921', token: 'var(--widget-primary)', p3: 'color(display-p3 0.8431 0.0980 0.1294)' },
    { hex: '#d71921', token: 'var(--widget-primary)', p3: null },
    { hex: '#3B393E', token: 'var(--widget-dark-2)', p3: 'color(display-p3 0.2314 0.2235 0.2431)' },
    { hex: '#3b393e', token: 'var(--widget-dark-2)', p3: null },
    { hex: '#6C696E', token: 'var(--widget-dark-3)', p3: null },
    { hex: '#6c696e', token: 'var(--widget-dark-3)', p3: null },
    { hex: '#AEABB1', token: 'var(--widget-dark-4)', p3: null },
    { hex: '#aeabb1', token: 'var(--widget-dark-4)', p3: null },
    { hex: '#E1E5EA', token: 'var(--widget-bg)', p3: null },
    { hex: '#e1e5ea', token: 'var(--widget-bg)', p3: null },
    { hex: '#E7EAE9', token: 'var(--widget-dot-active, #E7EAE9)', p3: null },
    { hex: '#e7eae9', token: 'var(--widget-dot-active, #E7EAE9)', p3: null },
    { hex: '#881532', token: 'var(--widget-primary-dark, #881532)', p3: null },
    { hex: '#939196', token: 'var(--widget-dark-5, #939196)', p3: null },
  ];
  
  for (const { hex, token } of colorMap) {
    // Replace in var(--fill-N, #XXXXXX) or var(--stroke-N, #XXXXXX)
    const varRegex = new RegExp(`var\\(--(?:fill|stroke)-\\d+,\\s*${hex.replace('#', '\\#')}\\)`, 'g');
    result = result.replace(varRegex, `var(--fill-0, ${token})`);
    
    // Replace standalone hex in fill="..." or stroke="..." attributes
    const attrRegex = new RegExp(`(fill|stroke)="${hex.replace('#', '\\#')}"`, 'g');
    result = result.replace(attrRegex, `$1="${token}"`);
  }
  
  // Replace "white" with var(--widget-white) in fill/stroke attributes
  result = result.replace(/fill="white"/g, 'fill="var(--widget-white)"');
  result = result.replace(/stroke="white"/g, 'stroke="var(--widget-white)"');
  
  // Replace in style={{ fill: "white" }} etc.
  result = result.replace(/fill:\s*"white"/g, 'fill: "var(--widget-white)"');
  result = result.replace(/stroke:\s*"white"/g, 'stroke: "var(--widget-white)"');
  
  // Replace var(--fill-0, white) with var(--fill-0, var(--widget-white))
  result = result.replace(/var\(--(?:fill|stroke)-\d+,\s*white\)/g, 'var(--fill-0, var(--widget-white))');
  
  return result;
}

// ---- Modify function signature to accept new props ----
function modifyExportedFunction(code, funcName) {
  // Replace the old signature pattern
  // Old: export function Name({ style }: { style?: React.CSSProperties })
  // New: export function Name({ theme, size, className, 'aria-label': ariaLabel, style }: WidgetSubComponentProps)
  
  const newProps = `{
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}`;
  
  // Match various old signature patterns
  const patterns = [
    // Pattern: { style }: { style?: React.CSSProperties }
    new RegExp(`(export function ${funcName}\\s*\\()\\s*\\{\\s*style\\s*\\}\\s*:\\s*\\{\\s*style\\?\\s*:\\s*React\\.CSSProperties\\s*\\}\\s*\\)`, 'g'),
    // Pattern: { style = {} }: { style?: React.CSSProperties }
    new RegExp(`(export function ${funcName}\\s*\\()\\s*\\{\\s*style\\s*=\\s*\\{\\}\\s*\\}\\s*:\\s*\\{\\s*style\\?\\s*:\\s*React\\.CSSProperties\\s*\\}\\s*\\)`, 'g'),
  ];
  
  let result = code;
  for (const pattern of patterns) {
    result = result.replace(pattern, `export function ${funcName}({ theme, size, className, 'aria-label': ariaLabel, style }: ${newProps})`);
  }
  
  // Modify the top-level div to merge className and add aria-label
  // Find the first <div after the function signature
  const funcStart = result.indexOf(`export function ${funcName}`);
  if (funcStart === -1) return result;
  
  // Find the first return statement
  const returnIdx = result.indexOf('return (', funcStart);
  if (returnIdx === -1) return result;
  
  // Find the first <div after return
  const firstDivIdx = result.indexOf('<div', returnIdx);
  if (firstDivIdx === -1) return result;
  
  // Find the end of the opening div tag
  let divEndIdx = firstDivIdx;
  let inString = false;
  let stringChar = '';
  while (divEndIdx < result.length) {
    const ch = result[divEndIdx];
    if (inString) {
      if (ch === stringChar && result[divEndIdx - 1] !== '\\') inString = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
      }
      if (ch === '>') break;
    }
    divEndIdx++;
  }
  
  const divTag = result.substring(firstDivIdx, divEndIdx + 1);
  
  // Merge className
  let newDivTag = divTag;
  const classNameMatch = divTag.match(/className="([^"]*)"/);
  if (classNameMatch) {
    const staticClass = classNameMatch[1];
    newDivTag = divTag.replace(
      `className="${staticClass}"`,
      `className={\`${staticClass} \${className || ''}\`.trim()}`
    );
  } else if (divTag.includes('className={')) {
    // Already has dynamic className, merge with it
    newDivTag = divTag.replace(
      /className=\{style\}/,
      `className={className}`
    );
  }
  
  // Add style prop if not present
  if (!newDivTag.includes('style={')) {
    newDivTag = newDivTag.replace('>', ' style={style}>');
  }
  
  // Add aria-label from data-name or use provided ariaLabel
  if (!newDivTag.includes('aria-label') && !newDivTag.includes('aria-hidden')) {
    const dataNameMatch = newDivTag.match(/data-name="([^"]*)"/);
    if (dataNameMatch) {
      const dataName = dataNameMatch[1];
      newDivTag = newDivTag.replace(
        `data-name="${dataName}"`,
        `data-name="${dataName}" aria-label={ariaLabel || "${dataName}"}`
      );
    } else {
      newDivTag = newDivTag.replace('>', ` aria-label={ariaLabel || "${funcName}"}>`);
    }
  }
  
  result = result.substring(0, firstDivIdx) + newDivTag + result.substring(divEndIdx + 1);
  
  return result;
}

// ---- Modify internal function to add aria-hidden ----
function modifyInternalFunction(code, funcName) {
  const funcStart = code.indexOf(`function ${funcName}`);
  if (funcStart === -1) return code;
  
  // Find the first <div or <svg after the function
  const returnIdx = code.indexOf('return', funcStart);
  if (returnIdx === -1) return code;
  
  // Check if this function renders text content
  const funcCode = code.substring(funcStart);
  const hasTextContent = funcCode.includes('<p>') || funcCode.includes('<span>');
  
  if (!hasTextContent) {
    // Add aria-hidden to the first element
    const firstElemIdx = funcCode.search(/<div|<svg/);
    if (firstElemIdx !== -1) {
      const elemEnd = funcCode.indexOf('>', firstElemIdx);
      const elemTag = funcCode.substring(firstElemIdx, elemEnd + 1);
      if (!elemTag.includes('aria-hidden') && !elemTag.includes('aria-label')) {
        const newElemTag = elemTag.replace('>', ' aria-hidden="true">');
        const newFuncCode = funcCode.substring(0, firstElemIdx) + newElemTag + funcCode.substring(elemEnd + 1);
        code = code.substring(0, funcStart) + newFuncCode;
      }
    }
  }
  
  return code;
}

// ---- Generate files ----
const allExportedNames = [];

for (const [fileName, exportedNames] of Object.entries(groups)) {
  console.log(`\nProcessing ${fileName}.tsx (exports: ${exportedNames.join(', ')})`);
  
  // Collect all functions needed for this file
  const allFuncsNeeded = [];
  const includedNames = new Set();
  
  for (const expName of exportedNames) {
    const func = funcMap[expName];
    if (!func) {
      console.warn(`  WARNING: Function ${expName} not found!`);
      continue;
    }
    
    if (!includedNames.has(expName)) {
      allFuncsNeeded.push(func);
      includedNames.add(expName);
    }
    
    // Get all internal dependencies
    const internalDeps = getAllInternalDeps(expName);
    for (const depName of internalDeps) {
      if (!includedNames.has(depName)) {
        const depFunc = funcMap[depName];
        if (depFunc) {
          allFuncsNeeded.push(depFunc);
          includedNames.add(depName);
        }
      }
    }
  }
  
  // Sort: internal functions first (by line number), then exported (by line number)
  allFuncsNeeded.sort((a, b) => {
    if (!a.exported && b.exported) return -1;
    if (a.exported && !b.exported) return 1;
    return a.startLine - b.startLine;
  });
  
  console.log(`  Functions: ${allFuncsNeeded.map(f => `${f.exported ? 'E' : 'I'}:${f.name}`).join(', ')}`);
  
  // Build the code for this file
  let funcCode = '';
  for (const func of allFuncsNeeded) {
    let code = func.code;
    
    if (func.exported) {
      code = modifyExportedFunction(code, func.name);
    } else {
      code = modifyInternalFunction(code, func.name);
    }
    
    funcCode += code + '\n\n';
  }
  
  // Apply color replacements
  funcCode = replaceColors(funcCode);
  
  // Determine cross-file imports (exported components used by this file but defined elsewhere)
  const crossFileImports = {};
  for (const func of allFuncsNeeded) {
    const refs = findReferencedFunctions(func.code);
    for (const ref of refs) {
      if (ref === func.name) continue;
      const refFunc = funcMap[ref];
      if (!refFunc) continue;
      if (refFunc.exported && !exportedNames.includes(ref)) {
        const refFile = exportToFile[ref];
        if (refFile && refFile !== fileName) {
          if (!crossFileImports[refFile]) crossFileImports[refFile] = [];
          if (!crossFileImports[refFile].includes(ref)) crossFileImports[refFile].push(ref);
        }
      }
    }
  }
  
  // Determine which imports are needed
  const needsSvgPaths = funcCode.includes('svgPaths');
  const needsReact = true; // Always needed for types
  
  // Check for image imports
  const imageImports = [];
  if (funcCode.includes('imgImage') && !funcCode.includes('imgImage1') && !funcCode.includes('imgImage2') && !funcCode.includes('imgImage3') && !funcCode.includes('imgImage5')) {
    imageImports.push("import imgImage from '../../../assets/images/069cf4a7d68229b16958df0e634b08f7e38a57a5.png';");
  }
  if (funcCode.includes('imgImage1')) {
    imageImports.push("import imgImage1 from '../../../assets/images/d4958924652b57d9264472fb648b23352acb5efe.png';");
  }
  if (funcCode.includes('imgRectangle14')) {
    imageImports.push("import imgRectangle14 from '../../../assets/images/a0a6cb8be18624a2222418a1e4e27381fc343af8.png';");
  }
  if (funcCode.includes('imgImage5')) {
    imageImports.push("import imgImage5 from '../../../assets/images/8fd879d735c082acd40888c7284af2fafd403f6a.png';");
  }
  if (funcCode.includes('imgImage2')) {
    imageImports.push("import imgImage2 from '../../../assets/images/7a8b290651784fe12426559d68090e7c46995862.png';");
  }
  if (funcCode.includes('imgRectangle13')) {
    imageImports.push("import imgRectangle13 from '../../../assets/images/fb6b3399e50e8d3dd4c4dc30de4861f4891a87e9.png';");
  }
  if (funcCode.includes('imgImage3')) {
    imageImports.push("import imgImage3 from '../../../assets/images/08fa5ab888d375f4821c4d4815b806ab537f90ed.png';");
  }
  
  // Build import section
  let imports = "import React from 'react';\n";
  if (needsSvgPaths) {
    imports += "import svgPaths from '../widget-svg-paths';\n";
  }
  for (const imgImport of imageImports) {
    imports += imgImport + '\n';
  }
  
  // Add cross-file imports
  for (const [refFile, refNames] of Object.entries(crossFileImports)) {
    imports += `import { ${refNames.join(', ')} } from './${refFile}';\n`;
  }
  
  // Build the complete file content
  const fileContent = `${imports}\n${funcCode.trim()}\n`;
  
  // Write the file
  const filePath = path.resolve(SUB_DIR, `${fileName}.tsx`);
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`  Created: ${fileName}.tsx`);
  
  // Track exported names for the index file
  for (const expName of exportedNames) {
    allExportedNames.push({ name: expName, file: fileName });
  }
}

// ---- Create index.ts ----
let indexContent = '// Auto-generated index - re-exports all widget sub-components\n';
for (const [fileName, exportedNames] of Object.entries(groups)) {
  indexContent += `export { ${exportedNames.join(', ')} } from './${fileName}';\n`;
}
fs.writeFileSync(path.resolve(SUB_DIR, 'index.ts'), indexContent, 'utf-8');
console.log('\nCreated: index.ts');

// ---- Update original WidgetSubComponents.tsx ----
const reexportContent = `// Auto-generated re-export file for backward compatibility
// All components have been moved to ./sub/
export * from './sub/index';
`;
const targetFile = path.resolve(SRC_DIR, 'WidgetSubComponents.tsx');
fs.writeFileSync(targetFile, reexportContent, 'utf-8');
console.log('Updated: WidgetSubComponents.tsx (now re-exports from ./sub/)');

console.log('\n✅ Split complete!');
