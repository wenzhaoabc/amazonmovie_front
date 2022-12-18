<template>
  <div class="app-container">
    <el-row style="height: 100%;">
      <el-col :span="8">
        <el-form label-width="60px" style="padding-top: 10vh; padding-right: 10px;">
          <el-form-item label="导演">
            <el-autocomplete
                ref="saveDirectorTagInput"
                v-model="directorInputValue"
                class="input-new-tag"
                size="small"
                :fetch-suggestions="directorSearchSuggest"

                placeholder="请输入内容"
                style="width: 20vw;"
                clearable
                v-on:keyup.enter="handleDirectorInputConfirm(true)"
                @select="handleDirectorSelect"
            />
            <el-button
                class="button1"
                size="small"
                round
                @click="showMostDACooperationByDirector()"
            >
              合作次数最多的演员
            </el-button>
          </el-form-item>
          <el-form-item label="演员">
            <el-autocomplete
                ref="saveDirectorTagInput"
                v-model="actorInputValue"
                class="input-new-tag"
                size="small"
                :fetch-suggestions="actorSearchSuggest"

                placeholder="请输入内容"
                style="width: 20vw;"
                clearable
                v-on:keyup.enter="handleActorInputConfirm(true)"
                @select="handleActorSelect"
            />
            <el-button
                class="button2"
                size="small"
                round
                @click="showMostAACooperationByActor()"
            >
              合作次数最多的演员
            </el-button>
            <el-button
                class="button3"
                size="small"
                round
                @click="showMostDACooperationByActor()"
            >
              合作次数最多的导演
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"/>
      </el-col>
      <el-col :span="12">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="查询结果" name="first">
            {{ searchText }}
            <div id="chart" style="width: 500px; height: 400px"></div>
          </el-tab-pane>
          <el-tab-pane label="速度对比" name="third"
                       :disabled="(!graphReady ||  !distributeReady || !relationReady) && false">
            <div id="main" style="width: 500px; height: 400px"></div>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'echarts/lib/component/title'
import * as echarts from "echarts";
import axios from "axios";
/* eslint-disable */
export default {
  filters: {},
  data() {
    return {
      hasResult: false,
      movieLoading: false,
      directorInputVisible: false,
      directorInputValue: '',
      actorInputVisible: false,
      actorInputValue: '',
      actors: {
        name: ['a', 'b', 'c', 'd', 'e'],
        cooperationNum: [1, 2, 3, 4, 5]
      },
      directors: {
        name: ['a', 'b', 'c', 'd', 'e'],
        cooperationNum: [1, 2, 3, 4, 5]
      },
      speed: [1, 2, 3],
      activeName: 'first',
      searchText: '暂无查询',
      BASE_URL: 'http://localhost:8084',
      HIVE_BASE_URL: 'http://localhost:8102',

      categoryLoading: false,
      movieCategory: [],
      movieNumber: 0,

      relationReady: false,
      distributeReady: false,
      graphReady: false,
    }
  },
  mounted() {
    this.drawCharts()
  },
  methods: {
    drawCharts() {
      let myChart = echarts.init(document.getElementById('main'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption({
        title: {
          show: true,
          text: '检索关系',
          subtext: '通过MySql、Hive和Neo4j分别检索关系的速度对比',
          // textAlign:'center',
        },
        legend: {
          data: ['速度']
        },
        tooltip: {},
        grid: {
          top: 100,
          left: 50
        },
        xAxis: {
          name: '软件',
          data: ['Mysql', 'Hive', 'Neo4j']
        },
        yAxis: {
          name: '速度',
          axisLabel: {
            color: '#3a3a3a',
            formatter: (v) => {
              if (v == 0) {
                return v;
              }
              return v + ' ms'
            }
          },
        },
        series: [
          {
            name: '速度',
            type: 'bar',
            barWidth: 60,
            data: this.speed
          }
        ]
      })
    },
    drawCharts1() {
      let myChart = echarts.init(document.getElementById('chart'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption({
        title: {
          show: true,
          text: '',
          // textAlign:'center',
        },
        tooltip: {},
        grid: {
          top: 100,
          left: 50
        },
        xAxis: {
          name: '演员',
          axisLabel: {
            color: '#3a3a3a',
          },
          data: this.actors.name
        },
        yAxis: {
          name: '次数',
          axisLabel: {
            color: '#3a3a3a',
          },
        },
        series: [
          {
            name: '次数',
            type: 'bar',
            barWidth: 60,
            data: this.actors.cooperationNum
          }
        ]
      })
    },
    drawCharts2() {
      let myChart = echarts.init(document.getElementById('chart'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption({
        title: {
          show: true,
          text: '',
          // textAlign:'center',
        },
        tooltip: {},
        grid: {
          top: 100,
          left: 50
        },
        xAxis: {
          name: '演员',
          axisLabel: {
            color: '#3a3a3a',
          },
          data: this.actors.name
        },
        yAxis: {
          name: '次数',
          axisLabel: {
            color: '#3a3a3a',
          },
        },
        series: [
          {
            name: '次数',
            type: 'bar',
            barWidth: 60,
            data: this.actors.cooperationNum
          }
        ]
      })
    },
    drawCharts3() {
      let myChart = echarts.init(document.getElementById('chart'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption({
        title: {
          show: true,
          text: '',
          // textAlign:'center',
        },
        tooltip: {},
        grid: {
          top: 100,
          left: 50
        },
        xAxis: {
          name: '导演',
          axisLabel: {
            color: '#3a3a3a',
          },
          data: this.directors.name
        },
        yAxis: {
          name: '次数',
          axisLabel: {
            color: '#3a3a3a',
          },
        },
        series: [
          {
            name: '次数',
            type: 'bar',
            barWidth: 60,
            data: this.directors.cooperationNum
          }
        ]
      })
    },
    handleSelect(item) {
      console.log(item);
    }
    ,
    handleDirectorSelect(item) {
      this.handleDirectorInputConfirm(false)
    }
    ,
    handleActorSelect(item) {
      this.handleActorInputConfirm()
    }
    ,
    showMostDACooperationByDirector() {
      var axios = require('axios');
      // 向mysql发送请求
      axios({
        method: 'get',
        url: this.BASE_URL + '/mysql/association/director/cooperation',
        params:{ 
          directorName:this.directorInputValue
        },
        headers: {}
      }).then(response => {
        this.speed[0] = response.data.time
        this.actors = response.data.actors
        this.relationReady = true
      })

      // 向hive发送请求
      axios({
        method: 'get',
        url: this.HIVE_BASE_URL + '',
        data: this.directorInputValue,
        headers: {}
      }).then(response => {
        this.speed[1] = response.data.time
        this.distributeReady = true
      })

      // 向neo4j发送请求
      axios({
        method: 'get',
        url: '',
        data: this.directorInputValue,
        headers: {}
      }).then(response => {
        this.speed[2] = response.data.time
        this.graphReady = true
      })
      this.drawCharts1()
      this.searchText = '与导演' + this.directorInputValue + '合作次数最多的演员'
    },

    showMostAACooperationByActor() {
      var axios = require('axios');
      // 向mysql发送请求
      axios({
        method: 'get',
        url: this.BASE_URL + '/mysql/association/actor/cooperation',
        params:{
          actorName:this.actorInputValue,
        } ,
        headers: {}
      }).then(response => {
        this.speed[0] = response.data.time
        this.actors = response.data.actors
        this.relationReady = true
      })

      // 向hive发送请求
      axios({
        method: 'get',
        url: this.HIVE_BASE_URL + '',
        data: this.actorInputValue,
        headers: {}
      }).then(response => {
        this.speed[1] = response.data.time
        this.distributeReady = true
      })

      // 向neo4j发送请求
      axios({
        method: 'get',
        url: '',
        data: this.actorInputValue,
        headers: {}
      }).then(response => {
        this.speed[2] = response.data.time
        this.graphReady = true
      })
      this.drawCharts2();
      this.searchText = "与演员" + this.actorInputValue + "合作次数最多的演员";
    },

    showMostDACooperationByActor() {
      var axios = require('axios');
      // 向mysql发送请求
      axios({
        method: 'get',
        url: this.BASE_URL + '/mysql/association/actor/director/cooperation',
        params:{
          actorName:this.actorInputValue,
        } ,
        headers: {}
      }).then(response => {
        this.speed[0] = response.data.time
        this.directors = response.data.directors
        this.relationReady = true
      })

      // 向hive发送请求
      axios({
        method: 'get',
        url: this.HIVE_BASE_URL + '',
        data: this.actorInputValue,
        headers: {}
      }).then(response => {
        this.speed[1] = response.data.time
        this.distributeReady = true
      })

      // 向neo4j发送请求
      axios({
        method: 'get',
        url: '',
        data: this.actorInputValue,
        headers: {}
      }).then(response => {
        this.speed[2] = response.data.time
        this.graphReady = true
      })
      this.drawCharts3();
      this.searchText = "与演员" + this.actorInputValue + "合作次数最多的导演"
    },
    /**
     * 下面是搜索建议的函数
     **/
    movieSearchSuggest(queryString, cb) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: this.BASE_URL + '/mysql/association/movie',
        params: {"movieName": queryString},
        headers: {}
      };

      // 向mysql 发送请求
      axios(config)
          .then(response => {
            console.log(response.data)
            var result = []
            for (let i = 0; i < response.data.movies.length; ++i) {
              result.push({"value": response.data.movies[i]})
            }
            cb(result);
          })
          .catch(function (error) {
            this.$message.error('当前网络异常，请稍后再试');
          });
    }
    ,
    directorSearchSuggest(queryString, cb) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: this.BASE_URL + '/mysql/association/director',
        params: {"directorName": queryString},
        headers: {}
      };

      // 向mysql 发送请求
      axios(config)
          .then(response => {
            var result = []
            for (let i = 0; i < response.data.length; ++i) {
              if (result.length >= 25) {
                break
              }
              result.push({"value": response.data[i]})
            }
            cb(result);
          })
          .catch(function (error) {
            this.$message.error('当前网络异常，请稍后再试');
          });
    }
    ,
    actorSearchSuggest(queryString, cb) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: this.BASE_URL + '/mysql/association/actor',
        params: {"actorName": queryString},
        headers: {}
      };

      // 向mysql 发送请求
      axios(config)
          .then(response => {
            var result = []
            for (let i = response.data.length - 1; i >= 0; --i) {
              if (result.length >= 25) {
                break
              }
              result.push({"value": response.data[i]})
            }
            cb(result);
          })
          .catch(function (error) {
            this.$message.error('当前网络异常，请稍后再试');
          });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
    ,
    clearResult() {
      this.movieData.splice(0, this.movieData.length)
      this.hasResult = false
      this.movieLoading = false
      for (let i = 0; i < 3; ++i) {
        this.chartData.rows[i].speed = 0
      }
      this.searchText = "暂无查询"

    }
    ,

    /**
     * 下面是处理标签的函数
     **/
    showDirectorInput() {
      this.directorInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveDirectorTagInput.$refs.input.focus();
      });
    }
    ,

    handleDirectorInputConfirm(showMessage) {
      let inputValue = this.directorInputValue
      // 有效性判断
      if (!inputValue || inputValue.replace(/\s*/g, "").length == 0) {
        if (!this.directorInputVisible) {
          return;
        }
        if (showMessage) {
          this.$message({
            message: '请输入有效的导演名称！',
            type: 'warning'
          })
          this.directorInputVisible = false;
        }

        return;
      }
      this.form.movieDirectors.push(inputValue.replace(/^\s*|\s*$/g, ""));
      this.directorInputVisible = false;
      this.directorInputValue = '';
    }
    ,
    handleDirectorTagClose(tag) {
      this.form.movieDirectors.splice(this.form.movieDirectors.indexOf(tag), 1);
    }
    ,
    showMainActorInput() {
      this.mainActorInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveMainActorTagInput.$refs.input.focus();
      });
    }
    ,
    handleMainActorInputConfirm() {
      let inputValue = this.mainActorInputValue
      // 有效性判断
      if (!inputValue || inputValue.replace(/\s*/g, "").length == 0) {
        if (!this.mainActorInputVisible) {
          return;
        }
        this.$message({
          message: '请输入有效的主演名称！',
          type: 'warning'
        })
        this.mainActorInputVisible = false;
        return;
      }
      this.form.movieMainActors.push(inputValue.replace(/^\s*|\s*$/g, ""));
      this.mainActorInputVisible = false;
      this.mainActorInputValue = '';
    }
    ,
    handleMainActorTagClose(tag) {
      this.form.movieMainActors.splice(this.form.movieMainActors.indexOf(tag), 1);
    }
    ,

    showActorInput() {
      this.actorInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveActorTagInput.$refs.input.focus();
      });
    }
    ,
    handleActorInputConfirm() {
      let inputValue = this.actorInputValue
      // 有效性判断
      if (!inputValue || inputValue.replace(/\s*/g, "").length == 0) {
        if (!this.actorInputVisible) {
          return;
        }
        this.$message({
          message: '请输入有效的演员名称！',
          type: 'warning'
        })
        this.actorInputVisible = false;
        return;
      }
      this.form.movieActors.push(inputValue.replace(/^\s*|\s*$/g, ""));
      this.actorInputVisible = false;
      this.actorInputValue = '';
    }
    ,
    handleActorTagClose(tag) {
      this.form.movieActors.splice(this.form.movieActors.indexOf(tag), 1);
    }
    ,
    exampleTest() {
      this.form.category = 'Comedy';
      this.form.movieMinScore = 2.5;
      this.searchMovie();
    }
    ,
  }
}
</script>

<style scoped>
.el-divider--vertical {
  height: 100%;
}

.el-button {
  margin-top: 10px;
}

.button3 {
  margin-left: 0px;
}
</style>
