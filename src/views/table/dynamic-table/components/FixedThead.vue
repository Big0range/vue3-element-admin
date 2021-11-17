<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 这里只能绑定ref的值 (checkboxVal) -->
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple"> apple </el-checkbox>
        <el-checkbox label="banana"> banana </el-checkbox>
        <el-checkbox label="orange"> orange </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template v-slot="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'

const defaultFormThead = ['apple', 'banana']

export default defineComponent({
  setup() {
    const tableData = reactive([
      {
        name: 'fruit-1',
        apple: 'apple-10',
        banana: 'banana-10',
        orange: 'orange-10'
      },
      {
        name: 'fruit-2',
        apple: 'apple-20',
        banana: 'banana-20',
        orange: 'orange-20'
      }
    ])

    const formTheadOptions = ['apple', 'banana', 'orange']

    const checkboxVal = ref([...defaultFormThead])

    const formThead = reactive(defaultFormThead)

    watch(checkboxVal, (valArr) => {
      formThead.splice(0)
      Object.assign(
        formThead,
        formTheadOptions.filter((i) => valArr.indexOf(i) >= 0)
      )
    })
    return {
      tableData,
      checkboxVal,
      formThead
    }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
