<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template v-slot="scope">
        {{ orderNoFilter(scope.row.order_no) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template v-slot="scope"> ¥{{ toThousandFilter(scope.row.price) }} </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template v-slot="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import { transactionList } from '@/api/remote-search'

export default defineComponent({
  setup() {
    const statusFilter = (status: 'success' | 'pending') => {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
    const orderNoFilter = (str: string) => {
      return str.substring(0, 30)
    }
    const toThousandFilter = (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
    const list = ref<any[] | null>(null)

    const fetchData = () => {
      transactionList().then((res: { data: { items: any[] } }) => {
        list.value = res.data.items.slice(0, 8)
      })
    }
    onMounted(() => {
      fetchData()
    })
    return {
      statusFilter,
      orderNoFilter,
      list,
      toThousandFilter
    }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
