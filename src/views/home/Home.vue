<template>
  <div id="home">
	  <nav-bar class="home-nav">
		  <div slot="center">购物街</div> 
	  </nav-bar>
	  <banners :banners="banners"></banners>
	  <RecommendView :recommend="recommend"></RecommendView>  
	  <FeatureView></FeatureView>
	  <van-sticky :offset-top="44">
	    <tab-control :title="['流行','新款','精选']" class="tab-control" @changeIndex="changeIndex"></tab-control>
	  </van-sticky>
	  <goods-list :list="goods[currentIndex].list" class="good-list"></goods-list>
  </div>
</template>

<script>
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
		GoodsList
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
			currentIndex:'pop'
		}
	},
	created() {
		this.getHomeMultidata()
		this.getHomeGoods('pop');
		this.getHomeGoods('new');
		this.getHomeGoods('sell');
		
	},
	methods:{
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
				this.goods[type].list.push(...res.data.list);
				this.goods[type].page+=1;
			})
		}
		
	}
  }
</script>

<style scoped>
	#home{
		width: 100%;
		margin-top: 44px;
		padding-bottom: 1000px;
	}
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
/*  .tab-control{
	  position: -webkit-sticky;
	  top: 44px;
  } */
</style>
