<template>
	<view v-if="flag === 1">
	</view>
	
	<view v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="false"><block slot="backText">返回</block><block slot="content">请您监督</block></cu-custom>
		<view class="cu-bar bg-white">
			<view class="">
				<image src="/static/xiaxingtianxia.png" class="image" mode="aspectFill" style="width: 750rpx;height: 300rpx;" />
			</view>
		</view>
		<view class="cu-bar bg-white" style="background: linear-gradient(#ffffff, #b8f8ff);">
			<view class="action">
			</view>
			<view class="action">
				<!-- <text class="cuIcon-hotfill text-orange"></text> -->
				<text class="text-lg text-bold">三务公开</text>
				<!-- <text class="cuIcon-hotfill text-orange"></text> -->
			</view>
			<view class="action">
				<text class="cuIcon-unfold text-grey"></text>
			</view>
		</view>
		<view class="solid-bottom" v-for="(item, index) in publicList" :index="index" :key="index">
			<view class="cu-bar bg-white">
				<view class="action">
					<image :src="xxkImgUrl + item.imageUrl" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;" class="png" mode="aspectFit"></image>
					<text class="text-lg">{{item.category}}</text> 
				</view>
				<view class="action" style="margin-right: 10rpx;">
					<button class="cu-btn bg-white text-grey text-lg" @click="toPublicsList(item.categoryId, item.category)" >更多 <text class="cuIcon-right text-grey"></text></button>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item" style="" v-for="(item2, index2) in item.publicList" :index="index2" :key="index2" @click="getPublicDetail(item2.informationId)" >
					<view class="content solids margin-bottom-sm">
						<view class="margin-xs">
							<text class="text-black margin-right-xs">{{item2.title}}</text>
						</view>
						<view class="bg-gray padding-xs flex ">
							<view class="action basis-xl">
								<text class="cuIcon-time text-grey margin-right-xs"></text>
								<text class="text-gray text-sm margin-right-xs">{{item2.modifyAt}}</text>
							</view>
							<view class="action basis-df text-right">
								<text class="cuIcon-attention text-grey margin-right-xs"></text>
								<text class="text-gray text-sm margin-right-xs">{{item2.viewNum}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white">
			<view class="">
			</view>
		</view>
		
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
				publicList: [],
				xxkImgUrl: configService.xxkImgUrl
			}
		},
		created() {
			this.getPublicList()
		},
		methods: {
			// 三务公开列表
			getPublicList() {
				uni.request({
					url: configService.apiUrl + '/get_public_list',
					success: (res) => {
						console.log(res.data)
						if(res.data.data){
							this.publicList = res.data.data
						}
						// console.log(this.worklist)
					}
				})
			},
			toPublicsList(index, name) {
				// console.log(index)
				uni.navigateTo({
				    url: '../public/public-list?id=' + index + '&name=' + name
				});
			},
			getPublicDetail(index) {
				uni.navigateTo({
				    url: '../public/public-detail?id=' + index
				});
			}
		}
	}
	
	
</script>

<style>
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		border-bottom: 1px solid #ffffff;
	}
</style>
