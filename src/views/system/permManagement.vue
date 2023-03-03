<template>
  <section class="section" v-loading="isLoading">
    <el-table size="mini" :header-cell-style="getRowClass" :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table size="mini" :header-cell-style="getRowClass" :data="scope.row.perms">
            <el-table-column prop="permName" label="权限名称" width="200"></el-table-column>
            <el-table-column prop="permValue" label="权限值" width="100"></el-table-column>
            <el-table-column prop="permAction" label="权限行为" width="100"></el-table-column>
            <el-table-column prop="permPath" label="权限路径" width="200"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="permGroupName" label="权限组名称" width="300"></el-table-column>
      <el-table-column prop="permGroupName" label="创建者"></el-table-column>
      <el-table-column prop="permGroupName" label="修改者"></el-table-column>
      <el-table-column prop="permGroupName" label="创建时间"></el-table-column>
      <el-table-column prop="permGroupName" label="更新时间"></el-table-column>
      <el-table-column prop="remark" label="备注" width="300"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <a style="color: red" @click="onDelete(scope.row)">删除</a>
          <a style="margin-left: 0.2rem" @click="onUpdate(scope.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import tableMixin from '@/mixins/table';
import { getAllSysPerms, delateSysPerm } from '@/api/system';
export default {
  name: 'UserDetailPage',
  mixins: [tableMixin],
  data() {
    return {
      isLoading: false,
      tableData: [],
    };
  },
  mounted() {
    this.searchAllSysPerms();
  },
  methods: {
    //删除权限组
    onDelete(data) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.isLoading = true;
          delateSysPerm([data.id])
            .then((res) => {
              if (res.code === 200) {
                this.$message.success('删除成功');
              }
            })
            .finally(() => {
              this.isLoading = false;
              this.searchAllSysPerms();
            });
        })
        .catch(() => {});
    },
    //更新权限组
    onUpdate(data) {
      this.$router.push({
        name: 'CreatePerm',
        query: {
          permGroupName: data.permGroupName,
        },
      });
    },
    searchAllSysPerms() {
      this.isLoading = true;
      getAllSysPerms()
        .then((res) => {
          this.tableData = res.data?.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped lang="less">
.section {
  padding: 0.2rem;
  /deep/ .el-table {
    overflow: auto;
    .color-row {
      background: rgb(245, 245, 245);
    }
    .has-gutter {
      color: #fff;
    }
  }
}
</style>
