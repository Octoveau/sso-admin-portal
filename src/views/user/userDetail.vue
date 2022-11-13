<template>
  <section class="section" v-loading="isLoading">
    <div class="header">
      <el-input maxlength="11" @input="onInput" v-model.trim="userPhone" placeholder="请输入用户完整手机号查询" style="width: 5rem"></el-input>
      <el-button type="primary" style="margin-left: 0.2rem" @click="onSearch">查询</el-button>
      <el-button style="margin-left: 0.2rem" @click="onReset">重置</el-button>
    </div>
    <el-table :border="true" :data="tableData" style="width: 100%">
      <el-table-column prop="nickName" label="用户昵称"></el-table-column>
      <el-table-column prop="createDate" label="创建时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getDateStr(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话信息">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getPhoneStr(scope.row.phone) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="用户状态">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="`${scope.row.active ? 'success' : 'danger'}`">{{ scope.row.active ? '使用中' : '已停用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="用户角色">
        <template>
          <el-tag>普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="onDelete(scope.row)" :loading="scope.row.isDelete">{{ scope.row.isDelete ? '删除中' : '删除' }}</el-button>
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
import { getUserData, getUserDataByPhone, deleteUserByPhone } from '@/api/user';
import moment from 'moment';
export default {
  data() {
    return {
      //用户手机号查询
      userPhone: '',
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
      data.isDelete = true;
      deleteUserByPhone(data.phone)
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
    },
    getDateStr(time) {
      return moment(time).format('YYYY年MM月DD日 HH时:mm分:ss秒');
    },
    getPhoneStr(phone) {
      return phone.slice(0, 4) + '*****' + phone.slice(-1);
    },
    onReset() {
      this.pageInfo = {
        size: 10,
        page: 0,
      };
      this.serachUserData();
    },
    onInput(data) {
      this.userPhone = data.replace(/[^\d]/g, '');
    },
    onSearch() {
      //判断是否输入用户手机号进行查询
      this.userPhone ? this.searchUserDataByPhone() : this.serachUserData();
    },
    serachUserData() {
      this.isLoading = true;
      let request = {
        page: this.pageInfo.page - 1,
        size: this.pageInfo.size,
      };
      getUserData(request)
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
      getUserDataByPhone(this.userPhone)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = [res.data].map((x) => {
              x.isDelete = false;
              return x;
            });
            this.totleCount = 1;
          }
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
    max-height: calc(100vh - 2.5rem);
  }
}
.footer {
  margin-top: 0.2rem;
  text-align: end;
}
</style>
