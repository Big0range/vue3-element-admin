<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template v-slot="{ row }">
          <span v-parseTime="'YYYY-MM-DD HH:MM'">{{ row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template v-slot="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template v-slot="{ row }">
          <svg-icon v-for="n in Number(row.importance || 0)" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template v-slot="{ row }">
          <el-tag :type="statusMap[row.status]">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template v-slot="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template v-slot="{ row }">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit = !row.edit">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import { fetchList } from '@/api/article'

export default defineComponent({
  name: 'InlineEditTable',
  setup() {
    const list = ref<any[]>([])
    const listLoading = ref(true)
    const listQuery = {
      page: 1,
      limit: 10
    }
    const statusMap = reactive({
      published: 'success',
      draft: 'info',
      deleted: 'danger'
    })
    const getList = async () => {
      listLoading.value = true
      const { data } = await fetchList(listQuery)
      const items = data.items
      list.value = items.map((v: any) => {
        v.edit = false
        v.originalTitle = v.title
        return v
      })
      listLoading.value = false
    }
    const cancelEdit = (row: any) => {
      row.title = row.originalTitle
      row.edit = false
      ElMessage({
        message: '已取消',
        type: 'warning'
      })
    }

    const confirmEdit = (row: any) => {
      row.edit = false
      row.originalTitle = row.title
      ElMessage({
        message: 'Title 修改成功',
        type: 'success'
      })
    }

    getList()
    return {
      list,
      listLoading,
      statusMap,
      cancelEdit,
      confirmEdit
    }
  }
})
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
