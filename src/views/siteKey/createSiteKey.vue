<template>
  <section class="section">
    <div class="main">
      <div class="content">
        <el-form :model="createSitekeyParam" :rules="rules" ref="createSiteKeyForm" v-loading="loading">
          <el-form-item label="SiteKey名称" prop="siteName">
            <el-input v-model="createSitekeyParam.siteName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="callbackUrl">
            <el-input v-model="createSitekeyParam.callbackUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model.number="createSitekeyParam.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" style="margin-right: 0.2rem" @click="submitForm('createSiteKeyForm')">提交</el-button>
        <el-button @click="resetForm('createSiteKeyForm')">重置</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { createSiteKeyData } from '@/api/siteKey';
export default {
  name: 'CreateSiteKeyPage',
  data() {
    return {
      createSitekeyParam: {
        callbackUrl: '',
        siteName: '',
        remark: '',
      },
      rules: {
        siteName: [{ required: true, message: '请输入SiteKey名称', trigger: 'blur' }],
        callbackUrl: [
          { required: true, message: '请输入回调地址', trigger: 'blur' },
          { pattern: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=] *)?/, message: '请输入正确的回调地址', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  methods: {
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
    },
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          createSiteKeyData(this.createSitekeyParam)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success('新建 SiteKey 成功!');
                this.$router.push('/client/site/detail');
              }
            })
            .catch((err) => {
              if (err.code === 409) {
                //  名称重复
              }
            })
            .finally(() => {
              this.loading = false;
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

        .el-form-item__label {
          float: left;
          width: 1.875rem;
        }

        .el-form-item__content {
          margin-left: 1.875rem;
        }
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
