<template>
	<view v-if="flag === 1">
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
	
	<view v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">资讯</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item, index) in categorylist" :index="index" :key="index" @tap="tabSelect" @click="getNewsList(index)" :data-id="index" :data-catid="index+1">
					<text class="text-lg">{{item}}</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item, index) in newslist" :index="index" :key="index" @click="newsClick(item.informationId)">
				<view class="cu-avatar lg" :style="'background-image:url(' + item.picture + ');width:120rpx;'">
				</view>
				<view class="content padding-sm">
					<view class="text-grey" style="width: 500rpx;">
						<view class="text-cut text-black text-lg">{{item.title}}</view>
					</view>
					<view class="text-gray text-df flex" style="width: 500rpx;">
						<view class="text-cut">
							{{item.brief}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-blue text-sm">{{item.publishTime}}天前</view>
				</view>
			</view>
			<!-- <view class="cu-item" v-for="(item, index) in newslist" :index="index" :key="index" @click="newsClick(item.informationId)">
				<view class="content">
					<view class="flex">
						<view class="flex-sub padding-sm">
							<image :src="item.picture" class="png" mode="scaleToFill" style="width: 100%; height: 70px;"></image>
						</view>
						<view class="flex-twice padding-sm ">
							<view class="title text-cut" style="width: 400rpx;">{{item.title}}</view>
							<view class="text-gray text-cut" style="width: 400rpx;">{{item.brief}}</view>
						</view>
					</view>
				</view>
			</view> -->
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
				this.TabCur = option.id - 1
				this.getNewsList(this.categoryId)
			}
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				TabCur: 0,
				scrollLeft: 0,
				categorylist: ["政府信息","霞客资讯","公示公告"],
				categoryNameList: ["政府信息","霞客资讯","图说政策"],
				categoryId: 1,
				newslist: [],
				
			}
		},
		created() {
			// this.getCategoryList()
			this.getNewsList(this.categoryId)
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
					url: configService.apiUrl + '/get_information_category',
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
				if(id > 0){
					uni.request({
						url: configService.apiUrl + '/get_information_list?category=' + this.categoryNameList[id-1] + '&pageSize=50',
						success: (res) => {
							console.log(res.data)
							let wlist = res.data.data.data
							this.newslist = wlist
							// console.log(this.levellist)
							// Math.floor((new Date().getTime()-new Date(item.publishTime.replace(/\-/g, "/")).getTime())/(24*3600*1000))
							this.newslist.forEach((val) => {
								// console.log(val.publishTime)
								let valDate = new Date(val.publishTime.replace(/\-/g, "/")).getTime()
								// console.log('valDate',valDate)
								let nowDate = new Date().getTime()
								// console.log('nowDate',nowDate)
								let days = Math.floor((nowDate-valDate)/(24*3600*1000))
								// console.log('days',days)
								val.publishTime = days
							})
						}
					})
				}
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
