/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Auto-detect base path for GitHub Pages. For user/organization sites (*.github.io), base is '/'.
// For project sites, base is '/<repo>/'. You can override with BASE_PATH env var.
export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY || ''
  const repoName = repo.split('/')[1] || ''
  const isUserSite = /\.github\.io$/i.test(repoName)
  const base = process.env.BASE_PATH ?? (isUserSite ? '/' : repoName ? `/${repoName}/` : '/')
  return {
    plugins: [react()],
    base,
  }
})
