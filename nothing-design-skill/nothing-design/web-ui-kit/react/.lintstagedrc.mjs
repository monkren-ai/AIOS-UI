export default {
  '*.md': ['prettier --write --no-error-on-unmatched-pattern'],
  '*.json': ['prettier --write --no-error-on-unmatched-pattern'],
  '*.{js,jsx}': ['prettier --write', 'eslint --fix'],
  '*.{ts,tsx}': ['prettier --parser=typescript --write', 'eslint --fix'],
  '*.css': ['prettier --write'],
};
