<template>
	<view v-if="flag === 1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText">返回</block><block slot="content">网上办事</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="h3">办事部门</text> 
			</view>
		</view>
		<view class="cu-list grid col-4" >
			<view class="cu-item" v-for="(item, index) in worklist" :index="index" :key="index">
				<view @click="workchange(item.ID)">
					<image :src="item.SAVPATH" class="image dept-img" mode="aspectFill" />
					<text class="text">{{ item.CNAME }}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="h3">事项层级列表</text> 
			</view>
		</view>
		<view class="cu-list grid col-4" >
			<view class="cu-item" v-for="(item, index) in levellist" :index="index" :key="index">
				<view @click="levelchange(item.AffairLevelTypeName, item.AffairLevelTypeCode)">
					<text class="text">{{ item.AffairLevelTypeName }}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="h3">热门办理事项</text> 
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in hotlist" :index="index" :key="index">
				<view class="content" @click="hotchange(item)">
					<text class="text-grey">{{item.AffairName}}</text>
				</view>
			</view>
		</view>
		
	</view>
	
	
	<view v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="false"><block slot="backText">返回</block><block slot="content">办事</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-hotfill text-grey"></text>
				<text class="text-lg">事项列表</text> 
			</view>
			<view class="action">
				<button class="cu-btn bg-white text-blue text-lg" @click="toSearch()" ><text class="cuIcon-search"></text> 搜索</button>
			</view>
		</view>
		<view class="cu-list grid col-3 no-border" >
			<view class="cu-item" v-for="(item, index) in worklist" :index="index" :key="index">
				<view @click="workchange(item.ID)">
					<image :src="item.SAVPATH" class="image dept-img" mode="aspectFill" />
					<text class="text">{{ item.CNAME }}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-hotfill text-grey"></text>
				<text class="text-lg">事项层级列表</text> 
			</view>
		</view>
		<view class="cu-list grid col-4" >
			<view class="cu-item" v-for="(item, index) in levellist" :index="index" :key="index">
				<view @click="levelchange(item.AffairLevelTypeName, item.AffairLevelTypeCode)">
					<text class="text">{{ item.AffairLevelTypeName }}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-hotfill text-grey"></text>
				<text class="text-lg">直接网上办理事项</text> 
			</view>
		</view>
		<scroll-view style="height:600rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		@scroll="scroll">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, index) in hotlist" :index="index" :key="index">
					<view class="content" @click="hotchange(item)">
						<text class="text-grey">{{item.AffairName}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
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
				worklist: [],
				levellist: [],
				hotlist: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			}
		},
		created() {
			this.getWorkList()
			this.getLevelList()
			this.getHotList()
		},
		methods: {
			// 办事部门
			getWorkList() {
				uni.request({
					url: configService.apiUrl + '/get_base_dic',
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data.D001
						this.worklist = wlist
						// console.log(this.worklist)
					}
				})
			},
			workchange(index){
				// console.log(index)
				uni.navigateTo({
				    url: '../work/department-list?id=' + index
				});
			},
			//事项层级列表
			getLevelList() {
				uni.request({
					url: configService.apiUrl + '/get_affair_level_type',
					data: {
						userType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.levellist = wlist
						// console.log(this.levellist)
					}
				})
			},
			levelchange(name, level){
				console.log('name', name)
				console.log('level', level)
				uni.navigateTo({
				    url: '../work/department-list?name=' + name + '&level=' + level
				});
			},
			//热门办理事项
			getHotList() {
				uni.request({
					url: configService.apiUrl + '/get_hot_affairs',
					data: {
						userType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.hotlist = wlist
						console.log(this.hotlist)
					}
				})
			},
			hotchange(item) {
				console.log(item)
				uni.navigateTo({
				    url: '../shared/pdf?Affairid=' + item.Affairid 
						+ '&AffairCode=' + item.AffairCode 
						+ '&AffairName=' + item.AffairName 
						+ '&IsNetAccepet=3'
						
				});
			},
			toSearch() {
				uni.navigateTo({
				    url: '../work/work-search'
				});
			},
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
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
