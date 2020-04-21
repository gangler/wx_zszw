<template>
	<view class="content" v-if="flag === 1">
		<!-- <cu-custom class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">登录</block></cu-custom> -->
		<image src="../../static/img/bg.jpg" mode=""></image>
		<view class="login-content">
			<view v-if="loginType">
				<view class="input-view padding-sm solids radius">
					 <input class="uni-input text-white" placeholder="用户名" v-model="account" />
				</view>
				<view class="input-view padding-sm solids radius">
					 <input class="uni-input text-white" type="password" placeholder="密码" v-model="password" />
				</view>
			</view>
			<view v-if="!loginType">
				<view class="input-view padding-sm solids radius" > <input class="uni-input" placeholder="请输入手机号" /></view>
				<view>
					<m-input class="m-input yan" type="number" clearable v-model="password" placeholder="请输入验证码"></m-input>
					<text class="yan-btn">获取验证码</text>
				</view>
			</view>
			<view class="btn-row"><button class="cu-btn block bg-blue margin-tb-sm lg" style="background-color: #215D80;" @tap="bindLogin">登录</button></view>
			<!-- <view class="login-type" @tap="changeLoginType">{{ loginType ? '手机密码登录' : '用户密码登录' }} ></view> -->
		</view>
	</view>
	
	
	<view class="content2" v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">登录</block></cu-custom>
		<!-- <image src="../../static/img/bg.jpg" mode=""></image> -->
		<view class="login-content">
			<view v-if="loginType">
				<view class="input-view padding-sm ">
					 <input class="uni-input text-black text-bold" placeholder="用户名:" v-model="account" />
				</view>
				<view class="input-view padding-sm ">
					 <input class="uni-input text-black text-bold" type="password" placeholder="密码:" v-model="password" />
				</view>
			</view>
			<view v-if="!loginType">
				<view class="input-view padding-sm solids radius" > 
					<input class="uni-input" placeholder="请输入手机号" />
				</view>
				<view>
					<m-input class="m-input yan" type="number" clearable v-model="password" placeholder="请输入验证码"></m-input>
					<text class="yan-btn">获取验证码</text>
				</view>
			</view>
			<view class="padding-xs flex">
				<view class="flex-sub justify-start">
					<switch class='green' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					<text class="text-black text-df padding-sm"> 自动登录</text>
				</view>
				<view class="flex-sub">
					<view class="flex justify-end padding-xs">
						<text class="text-black text-df">忘记密码</text>
					</view>
				</view>
			</view>
			<view class="btn-row"><button class="cu-btn block bg-blue margin-tb-sm lg" style="background-color: #215D80;" @tap="bindLogin">登录</button></view>
			<!-- <view class="login-type" @tap="changeLoginType">{{ loginType ? '手机密码登录' : '用户密码登录' }} ></view> -->
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
			<view class="gray-text">登录中...</view>
		</view>
		<view class="cu-load bg-red erro" v-if="isError" @click="closeErrModel">{{errStr}}</view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
import loginService from '@/api/login.js';
import configService from '@/services/config.service.js'
import md5 from '@/common/md5.js'

export default {
	components: {
		mInput
	},
	data() {
		return {
			flag: configService.format_type,
			switchA: true,
			account: '',
			password: '',
			positionTop: 0,
			loginType: true,
			loadModal: false,
			isError: false,
			errStr: ''
		};
	},

	methods: {
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			if(!this.account || !this.password){
				this.isError = true
				this.errStr = '用户名密码不能为空'
				return
			}
			this.loadModal = true
			// console.log(this.account)
			// console.log(this.password)
			let encryPwd = md5(configService.encry_string + this.password)
			// console.log(encryPwd)
			let obj = {username: this.account, password: encryPwd}
			uni.request({
				url: configService.apiUrl + '/gxfrTL/login',
				data: obj,
				success: (res) => {
					console.log(res.data)
					let userinfo = res.data.data
					if(userinfo){
						console.log('登录成功')
						this.isError = false
						this.loadModal = false
						// 保存用户信息
						uni.setStorage({
						    key: 'user_info',
						    data: userinfo,
						    success: function () {
						        console.log('success');
						    }
						});
						// 跳转到首页
						uni.navigateTo({
							url: '../index/index'
						})
					}else{
						this.loadModal = false
						this.isError = true
						this.errStr = res.data.message
					}
				},
				fail: (res) => {
					this.isError = true
					this.errStr = res
				}
			})
			// if (this.account.length < 5) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '账号最短为 5 个字符'
			// 	});
			// 	return;
			// }
			// if (this.password.length < 6) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '密码最短为 6 个字符'
			// 	});
			// 	return;
			// }
			
			
			// uni.navigateTo({
			// 	url: '../index/index'
			// })
		},
		changeLoginType() {
			this.loginType = !this.loginType;
		},
		SwitchA(e) {
			this.switchA = e.detail.value
		},
		closeErrModel() {
			this.isError = false;
		}
	},
	onReady() {
		this.initPosition();
	}
};
</script>

<style lang="scss" scoped>
.content {
	position: relative;
	height: 100%;
	width: 100%;
	image {
		width: 100%;
		height: 100%;
	}
	.login-content {
		position: absolute;
		top: 45%;
		left: 50%;
		width: 80%;
		transform: translate(-50%, -20%);
		.input-view {
			margin-bottom: 10px;
		}
		.yan-btn {
			width: 30%;
			display: inline-block;
			text-align: center;
			padding: 10px 5px;
			border: 1px solid #0faeff;
			border-radius: 5px;
			margin-left: 10px;
		}
		.m-input {
			padding: 7px 3px;
			border: 1px solid #eee;
			border-radius: 6rpx;
		
			&.yan {
				width: 56%;
				display: inline-block;
			}
		}
	}

	.login-type {
		text-align: center;
	}
}


.content2 {
	position: relative;
	height: 100%;
	width: 100%;
	// image {
	// 	width: 100%;
	// 	height: 100%;
	// }
	.login-content {
		position: absolute;
		top: 40%;
		left: 50%;
		width: 80%;
		transform: translate(-50%, -20%);
		.input-view {
			margin-bottom: 10px;
			border-bottom: 1px solid #000000;
		}
		.yan-btn {
			width: 30%;
			display: inline-block;
			text-align: center;
			padding: 10px 5px;
			border: 1px solid #0faeff;
			border-radius: 5px;
			margin-left: 10px;
		}
		.m-input {
			padding: 7px 3px;
			border: 1px solid #000000;
			border-radius: 6rpx;
		
			&.yan {
				width: 56%;
				display: inline-block;
			}
		}
		.btn-row {
			// margin-top: 50px;
		}
	}

	.login-type {
		text-align: center;
	}
}

.cu-load.erro::after {
    content: "";
}
</style>
