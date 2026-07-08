import { resolve } from 'node:path';
import { defineConfig } from 'dumi';
import { description, name } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'Nothing-UI';
const basePath = `/${repoName}/`;
const homepage = `https://github.com/monkren-ai/${repoName}`;

const themeConfig = {
  actions: [
    {
      github: true,
      link: homepage,
      openExternal: true,
      text: 'GitHub',
    },
    {
      link: '/components/button',
      text: 'Get Started',
      type: 'primary',
    },
  ],
  apiHeader: {
    docUrl: `{github}/tree/master/src/{atomId}/index.md`,
    match: ['/components'],
    pkg: name,
    sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
  },
  description,
  lastUpdated: true,
  name: 'Nothing UI',
  nav: [
    { link: '/components/button', title: 'Components' },
    { link: '/showcase', title: 'Showcase' },
    { link: '/changelog', title: 'Changelog' },
  ],
  prefersColor: {
    default: 'dark',
    switch: true,
  },
  socialLinks: {
    github: homepage,
  },
  title: 'Nothing UI',
};

export default defineConfig({
  alias: {
    '@': resolve(__dirname, './src'),
  },
  apiParser: isProduction ? {} : false,
  base: basePath,
  define: {
    'process.env': process.env,
  },
  favicons: ['/favicon.ico'],
  locales: [{ id: 'en-US', name: 'English' }],
  mfsu: {},
  npmClient: 'npm',
  publicPath: basePath,
  resolve: {
    atomDirs: [{ dir: 'src', type: 'component' }],
    entryFile: './src/index.ts',
  },
  styles: [
    `html, body { background: #000; }
    html[data-prefers-color="light"],
    html[data-prefers-color="light"] body { background: #fff; }
    .dumi-default-previewer-demo {
      background: var(--surface, #111);
      color: var(--text-primary, #E8E8E8);
      padding: 24px;
      border-radius: 8px;
    }
    html[data-prefers-color="light"] .dumi-default-previewer-demo {
      background: var(--surface, #FFFFFF);
      color: var(--text-primary, #1A1A1A);
    }`,
  ],
  themeConfig,
  title: 'Nothing UI',
});
