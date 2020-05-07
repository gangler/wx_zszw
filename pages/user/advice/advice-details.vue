<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">咨询详情</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">咨询详情</block></cu-custom>
		
<!-- 		<view class="cu-bar bg-white solid-bottom">
			<view class="flex align-start">
				<view class="flex-sub margin-sm">咨询内容</view>
				<view class="flex-twice margin-sm"><text>{{adviceDetail ? adviceDetail.CONTENT : ''}}</text></view>
			</view>
		</view> -->
		<view class="cu-form-group margin-top">
			<view class="title">咨询时间</view>
			<input disabled :value="adviceDetail ? adviceDetail.ADVICETIME.replace('T', ' ') : ''"></input>
		</view>
		<view class="cu-form-group flex align-start">
			<view class="title">咨询内容</view>
			<!-- <view class="text-content">{{adviceDetail ? adviceDetail.CONTENT : ''}}</view> -->
			<textarea maxlength="-1" :focus="false" :value="adviceDetail ? adviceDetail.CONTENT : ''"></textarea>
		</view>
	<!-- 	<view class="cu-form-group align-start">
			<view class="title">咨询内容</view>
			<textarea maxlength="-1" disabled :value="adviceDetail ? adviceDetail.CONTENT : ''"></textarea>
		</view> -->
		<view class="cu-form-group solid-top">
			<view class="title">回复时间</view>
			<input disabled :value="adviceDetail ? adviceDetail.ANSWERTIME.replace('T', ' ') : ''"></input>
		</view>
		<view class="cu-form-group flex align-start">
			<view class="title">回复内容</view>
			<textarea maxlength="-1" :focus="false" :value="adviceDetail ? adviceDetail.ANSWERS : ''"></textarea>
		</view>
		<!-- <view class="cu-form-group align-start">
			<view class="title">回复内容</view>
			<textarea maxlength="-1" disabled :value="adviceDetail ? adviceDetail.ANSWERS : ''"></textarea>
		</view> -->
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option && option.USERID != undefined){
				this.userId = option.USERID
			}
			if(option && option.ConsultId != undefined){
				this.consultId = option.ConsultId
			}
			this.getAdviceDetail()
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 0,
				consultId: 0,
				adviceDetail: null,
			}
		},
		onShow() {
			
		},
		created() {
			// try {
			//     const userinfo = uni.getStorageSync('user_info');
			//     if (userinfo) {
			//         // console.log(userinfo);
			// 		this.userId = userinfo.userId
			// 		// this.getAdviceList()
			//     }
			// } catch (e) {
			//     // error
			// 	console.log(e)
			// }
		},
		methods: {
			getAdviceDetail() {
				// /GetConsultAnswerByID?USERID=17&ConsultId=21
				uni.request({
					url: configService.apiUrl + '/GetConsultAnswerByID',
					method: 'POST',
					data: {
						USERID: this.userId,
						ConsultId: this.consultId
					},
					success: (res) => {
						console.log(JSON.parse(res.data))
						let resp = JSON.parse(res.data)
						if(resp.Result) {
							this.adviceDetail = resp.Data[0]
							console.log(this.adviceDetail)
						}else {
							uni.showModal({
								content: resp.Msg,
								showCancel: false
							});
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
		},
	}
</script>
<style>
</style>
