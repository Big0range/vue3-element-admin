import { Directive } from 'vue'
import dayjs from 'dayjs'

export const parseTime: Directive = {
  created(el: HTMLElement, { value }) {
    const format = value || 'YYYY年MM月DD日 HH:mm:ss'
    const date = el.innerText
    const foramtTime = dayjs(date).format(format)
    el.innerText = foramtTime
  }
}
