<template>
  <div class="login">
    <div class="out">
      <form action>
        <p>
          用户名:
          <input type="text" v-model="user" required :placeholder="holder"/>
        </p>
        <p>
          密&nbsp;&nbsp;&nbsp;码:
          <input type="password" v-model="pass" required :placeholder="holder"/>
        </p>
        <p>
          <span>忘记密码</span>
        </p>
        <p>
          <button @click="login">登录</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户名
      user: "",
      //密码
      pass: "",
      //后台返回的用户名和密码
      all: {},
      //用户名或密码错误
      holder:''
    };
  },
  mounted() {
    //数据请求
    this.axios
      .get("http://172.25.5.219:8080/carRental_war_exploded/backstage/findnpwd")
      .then(res => {
        this.all = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //登录按钮处理
    login() {
      if ('123qwe' == this.user && '123qwe' == this.pass) {
        this.$router.push("/home");
      } else if (this.user == "" || this.pass == "") {
      } else {
        this.user='',
        this.pass='',
        this.holder='用户名或密码错误！'
      }
    }
  }
};
</script>

<style scopde lang='less'>
.login {
  width: 100%;
  height: 100%;
  background: url("./img/bg.jpg@2x.png") no-repeat 0 0;
  background-size: 100% 100%;
  .out {
    width: 364px;
    height: 411px;
    background: url("./img/login.png@2x.png") no-repeat 0 0;
    position: absolute;
    right: 210px;
    bottom: 100px;
    p {
      width: 310px;
      height: 52px;
      background: white;
      margin: 48px auto 0;
      line-height: 52px;
      text-indent: 33px;
      font-size: 18px;
      color: #666666;
      input {
        border: none;
        outline: none;
      }
      ::-webkit-input-placeholder{
        color:red;
      }
    }
    p:nth-of-type(3) {
      background: transparent;
      margin: 0;
      height: 48px;
      line-height: 48px;
      text-indent: 0;
      overflow: hidden;
      width: 100%;
      span {
        float: right;
        font-size: 14px;
        margin-right: 70px;
        cursor: pointer;
      }
      background: url("./img/icon.png@2x.png") no-repeat 300px center;
    }
    p:last-child {
      margin: 0 auto;
      text-indent: 0;
      background: transparent;
      button {
        width: 100%;
        height: 100%;
        border: none;
        background: #ffd409;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>


