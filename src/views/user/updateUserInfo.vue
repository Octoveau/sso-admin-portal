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
      console.log(data);
      this.imagesFile = (window.URL || window.webkitURL).createObjectURL(data);
      this.dialogVisible = false;
    },
  },
};
</script>
