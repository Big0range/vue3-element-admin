<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)" />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  directives: {
    focus: {
      mounted(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  emits: ['deleteTodo', 'editTodo', 'toggleTodo'],
  setup(props: { todo: any }, context) {
    const editing = ref(false)
    const deleteTodo = (todo: any) => {
      context.emit('deleteTodo', todo)
    }
    const editTodo = ({ todo, value }: { todo: any; value: any }) => {
      context.emit('editTodo', { todo, value })
    }
    const toggleTodo = (todo: any) => {
      context.emit('toggleTodo', todo)
    }
    const doneEdit = (e: any) => {
      const value = e.target.value.trim()
      const todo = props.todo
      if (!value) {
        deleteTodo({
          todo
        })
      } else if (editing.value) {
        editTodo({
          todo,
          value
        })
        editing.value = false
      }
    }
    const cancelEdit = (e: any) => {
      e.target.value = props.todo.text
      editing.value = false
    }
    return {
      editing,
      deleteTodo,
      editTodo,
      toggleTodo,
      doneEdit,
      cancelEdit
    }
  }
})
</script>
