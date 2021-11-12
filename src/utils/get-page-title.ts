import defaultSettings from '@/utils/settings'

const title = defaultSettings.title || 'Vue3 Element Admin'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
