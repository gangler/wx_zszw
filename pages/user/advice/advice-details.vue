<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">咨询详情</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">咨询详情</block></cu-custom>
		
		<view class="cu-form-group margin-top">
			<view class="title">咨询时间</view>
			<input placeholder="" disabled :value="adviceDetail ? adviceDetail.ADVICETIME.replace('T', ' ') : ''"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">咨询内容</view>
			<textarea maxlength="-1" disabled placeholder="" :value="adviceDetail ? adviceDetail.CONTENT : ''"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">回复时间</view>
			<input placeholder="" disabled :value="adviceDetail ? adviceDetail.ANSWERTIME.replace('T', ' ') : ''"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">回复内容</view>
			<textarea maxlength="-1" disabled placeholder="" :value="adviceDetail ? adviceDetail.ANSWERS : ''"></textarea>
		</view>
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
			this.getAdviceDetail()
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
					url: configService.apiUrl + '/gxfrTL/GetConsultAnswerByID',
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
