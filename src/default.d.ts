declare const VUE_APP_NOT_SECRET_CODE: string
interface PromiseConstructor {
  new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>
}
declare module '*.scss' {
  interface Scss {
    theme: string
  }
  const scss: Scss
  export default scss
}

declare module 'screenfull' {
  type RawEventNames = {
    readonly requestFullscreen: string
    readonly exitFullscreen: string
    readonly fullscreenElement: string
    readonly fullscreenEnabled: string
    readonly fullscreenchange: string
    readonly fullscreenerror: string
  }

  type EventName = 'change' | 'error'

  interface IScreenfullBase {
    readonly isFullscreen: boolean
    readonly element: Element | null
    readonly enabled: boolean
    raw: RawEventNames
    request(element?: Element): Promise<void>
    exit(): Promise<void>
    toggle(element?: Element): Promise<void>
    on(name: EventName, handler: (event: Event) => void): void
    off(name: EventName, handler: (event: Event) => void): void
    onchange(handler: (event: Event) => void): void
    onerror(handler: (event: Event) => void): void
  }
  const screenfull: IScreenfullBase
  export default screenfull
}

interface Window {
  tinymce?: any
}

interface GlobalEventHandlers {
  width: number
  height: number
}

declare module 'path-to-regexp' {
  const pathToRegexp: { compile: (path: string) => any }
  export default pathToRegexp
}
