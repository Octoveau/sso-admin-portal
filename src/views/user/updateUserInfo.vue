<template>
  <div>
    <el-button @click="dialogVisible = true">上传头像</el-button>
    <avatar-cropper :dialogVisible.sync="dialogVisible" @closeAvatarDialog="closeAvatarDialog"></avatar-cropper>
    <span v-if="imagesFile">
      <el-image :src="imagesFile"></el-image>
    </span>
  </div>
</template>

<script>
import avatarCropper from './components/avatarCropper.vue';
import dataURLtoBlob from '@/utils/base64toFile';
export default {
  components: {
    avatarCropper,
  },
  data() {
    return {
      dialogVisible: false,
      imagesFile: null,
    };
  },
  methods: {
    closeAvatarDialog(data) {
      this.imagesFile = data;
      let result = dataURLtoBlob(data, '111.png'); //转换成file
      this.dialogVisible = false;
    },
  },
};
</script>
