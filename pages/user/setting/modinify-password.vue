<template>
	<view class="content" >
		<cu-custom bgColor="bg-darkblue" :isBack="isBack"><block slot="backText"></block><block slot="content">修改密码</block></cu-custom>
		<!-- <image src="@/static/img/bg.jpg" mode=""></image> -->
		<view class="login-content">
			<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">原密码：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-black" type="password" placeholder="请输入原密码" v-model="password" />
				</view>
			</view>
			<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">新密码：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-black" type="password" placeholder="请输入新密码" v-model="newpassword" />
				</view>
			</view>
	<!-- 		<view class="flex">
				<view class=" flex-sub padding-sm ">
					 <view class="text-xl text-black">手机号：</view>
				</view>
				<view class="input-view flex-twice padding-sm radius">
					 <input class="uni-input text-black" type="password" placeholder="请输入手机号" v-model="password" />
				</view>
			</view> -->
			<view class="btn-row">
				<button class="cu-btn block bg-darkblue margin-tb-sm lg" @tap="bindChange">确认修改</button>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">提交中...</view>
		</view>
		<view class="cu-load bg-red erro" v-if="isError" @click="closeErrModel">{{errStr}}</view>
		<view class="cu-modal" :class="reLoginModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
				</view>
				<view class="padding-xl">
					密码已修改，请重新登录
				</view>
				<view class="cu-bar bg-white">
					<!-- <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view> -->
					<view class="action margin-0 flex-sub  solid-left" @tap="reLogin">确定</view>
				</view>
			</view>
		</view>
		
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
			reLoginModal: false,
			isBack: true,
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
	created() {
		try {
		    const userinfo = uni.getStorageSync('user_info');
		    if (userinfo) {
				this.isLogin = true
		        // console.log(userinfo);
				this.log_verify_code = userinfo.log_verify_code
		    }
		} catch (e) {
		    // error
			console.log(e)
		}
	},
	methods: {
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindChange() {
			if(!this.password || !this.newpassword){
				this.isError = true
				this.errStr = '密码不能为空'
				return
			}
			if(!this.pwdVerified(this.newpassword)){
				this.isError = true
				this.errStr = '新密码至少6位数,且至少包含一个字母和数字'
				return
			}
			this.loadModal = true
			this.isError = false
			let encryPwd = md5(configService.encry_string + this.password)
			let encryNewPwd = md5(configService.encry_string + this.newpassword)
			// console.log(encryPwd)
			// console.log(encryNewPwd)
			uni.request({
				url: configService.apiUrl + '/changePassword',
				data: {
				    password: encryPwd,
				    newPassword: encryNewPwd,
				    log_verify_code: this.log_verify_code,
				    UserType: 2,
				},
				success: (res) => {
					console.log(res)
					if(res.data != "") {
						if(res.data.code == "0") {
							// 修改成功
							this.isBack = false
							this.reLoginModal = true
						}else {
							// 修改失败
							this.isError = true
							this.errStr = res.data.message
						}
					}else{
						// log_verify_code失效
						console.log(res)
					}
					this.loadModal = false
				},
				fail: (res) => {
					this.isError = true
					this.errStr = res
				}
			})
		},
		// 密码强度验证
		pwdVerified(str) {
			let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
			return reg.test(str);
		},
		closeErrModel() {
			this.isError = false;
		},
		// 重新登录
		reLogin() {
			// 清除用户信息
			try {
			    uni.removeStorageSync('user_info');
			} catch (e) {
			    // error
				console.log(e)
			}
			// 跳转用户页
			uni.reLaunch({
			    url: '/pages/user/index'
			});
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
