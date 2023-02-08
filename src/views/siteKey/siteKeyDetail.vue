<template>
  <section class="section" v-loading="isLoading">
    <div class="header">
      <el-input maxlength="40" v-model.trim="userSiteKey" placeholder="请输入用户完整的SiteKey" style="width: 5rem"></el-input>
      <el-button type="primary" style="margin-left: 0.2rem" @click="onSearch">查询</el-button>
      <el-button style="margin-left: 0.2rem" @click="onReset">重置</el-button>
    </div>
    <el-table :header-cell-style="getRowClass" :row-class-name="tableRowClassName" :data="tableData" style="width: 100%">
      <el-table-column prop="siteName" label="SiteKey名称" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="siteKey" label="SiteKey" :show-overflow-tooltip="true" width="400px"></el-table-column>
      <el-table-column prop="siteSecret" label="SiteKey密钥" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="callbackUrl" label="回调地址" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="state" label="SiteKey状态" :show-overflow-tooltip="true" width="150px">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="`${scope.row.state === 'DISBALE' ? 'danger' : 'success'}`">
            {{ scope.row.state === 'DISBALE' ? '冻结中' : '启用中' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审批状态" :show-overflow-tooltip="true" width="150px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'PENDING'" effect="dark">审批中</el-tag>
          <el-tag v-if="scope.row.status === 'APPROVED'" effect="dark" type="success">审批通过</el-tag>
          <el-tag v-if="scope.row.status === 'REJECT'" effect="dark" type="danger">审批驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建者" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ getDateStr(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="onDelete(scope.row)" :loading="scope.row.isDelete">
            {{ scope.row.isDelete ? '删除中' : '删除' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totleCount"
      ></el-pagination>
    </div>
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
      pageInfo: {
        page: 1,
        size: 10,
      },
      tableData: [],
      totleCount: 0,
    };
  },
  mounted() {
    this.serachUserData();
  },
  methods: {
    handleSizeChange(data) {
      this.page = 1;
      this.pageInfo.size = data;
      this.serachUserData();
    },
    handleCurrentChange(data) {
      this.pageInfo.page = data;
      this.serachUserData();
    },
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
      this.pageInfo = {
        size: 10,
        page: 0,
      };
      this.userSiteKey = '';
      this.serachUserData();
    },
    onSearch() {
      //判断是否输入用户手机号进行查询
      this.userSiteKey ? this.searchUserDataByPhone() : this.serachUserData();
    },
    serachUserData() {
      this.isLoading = true;
      let request = {
        page: this.pageInfo.page ? this.pageInfo.page - 1 : 0,
        size: this.pageInfo.size,
      };
      getsiteKeyData(request)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.data.map((x) => {
              x.isDelete = false;
              return x;
            });
            this.totleCount = res.data.total;
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
            return (this.totleCount = 1);
          }
          this.tableData = [];
          this.totleCount = 0;
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
.footer {
  margin-top: 0.2rem;
  text-align: end;
}
</style>
