<template>
    <div id="app">
        <!--:seller="seller" 传递给子组件-->
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import axios from 'axios';

  export default {
    data: function () {
      return {
        seller: {}
      };
    },
    created: function () {
      // 下面这行代码要添加，具体原因暂时不详
        var _this = this;
        const ERR_OK = 0;
        axios.get('api/seller').then(function (response) {
            if (response.data.errno === ERR_OK) {
              _this.seller = response.data.data;
//              console.log(_this.seller);
            }
          }).catch(function (error) {
            console.log(error);
          });
    },
    name: 'app',
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss" type="text/css">
    @import 'common/scss/mixin.scss';
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include border-1px(rgba(7,17,27,0.1));
        .tab-item {
            flex: 1;
            text-align: center;
            &> a {
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);
                &.active{
                     color: rgb(240,20,20);
                 }
            }
        }
    }
</style>
