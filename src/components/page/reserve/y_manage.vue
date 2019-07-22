<template>
  <div class="y_manage">
    <p class="top">当前位置：门店 >预订</p>
    <div>
      <h1>请输入要查询的信息</h1>
      <form action>
        <p>
          手机号
          <input type="text" v-model="phone" required :placeholder="holder"/>
          <button @click="y_find">查询</button>
        </p>
      </form>
    </div>
    <table>
      <tr>
        <td>客户姓名</td>
        <td>手机号码</td>
        <td>租赁方式</td>
        <td>车型</td>
        <td>证件类型</td>
        <td>证件号码</td>
        <td>取车时间</td>
        <td>操作</td>
      </tr>

      <tr v-for="(item,index) in y_user" :key="index">
        <td>{{item.userInfo.userName}}</td>
        <td>{{item.userInfo.userPhone}}</td>
        <td>{{item.userInfo.leaseWay}}</td>
        <td>{{item.carRentalMessage.type}}</td>
        <td>居民身份证</td>
        <td>{{item.userInfo.identityCard}}</td>
        <td>{{item.userInfo.rentTime}}</td>
        <td>
          <span></span>
          <span @click="del(index)"></span>
        </td>
      </tr>
      <tr v-show="err">
        <td>数据库维护中…… 稍后再查询吧</td>
      </tr>
      <tr v-show="load" id="load">
        <td>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563685261263&di=037cee8fd37358f29b768bfa7be8304f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011ed35704c9b232f875a94481a665.gif"
            alt
          />
        </td>
        <td>加载中……</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有用户
      y_user: [],
      //查询到的用户
      y_use: [],
      //手机号
      phone: "",
      err: false,
      load: true,
      //手机号不存在
      holder:''
    };
  },
  methods: {
    //查询
    y_find() {
      if (this.phone != "") {
        this.y_use = [];
        let ex = new RegExp(this.phone);
        for (let i in this.y_user) {
          if (ex.test(this.y_user[i].userInfo.userPhone)) {
            this.y_use.push(this.y_user[i]);
            this.$store.commit("y_fin", this.y_use);
            this.$router.push("/home/accept");
          }
        }
        if(this.y_use==""){
          this.phone='';
          this.holder='手机号输入错误！'
        }else{
          this.holder=''
        }
      }
    },
    //删除
    del(index) {
      this.y_user.splice(index, 1);
    }
  },
  mounted() {
    //请求出数据
    this.axios
      .get(
        "http://172.25.1.196:8080/backstage/findByIdjson"
      )
      .then(res => {
        this.load = false;
        this.y_user = res.data;
      })
      .catch(err => {
        this.load = false;
        this.err = true;
      });
  }
};
</script>

<style lang="less" scoped>
.y_manage {
  width: 100%;
  height: 100%;
  background: rgb(240, 249, 255);
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  .top {
    font-size: 12px;
    position: absolute;
    top: 0px;
    left: 20px;
    color: black;
  }
  div {
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
        background: url("./img/icon.png@2x.png") no-repeat right center;
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
  table {
    #load {
      img {
        width: 200px;
        height: 150px;
      }
    }
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    tr {
      height: 40px;
      line-height: 40px;
    }
    tr:nth-of-type(2n + 1) {
      background: white;
    }
    tr:nth-of-type(2n) {
      background: #cccccc;
    }
    tr:nth-of-type(1) {
      background: rgb(254, 237, 157);
    }
    td {
      span {
        display: inline-block;
        width: 25px;
        height: 30px;
        cursor: pointer;
        margin-top: 7px;
      }
      span:nth-of-type(1) {
        background: url("./../member/img/bian.png") no-repeat center center;
        background-size: 100% 100%;
      }
      span:nth-of-type(2) {
        background: url("./../member/img/del.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>