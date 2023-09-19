import { ss } from '@/utils/storage'

const LOCAL_NAME = 'appSetting'

export type Theme = 'light' | 'dark' | 'auto'

export type Language = 'zh-CN' | 'zh-TW' | 'en-US' | 'ko-KR' | 'ru-RU'

export interface AppState {
  siderCollapsed: boolean
  theme: Theme
  language: Language
}

export function defaultSetting(): AppState {
  let lang: Language = 'zh-CN'
  // 这里新增浏览器本地语言支持。暂不支持日语ja
  type ChromeLanguage = 'zh' | 'en' | 'ko' | 'ru'
  type MergedLanguage = Language | ChromeLanguage
  // 创建包含所有字面量的数组
  const languageArray: Language[] = ['zh-CN', 'zh-TW', 'en-US', 'ko-KR', 'ru-RU']
  const mergedLanguageArray: MergedLanguage[] = [...languageArray, 'zh', 'en', 'ko', 'ru']
  const indexOf = mergedLanguageArray.indexOf(navigator.language as any)
  if (indexOf > 0) {
    switch (mergedLanguageArray[indexOf]) {
      case 'zh':
        lang = 'zh-CN'
        break
      case 'en':
        lang = 'en-US'
        break
      case 'ko':
        lang = 'ko-KR'
        break
      case 'ru':
        lang = 'ru-RU'
        break
      default:
        lang = languageArray[indexOf]
    }
  }
  return { siderCollapsed: false, theme: 'light', language: lang }
  // return { siderCollapsed: false, theme: 'light', language: 'zh-CN' }
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  // 后面对象覆盖逗号前面对象
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalSetting(setting: AppState): void {
  ss.set(LOCAL_NAME, setting)
}
