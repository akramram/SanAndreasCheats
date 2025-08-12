/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // For GitHub Pages deployment, use the repository name as base path
  const repo = process.env.GITHUB_REPOSITORY || ''
  const repoName = repo.split('/')[1] || ''
  
  // Check if this is a GitHub Pages user/org site (ends with .github.io)
  const isUserSite = /\.github\.io$/i.test(repoName)
  
  // Set base path: '/' for user sites, '/<repo-name>/' for project sites
  let base = '/'
  if (!isUserSite && repoName) {
    base = `/${repoName}/`
  }
  
  // Allow override with BASE_PATH environment variable
  if (process.env.BASE_PATH) {
    base = process.env.BASE_PATH
  }
  
  console.log(`Building with base path: ${base}`)
  
  return {
    plugins: [react()],
    base,
  }
})
