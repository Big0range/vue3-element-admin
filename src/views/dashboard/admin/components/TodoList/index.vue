<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, 'item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ capitalize(key) }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import * as types from './type'

import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filterList = {
  all: (todos: any) => todos,
  active: (todos: any) => todos.filter((todo: any) => !todo.done),
  completed: (todos: any) => todos.filter((todo: any) => todo.done)
}
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default defineComponent({
  components: {
    Todo
  },
  setup() {
    // 转化为复数形式
    const pluralize = (n: number, w: string) => (n === 1 ? w : w + 's')
    // 首字母大写
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    // 默认todo列表
    let todos = reactive<types.todos>(defalutList)
    // todos 过滤器
    const filters = reactive(filterList)
    // 过滤类型
    const visibility = ref<types.visibility>('all')
    // 筛选
    const filteredTodos: any = computed(() => filters[visibility.value](todos))
    // 全部
    const allChecked = computed(() => todos.every((todo) => todo.done))
    // 剩余
    const remaining = computed(() => todos.filter((todo) => !todo.done).length)
    // 本地存储
    const setLocalStorage = () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
    // 添加
    const addTodo = (e: any) => {
      const text = e.target.value
      if (text.trim()) {
        todos.push({
          text,
          done: false
        })
        setLocalStorage()
      }
      e.target.value = ''
    }
    // 注释太累了
    const toggleTodo = (val: types.todo) => {
      val.done = !val.done
      setLocalStorage()
    }
    const deleteTodo = (todo: types.todo) => {
      todos.splice(todos.indexOf(todo), 1)
      setLocalStorage()
    }
    const editTodo = ({ todo, value }: { todo: types.todo; value: string }) => {
      todo.text = value
      setLocalStorage()
    }
    const clearCompleted = () => {
      todos = reactive(todos.filter((todo) => !todo.done))
      setLocalStorage()
    }
    const toggleAll = ({ done }: { done: boolean }) => {
      todos.forEach((todo) => {
        todo.done = done
        setLocalStorage()
      })
    }
    return {
      pluralize,
      capitalize,
      todos,
      filters,
      visibility,
      filteredTodos,
      allChecked,
      remaining,
      setLocalStorage,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleAll
    }
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
