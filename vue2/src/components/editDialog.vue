<template>
  <!-- 打开弹框的动画 -->
  <transition name="animation">
    <div
      class="dialogBox"
      :class="{ isShowMask: mask == true }"
      v-show="isShowEditDialog"
      @click="clickMaskCloseFn"
    >
      <div class="dialogBoxContent" @click.stop>
        <div class="headhead">
          <!-- 这样写可以做到若有传递过来的title就用传递过来的title
          若有传递过来的插槽，就以插槽的为准 -->
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
          <i class="el-icon-close" @click="close" v-show="showCloseIcon"> </i>
        </div>
        <div class="bodybody">
          <el-form
            :model="editForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="editForm.name"
                size="small"
                maxlength="8"
                show-word-limit
                clearable
                placeholder="请填写姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input
                v-model="editForm.age"
                size="small"
                maxlength="3"
                show-word-limit
                clearable
                placeholder="请填写年龄"
              ></el-input>
            </el-form-item>
            <el-form-item label="家乡：">
              <el-input
                v-model="editForm.home"
                size="small"
                maxlength="12"
                show-word-limit
                clearable
                placeholder="请填写家乡"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input
                v-model="editForm.remark"
                size="small"
                maxlength="24"
                show-word-limit
                clearable
                placeholder="请填写备注"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="footfoot">
          <el-button type="primary" plain size="small" @click="close"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="validateFn('ruleForm')"
            >确认</el-button
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "dialogComponent",
  props: {
    // 控制是否展示或隐藏对话框
    isShowEditDialog: {
      type: Boolean,
      default: false,
    },
    // 父组件传过来的标题值
    title: {
      type: String,
      default: "",
    },
    // 是否显示关闭小图标
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    // 是否开启背景遮罩层
    mask: {
      type: Boolean,
      default: true,
    },
    // 是否点击遮罩层mask关闭弹出框
    clickMaskClose: {
      type: Boolean,
      default: false,
      require: true,
    },
    // 点击获取行数据
    rowData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      editForm: {
        name: "",
        age: "",
        home: "",
        remark: "",
      },
      rules: {
        name: [
          { required: true, message: "人物姓名是必填项", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
      this.editForm = this.rowData
  },
  methods: {
    // 关闭弹出框
    close() {
      this.$emit("update:isShowEditDialog", false);
    },
    // 新增数据前的校验
    validateFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 确定新增数据
    confirm() {
      this.$emit("confirmEdit", this.editForm);
    },
    // 点击遮罩层关闭弹框
    clickMaskCloseFn() {
      if (this.clickMaskClose == true) {
        this.$emit("beforeClose", false);
      } else {
        /* 这里要控制一下冒泡事件，注意第十行使用@click.stop
           不控制冒泡的话，点击内容区也会导致弹出框关闭*/
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dialogBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  .dialogBoxContent {
    width: 360px;
    height: 400px;
    border-radius: 2px;
    background-color: #fff;
    .headhead {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9e9e9;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 24px;
      }
      i {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .bodybody {
      width: 100%;
      height: calc(100% - 120px);
      box-sizing: border-box;
      padding: 25px;
      padding-right: 60px;
    }
    .footfoot {
      width: 100%;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      border-top: 1px solid #e9e9e9;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        margin-left: 12px;
      }
    }
  }
}
.isShowMask {
  background-color: rgba(0, 0, 0, 0.3);
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.3s;
}
</style>
