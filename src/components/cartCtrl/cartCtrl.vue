<template>
    <div class="cartCtrl">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count >0" @click="decreaseCart"></div>
        <div class="cart-count" v-show="food.count >0">{{food.count}}</div>
        <div class="cart-add icon-add_circle"  @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created: function () {
      console.log(this.food);
    },
    methods: {
      addCart: function () {
        console.log('click');
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart: function () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="scss" type="text/css">
    .cartCtrl {
        font-size: 0;
        .cart-decrease, .cart-add {
            display: inline-block;
            font-size: 24px;
            line-height: 24px;
            padding: 6px;
            color: rgb(0, 160, 220);
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            color: rgb(147, 153, 159);
            padding-top: 6px;
            text-align: center;
        }
    }
</style>