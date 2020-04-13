<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText">返回</block><block slot="content">最新资讯</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item, index) in categorylist" :index="index" :key="index" @tap="tabSelect" @click="getNewsList(item.category_id)" :data-id="index" :data-catid="item.category_id">
					<text>{{item.category}}</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in newslist" :index="index" :key="index" @click="newsClick(item.informationId)">
				<view class="content">
					<view class="flex">
						<view class="flex-sub padding-sm">
							<image :src="item.picture" class="png" mode="aspectFit" style="width: 100%; height: 80px;"></image>
						</view>
						<view class="flex-twice padding-sm ">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import serverurl from "@/common/globalconfigs.js"
	
	export default {
		components: {
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				categorylist: [],
				categoryId: 0,
				newslist: [],
			}
		},
		created() {
			this.getCategoryList()
			this.getNewsList(1)
		},
		methods: {
			tabSelect(e) {
				// console.log(e)
				this.categoryId = e.currentTarget.dataset.catid;
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// console.log(this.TabCur)
				// console.log(this.scrollLeft)
				this.getNewsList(this.categoryId)
			},
			// 咨询分类
			getCategoryList() {
				uni.request({
					url: serverurl + '/gxsdapi/get_information_category',
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.data
						this.categorylist = wlist
						// console.log(this.categorylist)
					}
				})
			},
			// 新闻列表
			getNewsList(id) {
				uni.request({
					url: serverurl + '/gxsdapi/get_information_list?category_id=' + id,
					success: (res) => {
						console.log(res.data)
						let wlist = res.data.data.data
						this.newslist = wlist
						// console.log(this.levellist)
					}
				})
			},
			newsClick(val){
				console.log(val)
				uni.navigateTo({
				    url: '../news/news-detail?id=' + val
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
