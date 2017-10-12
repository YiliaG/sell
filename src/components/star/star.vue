<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    export default {
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        }
      },
      computed: {
        starType: function () {
          return 'star-' + this.size;
        },
        itemClasses: function () {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          // 是否有半星
          let hasDecimal = score % 1 !== 0;
          // 计算有多少颗全星
          let integer = Math.floor(score);

          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
          }
          if (hasDecimal) {
            result.push(CLS_HALF);
          }
          while (result.length < LENGTH) {
            result.push(CLS_OFF);
          }
          return result;
        }
      }
    };
</script>

<style lang="scss" type="text/css">
    @import "../../common/scss/mixin.scss";
    .star{
        font-size: 0;
        .star-item{
            display: inline-block;
        }
        &.star-48{
            .star-item{
                margin-right: 22px;
                &:last-child{
                     margin-right: 0;
                 }
                &.on{
                    @include bg-image('star48_on',20px,20px);
                 }
                &.half{
                    @include bg-image('star48_half',20px,20px);
                 }
                &.off{
                    @include bg-image('star48_off',20px,20px);
                 }
            }
         }
        &.star-36{
            .star-item{
                margin-right: 6px;
                &:last-child{
                     margin-right: 0;
                 }
                &.on{
                    @include bg-image('star36_on',15px,15px);
                 }
                &.half{
                    @include bg-image('star36_half',15px,15px);
                 }
                &.off{
                    @include bg-image('star36_off',15px,15px);
                 }
            }
         }
        &.star-24{
            .star-item{
                margin-right: 3px;
                &:last-child{
                     margin-right: 0;
                 }
                &.on{
                    @include bg-image('star24_on',10px,10px);
                 }
                &.half{
                    @include bg-image('star24_half',10px,10px);
                 }
                &.off{
                    @include bg-image('star24_off',10px,10px);
                 }
            }
         }
    }
</style>