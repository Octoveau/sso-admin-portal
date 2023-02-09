<template>
  <el-dialog
    title="裁剪头像"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="closeDialog"
    width="600px"
  >
    <div class="avatar-container">
      <!-- 待上传图片 -->
      <div v-show="!options.img">
        <el-upload
          class="upload"
          ref="upload"
          action=""
          :on-change="upload"
          accept="image/png, image/jpeg, image/jpg"
          :show-file-list="false"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" ref="uploadBtn">选择图片</el-button>
        </el-upload>
        <div>支持jpg、png格式的图片，大小不超过5M</div>
      </div>
      <!-- 已上传图片 -->
      <div v-show="options.img" class="avatar-crop">
        <vueCropper
          v-if="dialogVisible"
          class="crop-box"
          ref="cropper"
          :img="options.img"
          :autoCrop="options.autoCrop"
          :fixedBox="options.fixedBox"
          :canMoveBox="options.canMoveBox"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :centerBox="options.centerBox"
          :fixed="options.fixed"
          :fixedNumber="options.fixedNumber"
          :canMove="options.canMove"
          :canScale="options.canScale"
        ></vueCropper>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="reupload" @click="reupload">
        <span v-show="options.img">重新上传</span>
      </div>
      <div>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="getCrop">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
  components: {
    VueCropper,
  },
  name: 'avatarCropper',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // vueCropper组件 裁剪配置信息
      options: {
        img: '', // 原图文件
        autoCrop: true, // 默认生成截图框
        fixedBox: true, // 固定截图框大小
        canMoveBox: true, // 截图框可以拖动
        autoCropWidth: 150, // 截图框宽度
        autoCropHeight: 150, // 截图框高度
        fixed: true, // 截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: true, // 截图框被限制在图片里面
        canMove: false, // 上传图片不允许拖动
        canScale: true, // 上传图片不允许滚轮缩放
        maxImgSize: 1000,
      },
    };
  },

  methods: {
    // 读取原图
    upload(file) {
      const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (!isIMAGE) {
        this.$message({
          showClose: true,
          message: '请选择 jpg、png 格式的图片',
          type: 'warning',
        });
        return false;
      }
      if (!isLt5M) {
        this.$message({
          showClose: true,
          message: '图片大小不能超过 5MB',
          type: 'warning',
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.options.img = e.target.result; // base64
      };
    },
    // 获取截图信息
    getCrop() {
      this.$refs.cropper.getCropBlob((data) => {
        let url = (window.URL || window.webkitURL).createObjectURL(data);
        this.imageToCircle(url);
        this.closeDialog();
      });
    },
    imageToCircle(picUrl) {
      // 通过图片地址换出圆形的图片
      let radius, diameter, canvas, ctx;
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous'); // 解决图片跨域访问失败
      img.src = picUrl;
      return new Promise((reslove) => {
        img.addEventListener(
          'load',
          () => {
            let { width, height } = img;
            if (img.width > img.height) {
              radius = height / 2;
            } else {
              radius = width / 2;
            }
            diameter = radius * 2;
            canvas = document.createElement('canvas');
            canvas.width = diameter;
            canvas.height = diameter;
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, diameter, diameter);
            // 描边
            ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素
            ctx.strokeStyle = '#eee'; //设置边线的颜色
            ctx.lineWidth = 2;
            ctx.beginPath(); //开始路径
            ctx.arc(radius, radius, radius - 5, 0, Math.PI * 2); //画一个整圆.
            ctx.stroke(); //绘制边线

            // 截圆形图
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius, radius, radius - 5, 0, Math.PI * 2);
            ctx.clip();

            let x = 0,
              y = 0,
              swidth = diameter,
              sheight = diameter;

            ctx.drawImage(img, x, y, swidth, sheight, 0, 0, diameter, diameter);
            ctx.restore();
            // toDataURL()是canvas对象的一种方法，用于将canvas对象转换为base64位编码
            let dataURL = canvas.toDataURL('image/png');
            this.$emit('closeAvatarDialog', dataURL);
            reslove(dataURL);
          },
          false
        );
      });
    },
    // 重新上传
    reupload() {
      this.$refs.uploadBtn.$el.click();
    },
    // 关闭弹框
    closeDialog() {
      this.$emit('update:dialogVisible', false);
      this.options.img = '';
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .reupload {
    color: #409eff;
    cursor: pointer;
  }
}
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 400px;
  background-color: #f0f2f5;
  margin-right: 10px;
  border-radius: 4px;
  .upload {
    text-align: center;
    margin-bottom: 24px;
  }
  .avatar-crop {
    width: 560px;
    height: 400px;
    position: relative;
    .crop-box {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
