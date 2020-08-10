<template>
	<div class="recommend">
		<div v-for="(item,index) in recommend" :key="index" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="">
			</a>
			<div>{{item.title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'RecommendView',
		props:{
			recommend:{
				type:Array,
				default(){
					return [];
				}
			}
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		text-align: center;
		width: 100%;
		padding: 10px 10px;
		border-bottom: 5px solid #eee;
	}
	.recommend-item{
		flex: 1;
		
	}
	.recommend-item img{
		width: 5rem;
		height: 5rem;	
	}
</style>
