<template>
	<div class="backtoTop">
		<img src="@/assets/img/common/top.png" alt="">
	</div>
</template>

<script>
	export default{
		name:'BackToTop',
		
	}
</script>

<style scoped>
	.backtoTop{
		position: fixed;
		right: 10px;
		bottom: 49px;
		/* z-index: 999; */
	}
	.backtoTop img{
		width: 50px;
		height: 50px;
	}
</style>
