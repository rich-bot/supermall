<template>
	<div class="tabControl">
		<div class="tab-control-item" @click="changeIndex(index)" v-for="(item,index) in title" :key="index" :class="{active:index==currentIndex}">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'TabControl',
		props:{
			title:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				currentIndex:0
			}
		},
		methods:{
			changeIndex(index){
				this.currentIndex=index;
				this.$emit("changeIndex",index);
			}
		}
	}
</script>

<style>
	.tabControl{
		display: flex;
		text-align: center;
	}
	.tab-control-item{
		height: 40px;
		line-height: 40px;
		flex:1;
	}
	.tab-control-item span{
		padding: 3px;
	}
	.active{
		color: var(--color-high-text);
	}
	.active span{
		border-bottom: 2px solid var(--color-tint);
	}
</style>
