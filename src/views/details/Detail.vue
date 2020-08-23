<template>
	<div id="detail">
		<NavBarDetail class="navbar" @throwchangeIndex="throwchangeIndex" :currentIndex="currentIndex" >	
		</NavBarDetail>
		<scroll class="content" :isScroll="3" ref="scroll" @scroll="scrollBar">
			<BannersTwo :banners="topImg" ref="base"  >
			</BannersTwo>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"></detail-goods-info>
			<detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
		</scroll>
		<backToTop @click.native="backTop" v-show="isShow"></backToTop>
		<detail-bottom-bar></detail-bottom-bar>
		
	</div>
	
</template>

<script>
	import Scroll from "@/components/common/scroll/Scroll.vue"
	import NavBarDetail from "@/views/details/childrendetail/NavBarDetail.vue"
	import BannersTwo from "@/components/common/banners/BannersTwo.vue"
	import DetailBaseInfo from './childrendetail/DetailBaseInfo'
	import DetailShopInfo from './childrendetail/DetailShopInfo'
	import DetailGoodsInfo from './childrendetail/DetailGoodsInfo'
	import DetailParamInfo from './childrendetail/DetailParamInfo'
	import DetailCommentInfo from './childrendetail/DetailCommentInfo'
	import DetailBottomBar from '@/views/details/childrendetail/DetailBottomBar'
	import DetailRecommendInfo from './childrendetail/DetailRecommendInfo'
	import BackToTop from '@/components/content/backToTop/BackToTop.vue'
	//网络层
	import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail.js"
	export default {
		name:"Detail",
		components:{
			NavBarDetail,
			BannersTwo,
			Scroll,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			DetailRecommendInfo,
			BackToTop
		},
		data(){
			return {
					id:0,
					itemData:null,
					topImg:[],
					goods: {},
					shop: {},
					detailInfo: {},
					paramInfo: {},
					commentInfo: {},
					recommendList: [],
					themeTops: [],
					currentIndex: 0,
					isShow:false
			}
		},
		created() {
			/* this.id=this.$route.params.id
			getDetail(this.id).then(res=>{
				this.topImg=res.result.itemInfo.topImages;
				console.log(this.topImg);
			}) */
			this._getDetailData()
			this._getRecommend()
		},
		updated() {
			this._getThemeTops();
		},
		methods:{
			//防抖函数
			bounce(fn,timer=300){
				let timers=null;
				return function(){
					timers&&clearTimeout(timers);
					timers=setTimeout(function(){
						fn.apply(this);
						
					},timer)
				}
			},
			//获得4个子组件的高度
			_getThemeTops(){
				this.themeTops=[];
				this.themeTops.push(this.$refs.base.$el.offsetTop);
				this.themeTops.push(this.$refs.param.$el.offsetTop);
				this.themeTops.push(this.$refs.comment.$el.offsetTop);
				this.themeTops.push(this.$refs.recommend.$el.offsetTop);
				this.themeTops.push(Number.MAX_VALUE);
				/* console.log(this.themeTops); */
				
			},
			//获取详情数据
			_getDetailData() {
			  // 1.获取iid
			  /* const iid = this.$route.query.iid
			  this.iid = iid */
			   this.id=this.$route.params.id
			  // 2.请求数据
			  getDetail(this.id).then(res => {
			    // 2.1.获取结果
			    const data = res.result;
			
			    // 2.2.获取顶部信息
			    this.topImg = data.itemInfo.topImages;
			
			    // 2.3.获取商品信息
			    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
			
			    // 2.4.获取店铺信息
			    this.shop = new Shop(data.shopInfo);
			
			    // 2.5.获取商品信息
			    this.detailInfo = data.detailInfo
			
			    // 2.6.保存参数信息
			    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
			
			    // 2.7.保存评论信息
			    if (data.rate.list) {
			      this.commentInfo = data.rate.list[0];
			    }
			  })
			},
			_getRecommend() {
			  getRecommend().then((res, error) => {
			    if (error) return
			    this.recommendList = res.data.list
			  })
			}
		    ,
			//切换标签到相应的位置
			throwchangeIndex(index){
				/* console.log(index);	 */	
				/* this.currentIndex=index; */		
				this.$refs.scroll.scrollTo(0,-this.themeTops[index],200);
			},
			scrollBar(position){
				/* console.log(-position.y); */
				const length=this.themeTops.length;
				/* console.log(length); */
				
				for(let i=0;i<length-1;i++){
					if((this.currentIndex!=i)&&(-position.y>=this.themeTops[i]&&-position.y<this.themeTops[i+1])){
						console.log(i);
						this.currentIndex=i;
					}
				}
				if(-position.y>1000){
					this.isShow=true;
				}else{
					this.isShow=false;
				}
			},
			backTop(){
				this.$refs.scroll.scrollTo(0,0,300);
			}
		}
		,
		mounted() {
			const refresh=this.bounce(this.$refs.scroll.refresh);
			this.$bus.$on("loadDetail",()=>{
				/* this.$refs.scroll.refresh(); */
				refresh();
				/* console.log("loadDetail"); */
			})
		}
       
	}
</script>

<style scoped>
	#detail {
	  height: 100vh;
	  position: relative;
	  z-index: 1;
	  background-color: #fff;
	}
	.content {
	  position: absolute;
	  top: 44px;
	  bottom: 60px;
	  left: 0;
	  right: 0;
	}
	.navbar{
		position: relative;
		background-color: #FFFFFF;
		z-index: 9;
	}
</style>
