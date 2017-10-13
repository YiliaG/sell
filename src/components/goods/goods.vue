<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
                    @click="selectMenu(index)">
                    <span class="text border-1px">
                        <span v-show="item.type > 0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopCart from '../../components/shopCart/shopCart.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      }
    },
    created: function () {
      // 下面这行代码要添加，具体原因暂时不详
      let _this = this;

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      const ERR_OK = 0;
      axios.get('api/goods').then(function (response) {
        if (response.data.errno === ERR_OK) {
          _this.goods = response.data.data;
          _this.$nextTick(() => {
            // 在这个函数中调用以防内容还未加载完就执行，获取不到元素的高度导致无法滑动
            _this._initScroll();
            _this.calcHeight();
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      _initScroll: function () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          // 该插件默认会阻止浏览器的原生 click 事件，设置去掉该阻止事件
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.goodsWrapper, {
          // 实时监听滚动的位置 BScroll的参数设置
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calcHeight: function () {
        let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          // 获得foodList
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu: function (index) {
        let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // scrollToElement 是 BScroll插件的接口
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    components: {
      // 注册组件
      shopCart
    }
  };
</script>

<style lang="scss" type="text/css">
    @import "../../common/scss/mixin.scss";
    @import "goods.scss";
</style>