<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content userCard">
          <el-avatar :size="120" :src="avatar" />
          <article>
            <h1>{{ hello }}，<span>超级管理员</span>！</h1>
            <p>
              潮水退去时，礁石才会显现；寒冬过后，春天才会苏醒。你的困境不是终点，而是命运在雕刻你站起的姿态。别等风来，要让自己成为起风的方向——当脚印深陷泥泞，恰是证明你仍在跋涉的勋章。
            </p>
          </article>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content natice">
          <h1>公 告</h1>
          <p>欢迎来到心念的blog后台管理！🤭</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in data" :key="item.key">
        <div class="grid-content count">
          <article>
            <h1>{{ item.name }}</h1>
            <p>{{ item.value }}</p>
          </article>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="flex: 1">
      <el-col :span="12">
        <div class="grid-content echarts-bar">
          <div class="title">
            <h1>分类统计</h1>
          </div>
          <div ref="categoryEcharts" class="echarts" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content echarts-bar">
          <div class="title">
            <h1>标签统计</h1>
          </div>
          <div ref="tagEcharts" class="echarts" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import avatar from '@/assets/auther_avatar.webp'
import summaryApi from '@/api/summary'
import categoryApi from '@/api/category'
import tagApi from '@/api/tag'
import * as echarts from 'echarts'

const data = ref([
  { name: '文章数', value: 0, key: 'articleCount' },
  { name: '分类数', value: 0, key: 'categoryCount' },
  { name: '标签数', value: 0, key: 'tagCount' },
  { name: '留言数', value: 0, key: 'commentCount' },
])

const hello = ref('')

const categoryEcharts = useTemplateRef('categoryEcharts')

const tagEcharts = useTemplateRef('tagEcharts')

const getOption = (data: any[]) => ({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 140],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        formatter: '{b}: {d}%'
      },
      data,
    },
  ],
})

onMounted(async () => {
  const hour = new Date().getHours()
  if (hour < 12) {
    hello.value = '早上好'
  } else if (hour < 18) {
    hello.value = '下午好'
  } else {
    hello.value = '晚上好'
  }

  const res = await summaryApi.fetch()

  data.value.forEach((item) => {
    item.value = res[item.key] || 0
  })

  const { list: categoryList } = await categoryApi.fetch()

  const { list: tagList } = await tagApi.fetch()

  const categoryData = categoryList.map((item: any) => ({
    value: item.articleCount,
    name: item.name,
  }))

  const tagData = tagList.map((item: any) => ({
    value: item.articleCount,
    name: item.name,
  }))

  echarts.init(categoryEcharts.value).setOption(getOption(categoryData))
  echarts.init(tagEcharts.value).setOption(getOption(tagData))
})
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 136px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
}

.userCard {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background-color: #e1eaf9;
  article {
    flex: 1;

    h1 {
      font-size: 35px;
      span {
        color: blueviolet;
      }
    }

    p {
      margin-top: 10px;
    }
  }
}

.natice {
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 30px;
  }

  p {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.count {
  height: 180px;
  border-radius: var(--el-border-radius-base);
  padding: 25px;
  h1 {
    font-size: 25px;
    // color: #92969a;
    font-size: 15px;
  }

  p {
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: chocolate;
  }
}

.echarts-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  .echarts {
    flex: 1;
  }
}
</style>
