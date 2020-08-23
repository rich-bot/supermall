<template>
	<div id="banners">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item  v-for="(item, index) in banners" :key="index">
		   <img :src="item" alt="">
		  </van-swipe-item>
		</van-swipe>
	</div>
	
</template>

<script>
	export default {
		name:'BannersTwo',
		props:{
			banners:{
				type:Array,
				default(){
					return [];
				}
			}
		}
	}
</script>
    
<style scoped>
	 /* .my-swipe .van-swipe-item {
	    color: #fff;
	    font-size: 20px;
	    line-height: 150px;
	    text-align: center;
	    background-color: #39a9ed;
	  } */
	  #banners{
		  width: 100%;
	  }
	  .van-swipe-item{
		  height: 300px;
	  }
	  .van-swipe-item img{
		  width: 100%;
		 /* height: 400px; */
	  }
</style>
