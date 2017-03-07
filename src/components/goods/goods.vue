<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-wrapper>
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:foods-wrapper>
			<ul>
				<li v-for='item in goods' class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
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
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';

	const ERR_OK = 0;
	export default{
		data() {
			return {
				goods: []
			};
		},
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
					});
				}
			});
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$els.menuWrapper, {});
				this.foodsScroll = new BScroll(this.$els.foodsWrapper, {});
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
				}
			}
		}
	}
</style>