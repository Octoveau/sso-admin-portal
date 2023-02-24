<template>
  <section class="section" v-loading="isLoading">
    <div class="header">
      <el-input maxlength="6" v-model.trim="userSiteKey" placeholder="请输入用户完整的权限组名称" style="width: 5rem"></el-input>
      <el-button type="primary" style="margin-left: 0.2rem" @click="onSearch">查询</el-button>
      <el-button style="margin-left: 0.2rem" @click="onReset">重置</el-button>
    </div>
    <el-table size="mini" :header-cell-style="getRowClass" :row-class-name="tableRowClassName" :data="tableData" style="width: 100%">
      <el-table-column prop="siteName" label="权限组名称" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="siteKey" label="权限名称" :show-overflow-tooltip="true" width="400px"></el-table-column>
      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="createBy" label="创建者" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ getDateStr(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="更新时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ getDateStr(scope.row.createDate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="360px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="onDelete(scope.row)" :loading="scope.row.isDelete">修改</el-button>
          <el-button size="small" type="danger" @click="onDelete(scope.row)" :loading="scope.row.isDelete">
            {{ scope.row.isDelete ? '删除中' : '删除' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getsiteKeyData, getDataBySiteKey, deleteSiteKey } from '@/api/siteKey';
import moment from 'moment';
import tableMixin from '@/mixins/table';
export default {
  name: 'UserDetailPage',
  mixins: [tableMixin],
  data() {
    return {
      //用户手机号查询
      userSiteKey: '',
      isLoading: false,
      tableData: [],
    };
  },
  mounted() {
    this.serachUserData();
  },
  methods: {
    onDelete(data) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          data.isDelete = true;
          deleteSiteKey(data.siteKey)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success('删除成功');
                //刷新数据
                this.onSearch();
              }
            })
            .finally(() => {
              data.isDelete = false;
            });
        })
        .catch(() => {});
    },
    getDateStr(time) {
      return moment(time).format('YYYY年MM月DD日 HH时:mm分:ss秒');
    },
    onReset() {
      this.userSiteKey = '';
      this.serachUserData();
    },
    onSearch() {
      //判断是否输入用户手机号进行查询
      this.userSiteKey ? this.searchUserDataByPhone() : this.serachUserData();
    },
    serachUserData() {
      this.isLoading = true;
      getsiteKeyData()
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data.map((x) => {
              x.isDelete = false;
              return x;
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    searchUserDataByPhone() {
      this.isLoading = true;
      getDataBySiteKey(this.userSiteKey)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = [res.data].map((x) => {
              x.isDelete = false;
              return x;
            });
          }
          this.tableData = [];
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
