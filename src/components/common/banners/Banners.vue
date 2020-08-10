<template>
	<div id="banners">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item  v-for="(item, index) in banners" :key="index">
		   <img :src="item.image" alt="">
		  </van-swipe-item>
		</van-swipe>
	</div>
	
</template>

<script>
	export default {
		name:'Banners',
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
    
<style>
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
	  .van-swipe-item img{
		  width: 100%;
	  }
</style>
