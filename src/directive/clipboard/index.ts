import { Directive } from 'vue'

const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}
export const clipboard: Directive = {
  mounted(el, binding) {
    const { value, arg } = binding
    let cb: (event?: any) => void
    if (arg) {
      if (['success', 'error'].includes(arg) && typeof value !== 'function') {
        console.error(`指令clipboard ${arg} 请传入function类型`)
        cb = () => {}
      } else if (['success', 'error'].includes(arg) && typeof value === 'function') {
        cb = value
      }
    }
    if (arg === 'success') {
      el.onSuccess = value
    } else if (arg === 'error') {
      el.onError = value
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value
        },
        action() {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        }
      })

      clipboard.on('success', (e: any) => {
        const callback = el.onSuccess
        callback && callback(e)
      })
      clipboard.on('error', (e: any) => {
        const callback = el.onError
        callback && callback(e)
      })
      el.clipboard = clipboard
    }
  },
  updated(el, binding) {
    const { value, arg } = binding
    let cb: (event?: any) => void
    if (['success', 'error'].includes(value) && typeof value === 'function') {
      console.error(`指令clipboard ${arg} 请传入function类型`)
      cb = () => {}
    }
    if (arg === 'success') {
      el.onSuccess = value
    } else if (arg === 'error') {
      el.onError = value
    } else {
      if (el.clipboard && el.clipboard.text) {
        el.clipboard.text = function () {
          return binding.value
        }
      }
      if (el.clipboard && el.clipboard.action) {
        el.clipboard.action = function () {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        }
      }
    }
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') {
      delete el.onSuccess
    } else if (binding.arg === 'error') {
      delete el.onError
    } else {
      el.clipboard?.destroy()
      delete el.clipboard
    }
  }
}
