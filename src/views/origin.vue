<template>
  <div class="h">
    <div style="text-align: center; font-size: xx-large; margin-bottom: 8px">{{ dialogData.movieTitle }}</div>
    <div style="text-align: center; margin-bottom: 8px;">共合并 <span style="font-size: x-large"
    >{{ dialogData.versionCount }}</span> 个版本数量的电影,点击表格每一行可访问源网址
    </div>
    <div style="text-align: center">该电影版本信息来源评论数量共 <span style="font-size: x-large"
    >{{ dialogData.commentCount }}</span> 条
    </div>
    <div style="text-align: left">以下为未合并前的电影数据信息:</div>
    <el-table
        :data="movieData"
        border
        stripe
        style="width: 100%;">
      <el-table-column label="电影编号" prop="asin">
        <template v-slot="scope">
          <a :href="'https:www.amazon.com/dp/'+scope.row.asin" target="_blank"
             class="buttonText">{{ scope.row.asin }}</a>
        </template>
      </el-table-column>
      <el-table-column label="电影名称" prop="title"/>
      <el-table-column label="电影得分" prop="score"/>
      <el-table-column label="导演" prop="director"/>
      <el-table-column label="演员" prop="actors"/>
      <el-table-column label="电影类别" prop="genre"/>
      <el-table-column label="发布时间" prop="releaseTime"/>
      <el-table-column label="评论数量" prop="commentNum"/>
    </el-table>
    <el-input
        size="medium" placeholder="输入电影名称进行查询" suffix-icon="el-icon-edit" v-model="searchingTitle"
        style="width:40vh; margin-bottom:10px"
    >
    </el-input>
    <el-button icon="el-icon-search" circle style="margin-top:-10px; margin-left:10px"
               @click="searchMovieByTitle"></el-button>
  </div>
</template>

<script>
import axios from "axios";
import request from "@/utils/requests";

export default {
  name: "origin",
  data() {
    return {
      BASE_URL: 'http://localhost:8084',
      dialogData: {
        movieTitle: "",
        versionCount: 0,
        commentCount: 0,
      },
      searchingTitle: '',
      movieData: [
        {
          asin: "",
          title: "",
          score: "",
          director: "",
          actors: "",
          genre: "",
          releaseTime: "",
          commentNum: ""
        }
      ]
    }
  },
  methods: {
    searchMovieByTitle() {
      request.get("/movie/mysql/getOrigin", {
        params: {"searchingTitle": this.searchingTitle}
      }).then(res => {
        this.dialogData.commentCount = 0
        this.movieData = res.movies
        this.dialogData.versionCount = res.movies.length
        this.dialogData.movieTitle = this.searchingTitle
        for (let i = 0; i < res.movies.length; i++) {
          this.dialogData.commentCount += this.movieData[i].commentNum
        }
      })
    }
  }
}
</script>

<style scoped>
.input {
  position: relative;
  top: 500px;
  left: -740px;
}

.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
