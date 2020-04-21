<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">问题描述</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">问题描述</block></cu-custom>
		
		<view class="cu-bar bg-white solid-top">
			<view class="action">
				<text class="text-black text-bold text-xl">咨询须知</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="text-black text-lg">
				一、受理范围：本栏目接受个人、法人对全省各政府部门行政审批工作、综合服务、公共资源交易等办事过程中有关法规、政策、程序等问题的咨询。
				二、处理时间：一般信件要求在3个工作日内办结；情况复杂的，可以适当延长办理期限，但延长期限不得超过2个工作日。本栏目答复是一种指导性意见 ，不具有法定效力。具体问题要通过法定途径（诉讼、复议、信访等）解决。
				三、请勿重复提交咨询咨询，如果您重复提交，我们将只受理您若干问题中的一个。
				四、不属于本栏目受理范围的问题视为无效问题，本栏目管理人员有权对此删改并不再告知。
				</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="text-black text-bold text-xl">信息填写</text>
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="bg-white padding-bottom-lg">
				<view class="cu-form-group solids margin-left-sm margin-right-sm">
					<textarea maxlength="-1" placeholder="请填写问题描述" name="CONTENT"></textarea>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button form-type="submit" class="cu-btn bg-darkblue lg">提交</button>
			</view>
		</form>
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	import {dateFormat} from '@/common/dateFormat.js';
	
	export default {
		// onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		// 	console.log(option); //打印出上个页面传递的参数。
		// 	if(option && option.USERID != undefined){
		// 		this.userId = option.USERID
		// 	}
		// 	if(option && option.ConsultId != undefined){
		// 		this.consultId = option.ConsultId
		// 	}
		// },
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 0,
				userName: '',
				mobile: '',
				consultId: 0,
				adviceDetail: null,
			}
		},
		onShow() {
			// this.getAdviceDetail()
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
			        // console.log(userinfo);
					this.userId = userinfo.userId
					this.userName = userinfo.p_name
					this.mobile = userinfo.mobile
					// this.getAdviceList()
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		methods: {
			// 表单提交
			formSubmit(e) {
				let formdata = e.detail.value
				
				if(!formdata.CONTENT) {
					uni.showModal({
						content: '信息不能为空',
						showCancel: false
					});
					return
				}
				
				formdata.USERID = this.userId
				formdata.USERNAME = this.userName
				formdata.MOBILE = this.mobile
				formdata.TIME = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
				console.log(formdata)
				//yyyy-MM-dd hh:mm:ss
				console.log(formdata.TIME)
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				
				uni.request({
					url: configService.apiUrl + '/gxfrTL/AddConsult',
					method: 'POST',
					data: formdata,
					success: (res) => {
						console.log(res.data)
						if(res.data.Result) {
							// 成功
							uni.navigateBack()
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
				
			},
		},
	}
</script>
<style>
</style>
