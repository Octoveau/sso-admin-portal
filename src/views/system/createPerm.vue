<template>
  <section class="section">
    <div class="main">
      <div class="content">
        <el-form label-width="100px" :model="createPerm" ref="createPermForm" v-loading="loading">
          <el-form-item
            :rules="[
              { required: true, message: '请输入权限组名称', trigger: 'change' },
              { validator: validateStrCallback, trigger: 'change' },
            ]"
            label="权限组名称"
            prop="permGroupName"
          >
            <el-input placeholder="请输入权限组名称" v-model.trim="createPerm.permGroupName" autocomplete="off"></el-input>
          </el-form-item>
          <div class="form-div">
            <div class="div-flex" v-for="(item, index) in createPerm.perms" :key="index">
              <el-form-item
                :rules="[
                  { required: true, message: '请输入权限名称', trigger: 'change' },
                  { validator: validateStrCallback, trigger: 'change' },
                ]"
                label="权限名称"
                :prop="'perms.' + index + '.permName'"
              >
                <el-input placeholder="请输入权限名称" v-model.trim="item.permName" autocomplete="off"></el-input>
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
              <el-form-item :rules="{ required: true, message: '请选择权限行为', trigger: 'change' }" label="权限行为" :prop="'perms.' + index + '.action'">
                <el-select v-model="item.action" placeholder="请选择行为">
                  <el-option v-for="item in actionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <i title="添加权限" class="el-icon-circle-plus" @click="onAddPerm"></i>
          </div>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model.trim="createPerm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" style="margin-right: 0.2rem" @click="submitForm('createPermForm')">提交</el-button>
        <el-button @click="resetForm('createPermForm')">重置</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { validateStrCallback, actionOptions } from './help';
export default {
  name: 'CreateSiteKeyPage',
  data() {
    return {
      createPerm: {
        permGroupName: '',
        perms: [
          {
            action: '',
            permName: '',
            permValue: '',
            permPath: '',
          },
        ],
        remark: '',
      },
      validateStrCallback,
      actionOptions,
      loading: false,
    };
  },
  methods: {
    onAddPerm() {
      if (this.createPerm.perms.length > 20) {
        return this.$message.warning('一个权限组下最多创建20个权限');
      }
      this.createPerm.perms.push({
        action: '',
        permName: '',
        permValue: '',
        permPath: '',
      });
    },
    resetForm: function (formName) {
      this.createPerm = {
        permGroupName: '',
        perms: [
          {
            action: '',
            permName: '',
            permValue: '',
            permPath: '',
          },
        ],
        remark: '',
      };
      this.$refs[formName].resetFields();
    },
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.createPerm.perms.forEach((item) => {
            item.permPath = `${item.action}-${item.permValue}`;
          });
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
