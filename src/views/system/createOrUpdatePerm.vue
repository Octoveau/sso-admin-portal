<template>
  <section class="section" v-loading="isLoading">
    <div class="main">
      <div class="content">
        <el-form label-width="100px" :model="createPerm" ref="createPermForm" v-loading="loading">
          <el-form-item :rules="[{ required: true, message: '请输入权限组名称', trigger: 'change' }]" label="权限组名称" prop="permGroupName">
            <el-input maxlength="6" placeholder="请输入权限组名称" v-model.trim="createPerm.permGroupName" autocomplete="off"></el-input>
          </el-form-item>
          <div class="form-div">
            <div class="div-flex" v-for="(item, index) in createPerm.perms" :key="index">
              <el-form-item :rules="[{ required: true, message: '请输入权限名称', trigger: 'change' }]" label="权限名称" :prop="'perms.' + index + '.permName'">
                <el-input maxlength="10" placeholder="请输入权限名称" v-model.trim="item.permName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                :rules="[
                  { required: true, message: '请输入权限值', trigger: 'change' },
                  { validator: validateStrCallback, trigger: 'change' },
                ]"
                label="权限值"
                :prop="'perms.' + index + '.permValue'"
              >
                <el-input placeholder="请输入权限值" v-model.trim="item.permValue" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :rules="{ required: true, message: '请选择权限行为', trigger: 'change' }" label="权限行为" :prop="'perms.' + index + '.permAction'">
                <el-select v-model="item.permAction" placeholder="请选择行为">
                  <el-option v-for="item in actionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <i title="添加权限" class="el-icon-circle-plus" @click="onAddPerm"></i>
          </div>
          <el-form-item label="备注" prop="remark">
            <el-input maxlength="100" type="textarea" v-model.trim="createPerm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" style="margin-right: 0.2rem" @click="submitForm('createPermForm')">{{ curPermGroupName ? '修改' : '提交' }}</el-button>
        <el-button @click="resetForm('createPermForm')">重置</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { validateStrCallback, actionOptions } from './help';
import { createSysPerm, updateSysPerm, getAllSysPerms } from '@/api/system';
export default {
  name: 'CreateSiteKeyPage',
  data() {
    return {
      isLoading: false,
      curPermGroupName: '',
      createPerm: {
        permGroupName: '',
        perms: [
          {
            permAction: '',
            permName: '',
            permValue: '',
          },
        ],
        remark: '',
      },
      validateStrCallback,
      actionOptions,
      loading: false,
    };
  },
  created() {
    this.curPermGroupName = this.$route.query.permGroupName || '';
    if (this.curPermGroupName) {
      //根据name获取权限信息
      this.isLoading = true;
      getAllSysPerms({ permName: this.curPermGroupName })
        .then((res) => {
          if (res.code === 200) {
            this.createPerm = res.data?.data[0];
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  methods: {
    onAddPerm() {
      if (this.createPerm.perms.length > 20) {
        return this.$message.warning('一个权限组下最多创建20个权限');
      }
      this.createPerm.perms.push({
        permAction: '',
        permName: '',
        permValue: '',
      });
    },
    resetForm: function (formName) {
      this.createPerm = {
        permGroupName: '', //权限组名称
        perms: [
          //一个权限组下的权限，可以很多个
          {
            permAction: '', //权限类型，get，post，delete，put
            permName: '', //权限名称
            permValue: '', //权限值
          },
        ],
        remark: '', //备注
      };
      this.$refs[formName].resetFields();
    },
    submitForm: function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let result;
          this.curPermGroupName ? (result = await updateSysPerm(this.createPerm)) : (result = await createSysPerm(this.createPerm));
          console.log(111, result);
          this.loading = false;
          // .then((res) => {
          //   if (res.code === 200) {
          //     this.$message.success('创建成功');
          //     this.resetForm('createPermForm');
          //   }
          // })
          // .finally(() => {
          //   this.loading = false;
          // });
        } else {
          return false;
        }
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
