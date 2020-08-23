<template>
  <div id="home">
	  <nav-bar class="home-nav">
		  <div slot="center">购物街</div> 
	  </nav-bar>
	  <scroll class="content" ref="scroll" @scroll="scroll" :isScroll="3" @pullingUp="pullingUp" :isReflsh="true">
		 <banners :banners="banners"></banners>
		 <RecommendView :recommend="recommend"></RecommendView>  
		 <FeatureView></FeatureView>
		 <van-sticky :offset-top="44" class="sticky">
		   <tab-control :title="['流行','新款','精选']" class="tab-control" @changeIndex="changeIndex"></tab-control>
		 </van-sticky>
		 <goods-list :list="goods[currentIndex].list" class="good-list"></goods-list> 
	  </scroll>
	  <backToTop @click.native="backTop" v-show="isShow"></backToTop>
  </div>
</template>

<script>
  import BackToTop from '@/components/content/backToTop/BackToTop.vue'
  import Scroll from "@/components/common/scroll/Scroll.vue"
  import GoodsList from '@/components/content/goods/GoodsList.vue'
  import TabControl from '@/components/content/tabControl/TabControl.vue'
  import FeatureView from '@/views/home/childHome/FeatureView.vue'
  import NavBar from '@/components/common/navbar/NavBar.vue'
  import Banners from '@/components/common/banners/Banners.vue'
  import RecommendView from '@/views/home/childHome/RecommendView.vue'
  import {getHomeMultidata,getHomeGoods}	from '@/network/home.js'
  export default {
    name: "Home",
	components:{
		NavBar,
		Banners,
		RecommendView,
		FeatureView,
		TabControl,
		GoodsList,
		Scroll,
		BackToTop
	},
	data(){
		return {
			banners:[],
			recommend:[],
			goods:{
				'pop':{page:0,list:[]},
				'new':{page:0,list:[]},
				'sell':{page:0,list:[]},
			},
			currentIndex:'pop',
			isShow:true
		}
	},
	mounted(){
		/* console.log(this.$bus); */
		this.getHomeMultidata();
		this.getHomeGoods('pop');
		this.getHomeGoods('new');
		this.getHomeGoods('sell');
		
		const refresh=this.bounce(this.$refs.scroll.refresh);
		this.$bus.$on("loadImg",()=>{
			/* this.$refs.scroll.refresh(); */
			refresh();
			console.log("cccc");
		})
		
	},
	created() {
		
		
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
		pullingUp(){
			/* console.log("________"); */
			/* console.log("------"); */
			this.getHomeGoods(this.currentIndex);
			this.$refs.scroll.scroll.refresh();
		},
		scroll(position){
			/* console.log(-position.y) */
			if(-position.y>1000){
				this.isShow=true;
			}else{
				this.isShow=false;
			}
		},
		backTop(){
			/* console.log("ccccc"); */
			/* console.log(this.$refs.scroll.scroll) */
			this.$refs.scroll.scrollTo(0,0,300);
		},
		changeIndex(index){
			switch(index){
				case 0:
				      this.currentIndex='pop';
					  break;
			    case 1:
				      this.currentIndex='new';
					  break;
			    case 2:
				      this.currentIndex='sell';
					  break;
			}
		},
		/* 网络请求 */
		getHomeMultidata(){
			getHomeMultidata().then(res=>{
				console.log(res.data.banner);
				this.banners=res.data.banner.list;
				this.recommend=res.data.recommend.list;
				
			})
		},
		getHomeGoods(type){
			let page=this.goods[type].page+1;
			getHomeGoods(type,page).then(res=>{
				console.log(res);
				this.goods[type].list.push(...res.data.list);
				this.goods[type].page+=1;
				this.$refs.scroll.finishPullUp();
			})
			/* console.log(this.$refs.scroll); */
			
		}
		
	}
  }
</script>

<style scoped>
	
	#home{
		width: 100%;
		/* margin-top: 44px; */
		height: 100vh;
		/* padding-bottom: 1000px; */
		position: relative;
	}
	/* #home::before{
		display: block;
		content: "";
		overflow: hidden;
	} */
     .tab-control{
		 background-color: #fff;
	 }
/* 	.good-list{
		position: relative;
		z-index: 999;
	} */
  .home-nav{
	  /* width: 100%; */
	  background-color: var(--color-tint);
	  color: #FFF;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  z-index: 9;
  }
  .content{
	  /* height: 300px; */
	  position: absolute;
	  top: 44px;
	  /* top:0; */
	  bottom: 49px;
	  left: 0;
	  right: 0;
	  /* overflow: hidden; */
  }
/*  .tab-control{
	  position: -webkit-sticky;
	  top: 44px;
  } */
</style>
