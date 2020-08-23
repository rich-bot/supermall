<template>
	<div id="nav-bar-detail">
		<NavBar>
			<div slot="left" class="left" @click="backRouter">
				<img src="@/assets/img/common/back.svg" alt="">
			</div>
			<div slot="center" class="center">
				<div v-for="(item,index) in detailList " 
				class="itemCenter" 
				:class="{active:index===currentIndex}"
				@click="changeIndex(index)">
				{{item}}
				</div>
			</div>
		</NavBar>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar.vue"
	export default{
		name:"NavBarDetail",
		components:{
			NavBar
		},
		props:{
			currentIndex:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		data(){
			return{
				detailList:["商品","参数","评论","推荐"],
				/* currentIndex:0 */
			}
		},
		methods:{
			changeIndex(index){
				/* this.currentIndex=index; */
				this.$emit("throwchangeIndex",index);
			},
			backRouter(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.active{
		color: var(--color-high-text);
	}
	.left img{
		margin-top: 12px;
	}
	.center{
		display: flex;
	}
	.itemCenter{
		flex: 1;
	}
</style>
