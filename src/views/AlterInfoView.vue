<template>
  <el-row style="padding-top: 20px;"></el-row>
  <el-form :model="form" label-width="120px">
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
      <el-col :span="4">
        <el-date-picker v-model="form.begin_date" type="date" placeholder="选择开始日期" style="width: 100%" />
      </el-col>
      <el-col :span="1" style="text-align: center">
        -
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="form.end_date" placeholder="选择结束日期" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="4">
        <el-time-picker v-model="form.begin_time" placeholder="选择开始时间" value-format="HH:mm:ss" style="width: 100%" />
      </el-col>
      <el-col :span="1" style="text-align: center">
        -
      </el-col>
      <el-col :span="4">
        <el-time-picker v-model="form.end_time" placeholder="选择结束时间" value-format="HH:mm:ss" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item label="省市区">
      <el-cascader size="large" :options="pcaTextArr" v-model="selectedOptions">
      </el-cascader>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input v-model="form.address">
      </el-input>
    </el-form-item>
    <el-form-item label="票务信息">
      <el-input v-model="form.ticket_info" />
    </el-form-item>
    <el-form-item label="官方链接">
      <el-input v-model="form.link" />
    </el-form-item>
    <el-form-item label="展览活动简介">
      <el-input :autosize="{ minRows: 2, maxRows: 6 }" v-model="form.introduction" type="textarea" />
    </el-form-item>
    <el-form-item label="海报">
      <el-upload
      class="avatar-uploader"
      action='https://kjkttt.gardilily.com/api/addEx/stash'
      ref="uploadRef"
      auto-upload="false"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    </el-form-item>
    
    <el-form-item label="标签">
      <el-row>
        <el-checkbox-group v-model="form.tag_list" size="large">
          <el-checkbox-button v-for="(tag,index) in allTags" :key="index" :label="tag">
            {{ tag.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from "../http.ts"
import { pcaTextArr } from "element-china-area-data";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();

const selectedOptions = ref([]);

const imageUrl = ref('')
var img_base64 = "null"

// do not use same name with ref
const allTags = ref([])
const form = ref({
  id: 0,
  name: '',
  venue_name: '',
  ticket_info: '',
  organizer: '',
  begin_date: '',
  end_date: '',
  begin_time: '',
  end_time: '',
  province: '',
  city: '',
  area: '',
  address: "",
  introduction: '',
  link: '',
  poster_url: '',
  is_checked: false,
  //delivery: false,
  //type: [],
  //resource: '',
  tag_list: []
})

// const province_options = ref([]);
// const city_options = ref([]);
// const area_options = ref([]);
// const province_change = (value) => {
//   axios.get("/location/city_list", {
//     params: {
//       province: value
//     }
//   }).then((response) => {
//     city_options.value = response.data;
//   });
// }

// const city_change = (value) => {
//   axios.get("/location/area_list", {
//     params: {
//       city: value
//     }
//   }).then((response) => {
//     area_options.value = response.data;
//   });
// }
const onSubmit = () => {
  form.value.province = selectedOptions.value[0];
  form.value.city = selectedOptions.value[1];
  form.value.area = selectedOptions.value[2];

  var jsondata = JSON.parse(JSON.stringify(form.value))
  console.log(jsondata)

  console.log(img_base64)

  axios({
    method: "post",
    url: "/alterExInfo",
    data: {
      file_base64: img_base64,
      data: jsondata
    }
  }).then(
    (response) => {
      router.push(`/exhibition/${route.params.exId}`)
    }
  );
}

const onCancel = () => {
  console.log("cancel")
  router.back();//返回上一界面
}

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
      var reader = new FileReader();
      reader.readAsDataURL(uploadFile.raw!);
      reader.onload = () => {

          img_base64=reader.result;
          //form.img = reader.result;
      }
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

onMounted(() => {
  if (route.params.exId == null)
    return;

  axios.get(
    "/searchById",
    {
      params: {
        exId: route.params.exId
      }
    }
  ).then((response) => {
    console.log(response.data);
    form.value = response.data;
    selectedOptions.value = [response.data.province, response.data.city, response.data.area];
  });

  axios.get("/tagSelection/getAllTags").then(
    (response) => {
      allTags.value = response.data;
    }
  )
});

</script>

<style>
.demo {
  margin-left: auto;
  margin-right: auto;
}

.check_tag {
  margin-right: 8px;
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