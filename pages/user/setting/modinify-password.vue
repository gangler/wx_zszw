<template>
	<view class="content" v-if="flag === 1">
		<cu-custom class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">修改密码</block></cu-custom>
		<!-- <image src="@/static/img/bg.jpg" mode=""></image> -->
		<view class="login-content">
			<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">原密码：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-white" type="password" placeholder="请输入原密码" v-model="password" />
				</view>
			</view>
			<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">新密码：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-white" type="password" placeholder="请输入新密码" v-model="newpassword" />
				</view>
			</view>
	<!-- 		<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">手机号：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-white" type="password" placeholder="请输入手机号" v-model="password" />
				</view>
			</view> -->
			<view class="btn-row"><button class="cu-btn block bg-blue margin-tb-sm lg" style="background-color: #215D80;" @tap="bindChange">确认修改</button></view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">提交中...</view>
		</view>
		<view class="cu-load bg-red erro" v-if="isError" @click="closeErrModel">{{errStr}}</view>
	</view>
	
	
</template>

<script>
import configService from '@/services/config.service.js'
import md5 from '@/common/md5.js'

export default {
	components: {
	},
	data() {
		return {
			flag: configService.format_type,
			positionTop: 0,
			isLogin: false,
			password: '',
			newpassword: '',
			loadModal: false,
			isError: false,
			errStr: '',
			log_verify_code: ''
		};
	},
	onReady() {
		this.initPosition();
	},
	// created() {
	// 	try {
	// 	    const userinfo = uni.getStorageSync('user_info');
	// 	    if (userinfo) {
	// 			this.isLogin = true
	// 	        console.log(userinfo);
	// 			this.log_verify_code = userinfo.log_verify_code
				
	// 	    }
	// 	} catch (e) {
	// 	    // error
	// 		console.log(e)
	// 	}
	// },
	methods: {
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		// bindChange() {
		// 	if(!this.password || !this.newpassword){
		// 		this.isError = true
		// 		this.errStr = '密码不能为空'
		// 		return
		// 	}
		// 	this.loadModal = true
		// 	// console.log(this.password)
		// 	// console.log(this.newpassword)
		// 	let encryPwd = md5(configService.encry_string + this.newpassword)
		// 	// console.log(encryPwd)
		// 	let obj = {username: this.password, password: encryPwd}
		// 	uni.request({
		// 		url: configService.apiUrl + '/gxfrTL/login',
		// 		data: obj,
		// 		success: (res) => {
		// 			console.log(res.data)
		// 			let userinfo = res.data.data
		// 			if(userinfo){
		// 				console.log('登录成功')
		// 				this.isError = false
		// 				this.loadModal = false
		// 				// 保存用户信息
		// 				uni.setStorage({
		// 				    key: 'user_info',
		// 				    data: userinfo,
		// 				    success: function () {
		// 				        console.log('success');
		// 				    }
		// 				});
		// 				// 跳转到首页
		// 				uni.navigateTo({
		// 					url: '../index/index'
		// 				})
		// 			}else{
		// 				this.loadModal = false
		// 				this.isError = true
		// 				this.errStr = res.data.message
		// 			}
		// 		},
		// 		fail: (res) => {
		// 			this.isError = true
		// 			this.errStr = res
		// 		}
		// 	})
		// },
		closeErrModel() {
			this.isError = false;
		}
	},
	
	
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
		top: 40%;
		left: 50%;
		width: 80%;
		transform: translate(-50%, -20%);
		.input-view {
			margin-bottom: 10px;
			border: 1px solid #000000;
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

.cu-load.erro::after {
    content: "";
}

</style>
