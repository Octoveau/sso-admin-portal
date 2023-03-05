<template>
  <section class="section" v-loading="isLoading">
    <div class="header">
      <el-input maxlength="20" v-model.trim="permGroupName" placeholder="请输入完整的权限组名称进行查询" style="width: 5rem"></el-input>
      <el-button type="primary" style="margin-left: 0.2rem" @click="onSearch">查询</el-button>
      <el-button style="margin-left: 0.2rem" @click="onReset">重置</el-button>
    </div>
    <el-table size="mini" :header-cell-style="getRowClass" :data="tableData" style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" type="expand">
        <template slot-scope="scope">
          <el-table size="mini" border :header-cell-style="getRowClass" :data="scope.row.perms">
            <el-table-column :show-overflow-tooltip="true" prop="permName" label="权限名称" width="200"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="permValue" label="权限值" width="200"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="permAction" label="权限行为" width="200"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="permPath" label="权限路径" width="400"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="permGroupName" label="权限组名称" width="300"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createBy" label="创建者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="lastModifiedBy" label="修改者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createDate" label="创建时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="lastModifiedDate" label="更新时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注" width="300"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="操作" width="150">
        <template slot-scope="scope">
          <a class="cursor" style="color: red" @click="onDelete(scope.row)">删除</a>
          <a class="cursor" style="margin-left: 0.2rem" @click="onUpdate(scope.row)">修改</a>
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
      permGroupName: '',
    };
  },
  mounted() {
    this.searchAllSysPerms();
  },
  methods: {
    onReset() {
      this.permGroupName = '';
      this.searchAllSysPerms();
    },
    onSearch() {
      this.searchAllSysPerms();
    },
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
          permGroupName: data.id,
        },
      });
    },
    searchAllSysPerms() {
      this.isLoading = true;
      this.tableData = [];
      getAllSysPerms({ permName: this.permGroupName ? this.permGroupName : undefined })
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
  .header {
    display: flex;
    margin-bottom: 0.2rem;
  }
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
