<template>
	<view v-if="flag === 1">
	</view>
	
	<view v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">{{categoryName}}</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in publicslist" :index="index" :key="index" @click="publicsClick(item.informationId)">
				<view class="content padding-xs">
					<view class="text-grey">
						<text class="text-black">{{item.title}}</text>
					</view>
					<view class="text-black text-sm text-right">
						<text class="text-right">{{item.createAt}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	import configService from "@/services/config.service.js"
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option && option.id != undefined){
				this.categoryId = option.id
			}
			if(option && option.name != undefined){
				this.categoryName = option.name
			}
			this.getNewsList(this.categoryId)
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				categorylist: [],
				categoryId: 26,
				categoryName: '',
				publicslist: [],
				
			}
		},
		created() {
			// this.getCategoryList()
			this.getNewsList(this.categoryId)
		},
		methods: {
			// 新闻列表
			getNewsList(id) {
				if(id > 0){
					uni.request({
						url: configService.apiUrl + '/getPublicListByCategoryId?categoryid=' + id + '&pageSize=50',
						success: (res) => {
							console.log(res.data)
							let wlist = res.data.data
							this.publicslist = wlist
							// console.log(this.levellist)
						}
					})
				}
			},
			publicsClick(val){
				console.log(val)
				uni.navigateTo({
				    url: '../public/public-detail?id=' + val
				});
			}
		}
	}
	
	
</script>

<style>
	.h3 {
		font-size: 46rpx;
	}
	
	.dept-img {
		width: 60px;
		height: 60px;
	}
</style>
