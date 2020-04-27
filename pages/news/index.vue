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
		<cu-custom bgColor="bg-darkblue" :isBack="false"><block slot="backText">返回</block><block slot="content">资讯</block></cu-custom>
		
		<view v-for="(item, index) in categorylist" :index="index" :key="index">
			<view class="cu-bar bg-gray solid-bottom" >
				<view class="action">
					<text class="cuIcon-wefill text-grey"></text>
					<text class="text-lg">{{item.category}}</text>
				</view>
				<view class="action">
					<button class="cu-btn bg-gray text-grey" @click="toNewsList(item.category_id)" >更多</button>
				</view>
			</view>
			
			<view class="cu-list grid col-2 no-border" v-if="index == 0" >
				<view class="cu-item" v-for="(item2, index2) in newslist" :index="index2" :key="index2" @click="newsClick(item2.informationId)" v-if="index2 < 4">
					<view>
						<image :src="item2.picture" class="png" mode="aspectFit" style="width: 100%; height: 80px;"></image>
						<text class="text text-cut">{{ item2.title }}</text>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu" v-if="index == 1">
				<view class="cu-item" v-for="(item3, index3) in newslist2" :index="index3" :key="index3" @click="newsClick(item3.informationId)" v-if="index3 < 2">
					<view class="content">
						<view class="flex">
							<view class="flex-sub padding-sm">
								<image :src="item3.picture" class="png" mode="aspectFit" style="width: 100%; height: 80px;"></image>
							</view>
							<view class="flex-twice padding-sm ">{{item3.title}}</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
<!-- 		<view class="cu-list grid col-2 no-border" >
			<view class="cu-item" v-for="(item, index) in newslist" :index="index" :key="index" @click="newsClick(item.informationId)" v-if="index < 4">
				<view>
					<image :src="item.picture" class="png" mode="aspectFit" style="width: 100%; height: 80px;"></image>
					<text class="text text-cut">{{ item.title }}</text>
				</view>
			</view>
		</view> -->
		
		<!-- <scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item, index) in categorylist" :index="index" :key="index" @tap="tabSelect" @click="getNewsList(item.category_id)" :data-id="index" :data-catid="item.category_id">
					<text>{{item.category}}</text>
				</view>
			</view>
		</scroll-view> -->
		
	</view>
</template>


<script>
	import configService from "@/services/config.service.js"
	
	export default {
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				TabCur: 0,
				scrollLeft: 0,
				categorylist: [],
				categoryId: 0,
				newslist: [],
				newslist2: [],
				
			}
		},
		created() {
			this.getCategoryList()
			this.getNewsList()
		},
		methods: {
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
			getNewsList() {
				uni.request({
					url: configService.apiUrl + '/get_information_list?category_id=' + 1,
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.data.data
						this.newslist = wlist
						// console.log(this.newslist)
					}
				})
				uni.request({
					url: configService.apiUrl + '/get_information_list?category_id=' + 2,
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.data.data
						this.newslist2 = wlist
						// console.log(this.newslist2)
					}
				})
			},
			toNewsList(id) {
				uni.navigateTo({
				    url: '../news/news-list?id=' + id
				});
			},
			newsClick(val){
				// console.log(val)
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
