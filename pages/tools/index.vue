<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" v-if="flag === 1"><block slot="backText">返回</block><block slot="content">工具</block></cu-custom>
		<cu-custom bgColor="bg-darkblue" :isBack="false" v-else-if="flag === 2"><block slot="backText">返回</block><block slot="content">工具</block></cu-custom>
		<view class="cu-bar bg-gray solid-bottom">
			<view class="action">
				<!-- <text class="cuIcon-hotfill text-grey"></text> -->
				<text class="text-lg">城市生活</text> 
			</view>
		</view>
		<view class="cu-list grid col-3 no-border" >
			<view class="cu-item" v-for="(item, index) in lifelist" :index="index" :key="index">
				<view @click="lifechange(item.url)">
					<image :src="item.picture" class="image dept-img" mode="aspectFill" />
					<text class="text">{{ item.title }}</text>
				</view>
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
				lifelist: [],
				
			}
		},
		created() {
			this.getLifeList()
		},
		methods: {
			// 城市生活
			getLifeList() {
				uni.request({
					url: configService.apiUrl + '/get_city_life',
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.lifelist = wlist
						console.log(this.lifelist)
					}
				})
			},
			lifechange(url){
				// console.log(index)
				uni.navigateTo({
				    url: '../tools/tools-detail?url=' + url
				});
			},
		}
	}
	
	
</script>

<style>
	.dept-img {
		width: 60px;
		height: 60px;
	}
</style>
