let callbacks: any[] = []

function loadedTinymce() {
  // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2144
  // check is successfully downloaded script
  return window.tinymce
}
// error 回调函数
interface ICallback {
  (...arg: any[]): void
}
const dynamicLoadScript = (src: string, callback: ICallback) => {
  // 获取当前script DOM元素
  const existingScript = document.getElementById(src)
  const cb = callback

  // script DOM 不存在  则未加载
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src // src url for the third-party library being loaded.
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
    stdOnEnd(script)
  }

  if (existingScript && cb) {
    if (loadedTinymce()) {
      cb(null, existingScript)
    } else {
      callbacks.push(cb)
    }
  }

  function stdOnEnd(script: HTMLScriptElement) {
    script.onload = function () {
      this.onerror = this.onload = null
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks = []
    }
    script.onerror = function () {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }
}

export default dynamicLoadScript
