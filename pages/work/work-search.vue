<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">事项搜索</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">事项搜索</block></cu-custom>
		
		<view class="cu-bar bg-white search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" @input="InputChange" :adjust-position="false" type="text" placeholder="输入关键字, 查找对应事项" confirm-type="search" :value="searchKeyWord"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @click="getAffairListByName">搜索</button>
			</view>
		</view>
		
		<view class="cu-list menu solid-top">
			<view class="cu-item arrow" v-for="(item, index) in affairList" :index="index" :key="index" @click="departOnClick(item)">
				<view class="content ">
					<view class="text-black"><view class="text-cut text-df" style="width: 300px;">{{item.AffairName}}</view></view>
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
				InputBottom: 0,
				searchKeyWord: '',
				affairList: [],
				
			}
		},
		onShow() {
			// this.getAffairListByName()
		},
		created() {
		},
		methods: {
			//根据事项名称搜索
			getAffairListByName() {
				if(!this.searchKeyWord) {
					uni.showModal({
						content: '请输入关键词',
						showCancel: false
					});
					return;
				}
				uni.request({
					url: configService.apiUrl + '/get_affairs_by_name',
					method: 'POST',
					data: {
						KeyWord: this.searchKeyWord
					},
					success: (res) => {
						// console.log(res.data)
						if(res.data.Result) {
							this.affairList = res.data.Data
						}
						console.log(this.affairList)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			departOnClick(item){
				// console.log(item)
				uni.navigateTo({
				    url: '../shared/pdf?Affairid=' + item.Affairid 
						+ '&AffairCode=' + item.AffairCode 
						+ '&AffairName=' + item.AffairName 
						+ '&IsNetAccepet=' + item.IsNetAccepet 
						
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.getAffairListByName()
			},
			InputChange(e) {
				this.searchKeyWord = e.detail.value
			}
			
		}
	}
	
	
</script>

<style>
</style>
