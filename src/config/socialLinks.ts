// Social Links Configuration - uses environment variables with safe fallbacks
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL ?? '#',
  linkedin: import.meta.env.VITE_LINKEDIN_URL ?? '#',
  email: import.meta.env.VITE_EMAIL ?? 'iqrahoque02@gmail.com',
  
  // GitHub repository URLs
  repositories: {
    projectOne: import.meta.env.VITE_GITHUB_PROJECT1_URL ?? 'https://github.com/divyashrma18/chinese-menu',
    projectTwo: import.meta.env.VITE_GITHUB_PROJECT2_URL ?? 'https://github.com/nawaf-al-hussain/music-player',
    projectThree: import.meta.env.VITE_GITHUB_PROJECT3_URL ?? '#',
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL ?? '#',
  },
  
  // Formatted display names (extracted from environment variables)
  display: {
    github: import.meta.env.VITE_GITHUB_URL?.replace('https://', '') ?? '',
    linkedin: import.meta.env.VITE_LINKEDIN_URL?.replace('https://', '') ?? '',
    email: import.meta.env.VITE_EMAIL ?? 'iqrahoque02@gmail.com',
  }
};

export default socialLinks;