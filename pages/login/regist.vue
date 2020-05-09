<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">用户注册</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">用户注册</block></cu-custom>
		
		<form @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">手机号：</view>
				<input placeholder="请输入手机号" @input="InputChange" name="mobile"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码：</view>
				<input placeholder="请输入密码" name="password"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码：</view>
				<input placeholder="请输入验证码" name="verify_code"></input>
				<button :disabled="verifyAbled" class='cu-btn bg-green shadow' @click="getVerifyCode">{{verifyStr}}</button>
			</view>
			<!-- <button form-type="submit">Submit</button> -->
			<view class="bg-white padding-lg solid-top">
				<view class="btn-row"><button form-type="submit" class="cu-btn block bg-darkblue margin-tb-sm lg" >注册</button></view>
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
					修改成功
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import configService from '@/services/config.service.js'
import md5 from '@/common/md5.js'
import {mobileFormatCheck} from '@/common/inspect.js';

export default {
	components: {
	},
	data() {
		return {
			flag: configService.format_type,
			mobilePhone: '',
			countdown: 60,
			verifyStr: '获取验证码',
			verifyAbled: false,
			successModal: false
		};
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
					type: 0
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
		// 表单提交
		formSubmit(e) {
			let formdata = e.detail.value
			console.log(formdata)
			
			if (formdata.mobile == '') {
			    this.warnModel('请输入手机号')
			} else if (formdata.password == '') {
			    this.warnModel('请输入新密码')
			} else if (formdata.verify_code == '') {
			    this.warnModel('请输入验证码')
			} else {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				uni.request({
					url: configService.apiUrl + '/register',
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
		warnModel(msg) {
			uni.showModal({
				content: msg,
				showCancel: false
			});
		},
		InputChange(e) {
			this.mobilePhone = e.detail.value
		},
		hideModal() {
			uni.navigateBack({
				delta: 1
			})
		}
		
	},
};

</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
