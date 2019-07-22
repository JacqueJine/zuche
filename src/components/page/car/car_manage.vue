<template>
  <div class="box">
    <p class="top">当前位置：门店 > 车辆管理</p>
    <div class="inquire">
      <h1>请输入要查询的信息</h1>
      <form action>
        <p>
          车牌号
          <input type="text" v-model="mes" required :placeholder="holder"/>
          <button @click="f_car">查询</button>
        </p>
      </form>
    </div>
    <div class="message">
      <div class="message_y">
        <p>
          <span>车辆实景</span>
          <span>车牌号</span>
          <span>发动机号码</span>
          <span>荷载人数</span>
          <span>注册时间</span>
          <span>发证时间</span>
        </p>
      </div>
      <div class="message_x">
        <ul v-if="blok">
          <li v-for="(item,index) in car" :key="index">
            <img :src="item.carPicture" />
            <span>{{item.carNums}}</span>
            <span>{{item.carEngine}}</span>
            <span>{{item.compartment}}人</span>
            <span>{{item.carRegister | regis}}</span>
            <span>{{item.carDistribute | distr}}</span>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item,index) in fcar" :key="index">
            <img :src="item.carPicture" />
            <span>{{item.carNums}}</span>
            <span>{{item.carEngine}}</span>
            <span>{{item.compartment}}人</span>
            <span>{{item.carRegister | regis}}</span>
            <span>{{item.carDistribute | distr}}</span>
          </li>
        </ul>
        <ul v-show="load">
          <li>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563684033748&di=70ee71fa8ab11429d76c5250d7f0d1ca&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2Fmp17826536_1433492197010_5.gif"
              alt
            />
            <span>加载中……</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //数据
  data() {
    return {
      //总车量
      car: [],
      //用户输入信息
      mes: "",
      //查询到的车
      fcar: [],
      //显示总车还是查询到的车
      blok: true,
      //加载
      load: true,
      //车牌错
      holder:''
    };
  },
  //过滤器
  filters: {
    regis(data) {
      return "2016-08-12";
    },
    distr(data) {
      return "2017-04-13";
    }
  },
  //生命周期函数
  mounted() {
    /* //请求拦截
    this.axios.interceptors.request.use(
      function(config) {
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
    //响应
    this.axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        return Promise.reject(error);
      }
    ); */
    //请求出数据
    this.axios
      .get(
        "http://172.25.1.196:8080/backstage/prearrange"
      )
      .then(res => {
        this.load = false;
        this.car = res.data;
      })
      .catch(err => {
        this.load = false;
        this.car = [
          {
            compartment: "数据丢失，追逐中……!!!!!!!坏",
            carPicture:
              "http://ww2.sinaimg.cn/large/85cccab3gw1etdge31p06g20ia0dqkjl.jpg"
          }
        ];
      });
  },
  //方法
  methods: {
    //车辆查询
    f_car() {
      if (this.mes != "") {
        this.fcar = [];
        let ex = new RegExp(this.mes);
        for (let i in this.car) {
          if (ex.test(this.car[i].carNums)) {
            this.blok = false;
            this.fcar.push(this.car[i]);
          }
        }
        if(this.fcar==""){
          this.mes='';
          this.holder='车牌号输入错误！'
        }else{
          this.holder=''
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #f0f9ff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow: scroll;
  .top {
    font-size: 12px;
    position: absolute;
    top: 0px;
    left: 20px;
    color: black;
    a {
      text-decoration: none;
      color: black;
    }
  }
  .inquire {
    padding: 25px;
    background: white;
    margin-bottom: 20px;
    h1 {
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 20px;
    }
    p {
      input {
        width: 160px;
        height: 32px;
        margin: 0 160px 0 20px;
        border-radius: 3px;
        outline: none;
        background: url("./../reserve/img/icon.png@2x.png") no-repeat 136px 8px;
      }
      ::-webkit-input-placeholder{
        color:red;
      }
      button {
        border: none;
        border-radius: 5px;
        width: 92px;
        height: 32px;
        background: rgb(255, 212, 9);
        text-decoration: none;
        line-height: 32px;
        text-align: center;
        color: black;
        cursor: pointer;
      }
    }
  }
  .message {
    height: 310px;
    background: white;
    margin-bottom: 20px;
    .message_y {
      height: 50px;
      background-color: #feed9d;
      p {
        height: 50px;
        span:nth-child(1) {
          margin-left: 84px;
        }
        span:nth-child(2) {
          margin-left: 110px;
        }
        span:nth-child(3) {
          margin-left: 78px;
        }
        span:nth-child(4) {
          margin-left: 44px;
        }
        span:nth-child(5) {
          margin-left: 78px;
        }
        span:nth-child(6) {
          margin-left: 124px;
        }
        span {
          line-height: 50px;
          display: inline-block;
        }
      }
    }
    .message_x {
      ul {
        background: white;
        li {
          list-style: none;
          height: 110px;
          //   position: relative;
          overflow: hidden;
          margin-top: 30px;
          img {
            // margin-top: 10px;
            width: 170px;
            height: 80px;
            display: inline-block;
            float: left;
            margin-left: 10px;
          }
          span:nth-child(2) {
            margin-left: 70px;
          }
          span:nth-child(3) {
            margin-left: 32px;
          }
          span:nth-child(4) {
            margin-left: 29px;
          }
          span:nth-child(5) {
            margin-left: 83px;
          }
          span:nth-child(6) {
            margin-left: 100px;
          }
          span {
            //   position: absolute;
            //   top: 10px;
            //   left: 10px;
            display: inline-block;
            line-height: 80px;

            height: 20px;
          }
        }
      }
    }
  }
}
</style>