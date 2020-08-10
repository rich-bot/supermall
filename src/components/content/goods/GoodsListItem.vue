<template>
	<div class="goods-list-item">
		<img :src="listItem.show.img" alt="">
		<div class="goods-info">
			<p>{{listItem.title}}</p>
			<span class="price">{{listItem.price}}</span>
			<span class="collect">{{listItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'GoodsListItem',
		props:{
			listItem:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style>
	.goods-list-item{
		width: 100%;
		position: relative;
		padding-bottom: 44px;
	}
	.goods-list-item img{
		width: 100%;
		border-radius: 5px;
	}
	.goods-info{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 5px;
		overflow: hidden;
		text-align: center;
		font-size: 14px;
	}
	.goods-info p{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 3px;
	}
	.goods-info .price{
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods-info .collect{
		position: relative;
	}
	.goods-info .collect::before{
		content: "";
		position: absolute;
		background: url(../../../assets/img/common/collect.svg) 0  0/14px 14px;
		width: 14px;
		height: 14px;
		left: -15px;
		top: -1px;
		/* background-color: red; */
	}
</style>
