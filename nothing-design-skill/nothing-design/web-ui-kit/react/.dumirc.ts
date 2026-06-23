import { resolve } from 'node:path';
import { defineConfig } from 'dumi';
import type { SiteThemeConfig } from 'dumi-theme-lobehub';
import { description, name } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
const homepage = 'https://github.com/nothing-ui/nothing-ui';

const themeConfig: SiteThemeConfig = {
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
  base: '/',
  define: {
    'process.env': process.env,
  },
  favicons: ['/favicon.ico'],
  locales: [{ id: 'en-US', name: 'English' }],
  mfsu: {},
  npmClient: 'npm',
  publicPath: '/',
  resolve: {
    atomDirs: [{ dir: 'src', type: 'component' }],
    entryFile: isProduction ? './src/index.ts' : undefined,
  },
  styles: [
    `html, body { background: transparent; }
    @media (prefers-color-scheme: dark) {
      html, body { background: #000; }
    }`,
  ],
  themeConfig,
  title: 'Nothing UI',
});
