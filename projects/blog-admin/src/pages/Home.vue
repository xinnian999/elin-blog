<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple userCard">
          <!-- <el-avatar
            :size="120"
            src="http://img.crcz.com/allimg/202002/24/1582515688693328-lp.jpg"
          /> -->
          <article>
            <h1>
              晚上好，<span>{{
                cookie.get("super_admin_blog_token") ? "超级管理员" : "游客"
              }}</span
              >！
            </h1>
            <p>{{ lines.content }}</p>
          </article>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple natice">
          <article>
            <h1>公 告</h1>
            <p>欢迎来到心念的blog后台管理！🤭</p>
          </article>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in data" :key="item.key">
        <div class="grid-content bg-purple count">
          <article>
            <h1>{{ item.name }}</h1>
            <p>{{ item.value }}</p>
          </article>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="echarts">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div id="allEcharts"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div id="categoryEcharts"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, ref } from "vue";
import { request } from "@/utils";
import * as echarts from "echarts";
import cookie from "cookies-js";

const data = ref([
  { name: "文章数", value: 0, key: "article" },
  { name: "用户数", value: 0, key: "user" },
  { name: "留言数", value: 0, key: "comment" },
  { name: "说说数", value: 0, key: "mood" },
]);

const lines = ref("");

// onMounted(() => {
//   echarts.init(document.querySelector("#allEcharts")).dispose();
//   echarts.init(document.querySelector("#categoryEcharts")).dispose();

//   request.get("/experience/queryRandOne").then(({ data, status }) => {
//     if (status === 0) {
//       lines.value = data[0];
//     }
//   });

//   request("/all/allDataCount").then((res) => {
//     res.data.forEach((item) => {
//       data.value.forEach((v) => {
//         if (v.key === item.TABLE_NAME) {
//           v.value = item.TABLE_ROWS;
//         }
//       });
//     });
//     // 基于准备好的dom，初始化echarts实例
//     const myChart = echarts.init(document.querySelector("#allEcharts"));
//     // 绘制图表
//     myChart.setOption({
//       title: {
//         text: "博客总体概览",
//         subtext: "Fake Data",
//         left: "center",
//       },
//       tooltip: {
//         trigger: "item",
//       },
//       legend: {
//         orient: "vertical",
//         left: "left",
//       },
//       series: [
//         {
//           name: "Access From",
//           type: "pie",
//           radius: "50%",
//           data: data.value,
//           emphasis: {
//             itemStyle: {
//               shadowBlur: 10,
//               shadowOffsetX: 0,
//               shadowColor: "rgba(0, 0, 0, 0.5)",
//             },
//           },
//         },
//       ],
//     });
//   });


// });
</script>

<style lang="less">
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
}

.bg-purple {
  background-color: rgb(186, 228, 228);
}

.userCard {
  display: flex;

  article {
    margin-left: 15px;
    margin-top: 20px;

    h1 {
      font-size: 35px;
      span {
        color: blueviolet;
      }
    }

    p {
      margin-top: 15px;
    }
  }
}

.natice {
  height: 100%;

  h1 {
    font-size: 30px;
  }

  p {
    margin-top: 20px;
    text-align: center;
    color: rgb(8, 87, 32);
  }
}

.count {
  height: 180px;

  h1 {
    font-size: 25px;
  }

  p {
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: chocolate;
  }
}

#allEcharts,
#categoryEcharts {
  height: 100%;
}

.echarts {
  height: 100%;

  .bg-purple {
    height: 100%;
    padding-top: 60px;
  }
}
</style>
