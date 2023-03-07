<template>
  <section class="section" v-loading="isLoading">
    <div class="main">
      <div class="content">
        <el-form ref="createRoleForm" :model="createRole">
          <el-form-item :rules="[{ required: true, message: '请输入角色名称', trigger: 'change' }]" label="角色名称" prop="roleName">
            <el-input maxlength="8" placeholder="请输入角色名称" v-model.trim="createRole.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-table size="mini" :header-cell-style="getRowClass" border :data="permsData" style="width: 100%">
            <el-table-column prop="permGroupName" label="权限组名称" width="400">
              <template slot-scope="scope">
                <el-checkbox @change="() => onPermGroupChange(scope.row)" style="margin-left: 16px" v-model="scope.row.isCheck">
                  {{ scope.row.permGroupName }}
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="权限设置">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.perms" :key="index">
                  <el-checkbox @change="() => onPermChange(scope.row)" style="margin-left: 16px" v-model="item.isCheck">{{ item.permName }}</el-checkbox>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" style="margin-right: 0.2rem" @click="submitForm('createRoleForm')">提交</el-button>
        <el-button @click="resetForm('createRoleForm')">重置</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { getAllSysPerms, createSysRole } from '@/api/system';
import tableMixin from '@/mixins/table';
export default {
  name: 'CreateRolePage',
  mixins: [tableMixin],
  data() {
    return {
      isLoading: false,
      createRole: {
        roleName: '',
      },
      permsData: [],
    };
  },
  created() {
    this.searchAllSysPerms();
  },
  methods: {
    onPermGroupChange(data) {
      data.perms.forEach((x) => {
        data.isCheck ? (x.isCheck = true) : (x.isCheck = false);
      });
    },
    onPermChange(data) {
      data.perms.every((x) => x.isCheck) ? (data.isCheck = true) : (data.isCheck = false);
    },
    searchAllSysPerms() {
      this.isLoading = true;
      getAllSysPerms()
        .then((res) => {
          if (res.code === 200) {
            this.permsData = (res.data.data || []).map((item) => {
              item.isCheck = false;
              item.perms.forEach((x) => {
                x.isCheck = false;
              });
              return item;
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.permsData.forEach((item) => {
        item.isCheck = false;
        item.perms.forEach((x) => (x.isCheck = false));
      });
    },
    submitForm: function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.permsData.filter((data) => data.perms.some((x) => x.isCheck)).length) {
            return this.$message.warning('请至少勾选一个权限');
          }
          let permsData = JSON.parse(JSON.stringify(this.permsData));
          let request = {
            roleName: this.createRole.roleName,
            rolePermIds: [],
          };
          permsData.forEach((item) => {
            if (item.perms.some((x) => x.isCheck)) {
              request.rolePermIds.push(...item.perms.filter((y) => y.isCheck).map((z) => z.id));
              request.rolePermIds.push(item.id);
            }
          });
          this.isLoading = true;
          createSysRole(request)
            .then((res) => {
              console.log('res', res);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
        return false;
      });
    },
  },
};
</script>

<style scoped lang="less">
@backColor: #fff;

* {
  box-sizing: border-box;
}

.section {
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  /deep/ .el-table {
    overflow: auto;
    .color-row {
      background: rgb(245, 245, 245);
    }
    .has-gutter {
      color: #fff;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0.0375rem;
    box-shadow: 0 0 0.0625rem 0 #3333334f;

    .content {
      overflow: auto;
      padding: 0 0.5rem;

      ::v-deep .el-form-item {
        margin-top: 0.25rem;
      }
      .form-div {
        margin-left: 100px;
        position: relative;
        padding: 0.2rem;
        border: 1px dashed rgb(216, 215, 215);
        background: rgb(245, 245, 245);
      }
      .form-div:hover {
        box-shadow: 5px 5px 10px rgb(245, 245, 245);
      }
      .div-flex {
        display: flex;
        justify-content: start;
      }

      ::v-deep .el-icon-circle-plus {
        position: absolute;
        right: 0.2rem;
        color: #66b1ff;
        font-size: 32px;
        top: 50%;
        transform: translateY(-50%);
      }
      ::v-deep .el-icon-circle-plus:hover {
        cursor: pointer;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      height: 1.125rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
