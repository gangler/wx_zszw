<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">我的咨询</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">我的咨询</block></cu-custom>
		
		<view>
			<scroll-view :style="'height:'+scrollHeight+'px;'" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
				<view class="cu-list menu">
					<view class="cu-item arrow" v-for="(item, index) in adviceList" :index="index" :key="index" @click="getAdviceDetail(item.ID, item.STATE)" >
						<view class="content padding-tb-sm">
							<view class="margin-xs">
								<text class="text-blue text-bold text-xl margin-right-xs">{{item.CONTENT}}</text>
							</view>
							<view class="text-gray text-sm margin-xs flex">
								<text class="flex-sub margin-right-xs">编号：{{index+1}}</text>
								<text class="flex-twice margin-right-xs">咨询状态：{{item.STATE == 1 ? '已处理' : '处理中'}}</text>
							</view>
							<view class="margin-xs">
								<text class="text-gray text-sm margin-right-xs">{{item.TIME.replace('T', ' ')}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-darkblue lg" @click="addNewAdvice">新建</button>
		</view>
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
	export default {
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 17,
				infoDetail: {},
				placeholder: '',
				adviceList: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollHeight: 550,
			}
		},
		onShow() {
			this.getAdviceList()
		},
		created() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.scrollHeight = winHeight - 120
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
			        // console.log(userinfo);
					this.userId = userinfo.userId
					// this.getAdviceList()
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		methods: {
			getAdviceList() {
				uni.request({
					url: configService.apiUrl + '/GetMyConsult',
					method: 'POST',
					data: {
						USERID: this.userId,
						State: -1
					},
					success: (res) => {
						// console.log(JSON.parse(res.data))
						let resp = JSON.parse(res.data)
						if(resp.Result) {
							this.adviceList = resp.Data
							// console.log(this.adviceList)
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			getAdviceDetail(id, state) {
				if(state == 1) {
					uni.navigateTo({
						///GetConsultAnswerByID?USERID=17&ConsultId=21
						url: '../user/advice/advice-details?USERID=' + this.userId + '&ConsultId=' + id
					});
				}else {
					uni.showModal({
						content: '处理中',
						showCancel: false
					});
				}
			},
			addNewAdvice() {
				uni.navigateTo({
					///GetConsultAnswerByID?USERID=17&ConsultId=21
					url: '../user/advice/advice-add'
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
		},
	}
</script>
<style>
</style>
