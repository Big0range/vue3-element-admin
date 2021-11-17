import { App, nextTick } from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/utils/settings'

const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog) && env) {
    return needErrorLog.includes(env)
  }
  return false
}

export default function (app: App) {
  if (checkNeed()) {
    app.config.errorHandler = function (err, vm, info) {
      nextTick(() => {
        console.log(vm)
        store.dispatch('errorLog/addErrorLog', {
          err,
          vm,
          info,
          url: window.location.href
        })
      })
      // nextTick(() => {
      //   store.dispatch('errorLog/addErrorLog', {
      //     err,
      //     vm,
      //     info,
      //     url: window.location.href
      //   })
      //   // console.error(err, info)
      // })
    }
  }
}
