<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll'
	export default {
		name:'Scroll',
		props:{
			isScroll:{
				type:Number,
				default(){
					return 1
				}
			},
			isReflsh:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data(){
			return{
				scroll:null
			}
			
		},
		mounted(){
			this.scroll=new BetterScroll(this.$refs.wrapper,{
				click: true,
				probeType:this.isScroll,
				pullUpLoad: true
			}),
			
			this.scroll&&this.scroll.on("scroll",(position)=>{
				this.$emit("scroll",position);
			}),
			this.scroll&&this.scroll.on("pullingUp",()=>{
				this.$emit("pullingUp");
			})
			
		
		},
		methods:{
			scrollTo(x,y,time=300){
				this.scroll.scrollTo(x,y,time);
			},
			finishPullUp(){
				/* console.log("cccccc"); */
				this.scroll.finishPullUp();
			},
			refresh(){
				this.scroll.refresh();
				console.log("cc");
			}
			
		}
	}
</script>

<style scoped>
</style>
