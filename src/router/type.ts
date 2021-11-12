import { RouteRecordRaw as RouteRecordRawCopy } from 'vue-router'
import { Component } from 'vue'
export type RouteRecordRaw = RouteRecordRawCopy & {
  hidden?: boolean
  children?: RouteRecordRaw[]
  alwaysShow?: boolean
}
