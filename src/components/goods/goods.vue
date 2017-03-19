<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @touchend="selectMenu(index)">
						<span class="text border-1px">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for='item in goods' class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" @click="selectFood(food,$event)" class="food-item border-1px">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="sell-count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol @add="drop" :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shop-cart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>		
		</div>
		<food :food="selectedFood" @add="addFood" ref="food"></food>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';
	import shopCart from 'components/shopCart/shopCart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';
	const ERR_OK = 0;
	export default{
		components: {
			shopCart,
			cartcontrol,
			food
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		props: {
			seller: {
				type: Object
			}
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let height = 0;
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index) {
				let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			selectFood(food,event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			addFood(target) {
				this.drop(target);
			},
			drop(target) {
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			}
		}
	};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	@import '../../common/sass/mixin';
	.goods{
		display:flex;
		position:absolute;
		top:174px;
		bottom:46px;
		width:100%;
		overflow:hidden;
		.menu-wrapper{
			flex: 0  0 80px;
			width:80px;
			background:#f3f5f7;
			.menu-item{
				padding:0 12px;
				display:table;
				height:54px;
				width:56px;
				line-height:14px;
				font-size:0;
				&.current{
					background:#fff;
					font-weight:700;
					z-index:10;
					position:relative;
					margin-top:-1px;
					.text{
						border:none;
					}
				}
				.icon{
						display: inline-block;
						vertical-align: top;
						width: 12px;
						height: 12px;
						margin-right: 2px;
						background-size:12px 12px;
						background-repeat:no-repeat;
						&.decrease{
							@include bg-image('decrease_3');
						}
						&.discount{
							@include bg-image('discount_3');
						}
						&.guarantee{
							@include bg-image('guarantee_3');
						}
						&.special{
							@include bg-image('special_3');
						}
						&.invoice{
							@include bg-image('invoice_3');
						}
				}
				.text{
					display:table-cell;
					width:56px;
					font-size: 12px;
					vertical-align:middle;
					@include border-1px(rgba(7,17,27,0.1));
				}
				&:nth-child(1){
					.text{
						&::after{
							border:none;
						}
					}
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left:14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color: rgb(147,153,159);
				background-color:#f3f5f7;
			}
			.food-item{
				display:flex;
				padding-bottom:18px;
				margin:18px;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					margin-bottom:0;
					&::after{
						border:none;
					}
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;
					.name{
						font-size:14px;
						margin:2px 0 8px 0;
						line-height:14px;
						color:rgb(7,17,27);
					}
					.desc{
						margin-bottom:8px;
						line-height:12px;
						font-size:10px;
						color:rgb(147,153,159);
					}
					.extra{
						line-height:10px;
						font-size:10px;
						color:rgb(147,153,159);
						.sell-count{
							margin-right:12px;
						}
					}
					.price{
						line-height:24px;
						.now{
							margin-right:8px;
							font-size: 14px;
							color:rgb(240,20,20);
							font-weight:700;
						}
						.old{
							text-decoration:line-through;
							font-size:10px;
							color:rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position:absolute;
						right:0;
						bottom:12px;
					}
				}
			}
		}
	}
</style>
