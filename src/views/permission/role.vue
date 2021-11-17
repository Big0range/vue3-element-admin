<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>

    <el-table :data="rolesList" style="width: 100%; margin-top: 30px" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template v-slot="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template v-slot="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed, nextTick } from 'vue'
import path from 'path'
import { ElTree, ElMessageBox, ElMessage, ElNotification } from 'element-plus'

import { deepClone } from '@/utils'
import { getRoutes as getRoutesApi, getRoles as getRolesApi, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole: {
  key: string
  name: string
  description: string
  routes: any[]
} = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default defineComponent({
  setup() {
    const refs = toRefs(
      reactive({
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false
      })
    )

    let role = reactive(Object.assign({}, defaultRole))
    let routes: any[] = []
    let rolesList = reactive<any[]>([])
    const defaultProps = reactive({
      children: 'children',
      label: 'title'
    })

    const routesData = computed(() => {
      return routes
    })
    let serviceRoutes: any[] = []

    const getRoutes = async () => {
      console.log('getRoutes')
      const res = await getRoutesApi()
      serviceRoutes = res.data
      routes = generateRoutes(res.data)
    }

    const getRoles = async () => {
      const res = await getRolesApi()
      rolesList = Object.assign(rolesList, res.data)
    }
    const generateRoutes = (routes: any[], basePath = '/') => {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue
        }

        const onlyOneShowingChild2 = onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild2 && !route.alwaysShow) {
          route = onlyOneShowingChild2
        }

        const data: { path: string; title: string; children?: any } = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    }

    const generateArr = (routes: any[]) => {
      let data: any[] = []
      routes.forEach((route) => {
        data.push(route)
        if (route.children) {
          const temp = generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    }
    const tree = ref<typeof ElTree>()
    const handleAddRole = () => {
      role = Object.assign(role, defaultRole)
      tree.value?.tree.setCheckedNodes([])
      refs.dialogType.value = 'new'
      refs.dialogVisible.value = true
    }

    const handleEdit = (scope: any) => {
      refs.dialogType.value = 'edit'
      refs.dialogVisible.value = true
      refs.checkStrictly.value = true
      role = Object.assign(role, deepClone(scope.row))
      nextTick(() => {
        const routes = generateRoutes(role.routes)
        tree.value?.setCheckedNodes(generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        refs.checkStrictly.value = false
      })
    }

    const handleDelete = ({ $index, row }: { $index: number; row: any }) => {
      ElMessageBox.confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async () => {
          await deleteRole(row.key)
          rolesList.splice($index, 1)
          ElMessage({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    const generateTree = (routes: any[], basePath = '/', checkedKeys: any) => {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    }
    const confirmRole = async () => {
      const isEdit = refs.dialogType.value === 'edit'

      const checkedKeys = tree.value?.getCheckedKeys()
      role.routes = generateTree(deepClone(serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(role.key, role)
        for (let index = 0; index < rolesList.length; index++) {
          if (rolesList[index].key === role.key) {
            rolesList.splice(index, 1, Object.assign({}, role))
            break
          }
        }
      } else {
        const { data } = await addRole(role)
        role.key = data.key
        rolesList.push(role)
      }

      const { description, key, name } = role
      refs.dialogVisible.value = false
      ElNotification({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    }

    const onlyOneShowingChild = (children: any[] = [], parent: any) => {
      let onlyOneChild = null
      const showingChildren = children.filter((item) => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
    getRoutes()
    getRoles()
    return {
      ...refs,
      role,
      routesData,
      rolesList,
      defaultProps,
      tree,
      getRoutes,
      getRoles,
      generateRoutes,
      generateArr,
      handleAddRole,
      handleEdit,
      handleDelete,
      generateTree,
      confirmRole,
      onlyOneShowingChild
    }
  }
})
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
