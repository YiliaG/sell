<template>
    <div class="goods">
        <div class="menu-wrapper"></div>
        <div class="goods-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      };
    },
    created: function () {
      // 下面这行代码要添加，具体原因暂时不详
      var _this = this;
      const ERR_OK = 0;
      axios.get('api/goods').then(function (response) {
        if (response.data.errno === ERR_OK) {
          _this.goods = response.data.data;
          console.log(_this.goods);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  };
</script>

<style lang="scss" type="text/css">
    @import "../../common/scss/mixin.scss";
    @import "goods.scss";
</style>