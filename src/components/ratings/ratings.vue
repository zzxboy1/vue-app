<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-time">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @ratingtypeSelect="ratingtypeSelect" @contentToggle="contentToggle"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="recommend-wrapper">
									<span v-for="recommend in rating.recommend" class="item">{{recommend}}</span>
								</span>
							</div>
							<div class="time">{{rating.rateTime|formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import star from 'components/star/star';
	import split from 'components/split/split';
	import BScroll from 'better-scroll';
	import ratingselect from 'components/ratingselect/ratingselect';
	import {formatDate} from '../../common/js/date';
	const ALL = 2;
	export default{
		data() {
			return {
				onlyContent: true,
				selectType: ALL,
				ratings: [],
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			};
		},
		created() {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if (response.errno === 0) {
					this.ratings = response.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					});
				}
			});
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		methods: {
			needShow(type,text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			ratingtypeSelect(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			contentToggle() {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		}
	};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	@import '../../common/sass/mixin';
	.ratings{
		position:absolute;
		width:100%;
		top:174px;
		bottom:0;
		left:0;
		overflow:hidden;
		.overview{
			display:flex;
			padding:18px 0;
			.overview-left{
				flex:0 0 137px;
				width:137px;
				border-right:1px solid rgba(7,17,27,0.1);
				text-align:center;
				padding:6px 0;
				@media screen and (max-width:320px){
					flex: 0 0 110px;
					width:110px;
				}
				.score{
					font-size:24px;
					line-height:28px;
					color:rgb(255,153,0);
				}
				.title{
					margin-top:6px;
					line-height:12px;
					font-size:12px;
					color:rgb(7,17,27);
				}
				.rank{
					margin-top:8px;
					line-height:10px;
					font-size:10px;
					color:rgb(147,153,159);
				}
			}
			.overview-right{
				flex:1;
				padding:6px 0 6px 24px;
				@media screen and (max-width:320px){
					padding-left:6px;
				}
				.score-wrapper{
					margin-bottom:8px;
					font-size:0;
					.title{
						display:inline-block;
						line-height:18px;
						vertical-align:top;
						font-size:12px;
						color:rgb(7,17,27);
					}
					.star{
						display:inline-block;
						vertical-align:top;
						margin:0 12px;
					}
					.score{
						display:inline-block;
						line-height:18px;
						vertical-align:top;
						font-size:12px;
						color:rgb(255,153,0);
					}
				}
				.delivery-time{
					font-size:0;
					.title{
						line-height:18px;
						font-size:12px;
						color:rgb(7,17,27);
					}
					.delivery{
						margin-left:12px;
						font-size:12px;
						color:rgb(147,153,159);
					}
				}
			}
		}
		.rating-wrapper{
			padding:0 18px;
			.rating-item{
				display:flex;
				padding: 18px 0;
				@include border-1px(rgba(7,17,27,0.1));
				.avatar{
					flex:0 0 28px;
					width:28px;
					margin-right:12px;
					img{
						border-radius:50%;
					}
				}
				.content{
					position:relative;
					flex:1;
					.name{
						line-height:12px;
						font-size:10px;
						color:rgb(7,17,27);
						margin-bottom:4px;
					}
					.star-wrapper{
						margin-bottom:6px;
						font-size:0;
						.star{
							display:inline-block;
							margin-right:6px;
							vertical-align:top;
						}
						.delivery{
							display:inline-blokc;
							vertical-align:top;
							line-height:12px;
							font-size:10px;
							color:rgb(147,153,159);
							font-weight:200;
						}
					}
					.text{
						line-height:18px;
						color:rgb(7,17,27);
						font-size:12px;
						margin-bottom:8px;
					}
					.recommend{
						line-height:16px;
						font-size:0;
						display:flex;
						.icon-thumb_up, .item{
							margin:0 8px 4px 0;
						}
						.icon-thumb_up{
							flex:0 0 12px;
							color:rgb(0,160,220);
							font-size:12px;
						}
						.recommend-wrapper{
							flex:1;
							.item{
								display:inline-block;
								font-size:9px;
								padding:0 6px;
								border:1px solid rgba(7,17,27,0.1);
								border-radius:1px;
								color:rgb(147,153,159);
								background:#fff;
							}
						}
					}
					.time{
						position:absolute;
						top:0;
						right:0;
						line-height:12px;
						font-size:10px;
						color:rgb(147,153,159);
					}
				}
			}
		}
	}
</style>
