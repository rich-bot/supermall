<template>
	<div class="good-list">
		<goods-list-item class="good-cc" v-for="(item,index) in list" :listItem="item">			
		</goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from '@/components/content/goods/GoodsListItem.vue'
	export default {
		name:'GoodsList',
		components:{
			GoodsListItem
		},
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.good-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around
	}
	.good-cc{
		width:48vw;
	}
</style>
