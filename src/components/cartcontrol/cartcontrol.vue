<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"  @touchend.stop.prevent="decreaseCart" transition="move"></div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @touchend.stop.prevent="addCart"></div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if (!this.food.count) {
					Vue.set(this.food,'count', 1);
				} else {
					this.food.count++;
				}
				this.$dispatch('cart.add', event.target);
			},
			decreaseCart() {
				if (this.food.count) {
					this.food.count--;
				} else {
					this.scroll.refresh();
				}
			}
		}
	};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.cartcontrol{
		font-size:0;
		%cart-ad{
			font-size:24px;
			line-height:24px;
			display:inline-block;
			padding: 6px;
			color:rgb(0,160,220);
		}
		.cart-decrease{
			@extend %cart-ad;
			&.move-transition{
				transition: all 0.4s linear;
				opacity: 1;
				transform: translate3d(0,0,0) rotate(0);
			}
			&.move-enter, &.move-leave{
				opacity: 0;
				transform: translate3d(24px,0,0) rotate(180deg);
			}
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			padding-top:6px;
			width:12px;
			text-align:center;
			font-size:10px;
			line-height:24px;
			color:rgb(147,153,159);
		}
		.cart-add{
			@extend %cart-ad;
		}
	}
</style>