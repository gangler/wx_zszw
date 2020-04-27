<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">我的服务</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">我的服务</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in serviceList" :index="index" :key="index" @click="getServiceDetail(item.AffairName, item.CurrAffairCode, item.TransTime.replace('T', ' '))" >
				<view class="content padding-tb-sm">
					<view class="margin-xs">
						<text class="text-blue text-bold text-xl margin-right-xs">{{item.AffairName}}</text>
					</view>
					<view class="text-gray text-sm margin-xs flex">
						<text class="flex-sub margin-right-xs">流水单号：{{item.CurrAffairCode}}</text>
					</view>
					<view class="margin-xs">
						<text class="text-gray text-sm margin-right-xs">{{item.TransTime.replace('T', ' ')}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 17,
				informationId: 3,
				infoDetail: {},
				placeholder: '',
				serviceList: [],
				
			}
		},
		onShow() {
			this.getServiceList()
		},
		created() {
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
			getServiceList() {
				uni.request({
					url: configService.apiUrl + '/getWorkExperienceByUserId',
					method: 'POST',
					data: {
						UserId: this.userId,
						UserType: 2
					},
					success: (res) => {
						// console.log(res.data)
						if(res.data.Result) {
							this.serviceList = res.data.Data
							console.log(this.serviceList)
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			getServiceDetail(name, code, time) {
				uni.navigateTo({
					///GetConsultAnswerByID?USERID=17&ConsultId=21
					url: '../user/service/service-detail?affairName=' + name + '&affairCode=' + code + '&transTime=' + time
				});
			},
			
		},
	}
</script>
<style>
</style>
