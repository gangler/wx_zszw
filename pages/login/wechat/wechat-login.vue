<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">微信登录绑定</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">微信登录绑定</block></cu-custom>
		
		<view class="content margin-lg">
			<text class="text-lg">首次使用第三方账号登录，请绑定平台已注册手机号或新用户手机号码</text>
		</view>
		
		<form @submit="formSubmit">
			<view class="cu-form-group round margin-left-xl margin-right-xl solids line-gray">
				<image src="@/static/img/mobile.png" class="cu-avatar bg-white" mode="aspectFit"></image>
				<view class="title">
				</view>
				<input placeholder="请输入手机号" @input="InputChange" name="mobile"></input>
				<text class="text-df text-green">{{mobileCheckStr}}</text>
			</view>
			<view class="cu-form-group round margin-top margin-left-xl margin-right-xl solids line-gray" style="padding-right: 2px;">
				<image src="@/static/img/security.png" class="cu-avatar bg-white" mode="aspectFit"></image>
				<view class="title"></view>
				<input placeholder="请输入验证码" name="verify_code"></input>
				<button style="height: 43px;" :disabled="verifyAbled" class='cu-btn round bg-green' @click="getVerifyCode">{{verifyStr}}</button>
			</view>
			<view class="cu-form-group round margin-top margin-left-xl margin-right-xl solids line-gray" :style="isRegist?'':'display: none;'">
				<image src="@/static/img/password.png" class="cu-avatar bg-white" mode="aspectFit"></image>
				<view class="title"></view>
				<input placeholder="请输入密码" name="password"></input>
			</view>
			
			<view class="padding-xs margin-top-sm">
				<view class="flex justify-center">
					<text class="text-blue text-df padding-sm">绑定成功后，下次可直接微信登录</text>
				</view>
			</view>
			
			<view class="padding-xs margin-top-sm">
				<view class="flex justify-center">
					<button form-type="submit" class="cu-btn lg round bg-darkblue" style="width: 220px;" >登录</button>
				</view>
			</view>
			
		</form>
		
		
		<view class="cu-modal" :class="successModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl text-lg">
					绑定成功，请再次登录
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	import md5 from '@/common/md5.js'
	import {mobileFormatCheck} from '@/common/inspect.js';
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if (option && option.openid) {
				this.openid = option.openid;
			}
			if (option && option.nickName) {
				this.nickName = option.nickName;
			}
			if (option && option.avatarUrl) {
				this.avatarUrl = option.avatarUrl;
			}
			if (option && option.gender) {
				this.gender = option.gender;
			}
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				mobilePhone: '',
				countdown: 60,
				verifyStr: '获取验证码',
				verifyAbled: false,
				isRegist: false,
				openid: '',
				nickName: '',
				avatarUrl: '',
				gender: 0,
				mobileCheckStr: '',
				successModal: false,
				
			}
		},
		onShow() {
			
		},
		created() {
		},
		methods: {
			getVerifyCode() {
				console.log(this.mobilePhone)
				if(!mobileFormatCheck(this.mobilePhone)){
					this.warnModel('请填写正确的手机号')
					return
				}
				this.verifyAbled = true
				this.settime()
				
				uni.request({
					url: configService.apiUrl + '/sendVerifyCode',
					method: 'POST',
					data: {
						mobile: this.mobilePhone,
						type: 2
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.data) {
							// 成功
							console.log(res.data.message)
							// uni.navigateBack()
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			// 表单提交
			formSubmit(e) {
				let formdata = e.detail.value
				console.log(formdata)
				
				if (formdata.mobile == '') {
				    this.warnModel('请输入手机号')
				} else if (formdata.verify_code == '') {
				    this.warnModel('请输入验证码')
				} else if (this.isRegist && formdata.password == '') {
				    this.warnModel('请输入密码')
				} else {
					let encryPwd = md5(configService.encry_string + formdata.password)
					formdata.password = encryPwd
					formdata.openid = this.openid
					formdata.pName = this.nickName
					formdata.avater = this.avatarUrl
					formdata.sex = this.gender
					
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(formdata))
					uni.request({
						url: configService.apiUrl + '/wechatMiniPrograRegister',
						method: 'POST',
						data: formdata,
						success: (res) => {
							console.log(res.data)
							if(res.data.code == "0") {
								// 成功
								// console.log(res.data.data)
								this.successModal = true
							}else {
								this.warnModel(res.data.message)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
			},
			//发送验证码倒计时
			settime() {
				console.log(this.countdown)
				if (this.countdown == 0) {
					this.countdown = 60;
					this.verifyStr = '重新发送'
					this.verifyAbled = false
					return;
				} else {
					this.verifyStr = "重新发送(" + this.countdown + ")";
					this.countdown--;
				}
				const that = this
				setTimeout(function() {
					that.settime()
				}, 1000);
			},
			warnModel(msg) {
				uni.showModal({
					content: msg,
					showCancel: false
				});
			},
			// 输入手机号码时，判断该号码是否有账户
			InputChange(e) {
				this.mobilePhone = e.detail.value
				this.mobileCheckStr = ''
				if(mobileFormatCheck(this.mobilePhone)){
					uni.request({
						url: configService.apiUrl + '/CheckMobileExist',
						method: 'POST',
						data: {
							mobile: this.mobilePhone,
						},
						success: (res) => {
							console.log(res.data)
							if(res.data.Result) {
								// 成功
								this.isRegist = false
								this.mobileCheckStr = '已注册'
								console.log(res.data.Message)
							}else{
								// 用户不存在
								console.log(res.data.Message)
								this.isRegist = true
								this.mobileCheckStr = '新用户'
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}else{
					this.isRegist = false
				}
			},
			hideModal() {
				uni.navigateBack({
					delta: 1
				})
			}
			
		},
	}
</script>
<style>
</style>
