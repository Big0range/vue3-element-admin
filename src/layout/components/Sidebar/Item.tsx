import { Fragment } from 'vue'

export default function (props: { icon: string; title: string; showTitle: boolean }) {
  const { icon, title, showTitle = true } = props
  return (
    <Fragment>
      {icon &&
        (icon.includes('el-icon') ? (
          <i class={icon + ' sub-el-icon sidebar-item-icon'} />
        ) : (
          <svg-icon className="sidebar-item-icon" icon-class={icon} />
        ))}
      {title && showTitle && <span class="sidebar-item-title">{title}</span>}
    </Fragment>
  )
}
