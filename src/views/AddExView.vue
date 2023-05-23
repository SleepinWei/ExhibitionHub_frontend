<template>
    <!-- <el-container> -->
        <!-- <el-header>Header</el-header> -->
        <!-- <el-main class="demo"> -->
      <el-form :model="form" label-width="120px" style="margin-top: 20px;">
      <el-form-item label="展览名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="展馆名称">
        <el-input v-model="form.venue_name" />
      </el-form-item>
      <el-form-item label="主办方">
        <el-input v-model="form.organizer" />
      </el-form-item>
      <el-form-item label="活动日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.begin_date"
            type="date"
            placeholder="选择开始日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="form.end_date"
            placeholder="选择结束日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-time-picker
            v-model="form.begin_time"
            type="date"
            placeholder="选择开始时间"
            value-format="HH:mm:ss"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.end_time"
            placeholder="选择结束时间"
            style="width: 100%"
            value-format="HH:mm:ss"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="地点">
        <el-cascader
          size="large"
          :options="pcaTextArr"
          v-model="selectedOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="票务信息">
        <el-input v-model="form.ticket_info" />
      </el-form-item>
      <el-form-item label="官方链接">
        <el-input v-model="form.link" />
      </el-form-item>
      <el-form-item label="展览活动简介">
        <el-input :autosize="{ minRows: 2, maxRows: 6}" v-model="form.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="海报">
        <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      </el-form-item>
      <el-form-item label="图片墙">
        <el-upload
           v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-remove="handleRemove"
        :limit="2"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <!-- <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog> -->
      </el-form-item>
        <el-form-item label="标签">
          <el-row>
            <!-- todo: 改为 v-for，从后端获取所有的 tags -->
          <!-- <el-check-tag class="check_tag" :checked="form.checked_tech" @change="onChange_tech">科技</el-check-tag> -->
          <!-- <el-check-tag class="check_tag" :checked="form.checked_sports" @change="onChange_sports">体育</el-check-tag> -->
          <!-- <el-check-tag class="check_tag" :checked="form.checked_art" @change="onChange_art">艺术</el-check-tag> -->
          </el-row>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <!-- <el-button>Cancel</el-button> -->
      </el-form-item>
    </el-form>
    <!-- </el-main> -->
    <!-- </el-container> -->
    
  </template>
  
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { ref } from 'vue'  
  import { Plus } from '@element-plus/icons-vue'
  import { UploadProps, UploadUserFile, messageConfig } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import axios from "../http.ts"
    import {
  pcaTextArr
  } from "element-china-area-data";

import { routerKey, useRoute, useRouter } from 'vue-router'

const imageUrl = ref('')
  // do not use same name with ref
  const form = ref({
    id: 0,
    name: '',
    venue_name:'',
    organizer: '',
    province: '',
    city: '',
    area: '',
    link:'',
    ticket_info:'',
    begin_date: '',
    end_date: '',
    begin_time: '',
    end_time: '',
    delivery: false,
    type: [],
    resource: '',
    introduction: '',
    // checked_sports:false,
    // checked_art:false,
    // checked_tech:false
  })

const province_options = ref([]);
const city_options = ref([]);
const area_options = ref([]);

onMounted(() => {
  axios.get("/location/province").then(
    (response) => {
      province_options.value = response.data;
    }
  )
});

const province_change = (value) => {
  axios.get("/location/city_list", {
    params: {
      province: value
    }
  }).then((response) => {
    city_options.value = response.data;
  });
}

const city_change = (value) => {
  axios.get("/location/area_list", {
    params: {
      city: value
    }
  }).then((response) => {
    area_options.value = response.data;
  });
}
  
const router = useRouter();
  const onSubmit = () => {
    axios({
        method: "post",
        url: "/addEx",
        // data:{
        //   name:form.exhibition_name,
        //   site_name:form.exhibition_area_name,
        //   organizer:form.sponsor_name,
        //   begin_date:form.date1,
        //   end_date:form.date2,
        //   begin_time:form.time1,
        //   end_time:form.time2,
        //   location:form.location,
        //   ticket_info:form.ticket_info,
        //   introduction:form.desc,
        //   link:form.official_link
        // }
        
        data: form.value,
    })
      .then((response) => {
          ElMessage({
            message: "添加成功，请等待审核"
          })
          router.push("/");
      }).catch(() => {
          ElMessage({
            message: "添加失败，缺少必要项"
          });
    });
  }

  // const checked_sports = ref(false)
  // const checked_art = ref(false)
  // const checked_tech = ref(false)

  // const onChange_tech = (status: boolean) => {
  // form.checked_tech = status
  // }

  // const onChange_sports = (status: boolean) => {
  // form.checked_sports = status
  // }

  // const onChange_art = (status: boolean) => {
  // form.checked_art = status
  // }

  const fileList = ref<UploadUserFile[]>([
      {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      }
  ])

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)

  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
  }

//   const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
//       dialogImageUrl.value = uploadFile.url!
//       dialogVisible.value = true
//   }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
  ) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  }

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
          ElMessage.error('Avatar picture must be JPG format!')
          return false
      }
      else {
          return true
      }
    }
</script>

<style>
.demo {
   margin-left: auto;
   margin-right: auto;
}
.check_tag{
  margin-right:8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>