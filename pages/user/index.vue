<template>
	<view v-if="flag === 1">
		<!-- 	<cu-custom bgColor="bg-blue">
			<block slot="content">个人中心</block>
		</cu-custom> -->
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg text-grey bg-white shadow-warp">
				<!-- <view class="cu-avatar xl radius" style="margin: 15px;background-image:url(../../static/img/logo.png);"></view> -->
				<image class="cu-avatar xl round" style="margin: 15px" :src="avatarImg" mode="aspectFit" @click="toLogin"></image>
				<view class="text-xl">
					<text class="text-white">{{userName}}</text>
				</view>
			<!-- 	<view class="flex solid-bottom padding justify-center">
					<image src="/static/img/position.png" style="width: 20px;height: 20px;margin-right: 5px;" class="png" mode="aspectFit"></image>
					<text class="text-white">系统管理员</text>
				</view> -->
				<image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
		<!-- 	<view class="padding-xs flex align-center bg-white shadow-warp">
				<view class="flex-sub text-center">
					<view class="text-xs padding">
						<text class="text-gray">xxxx</text>
					</view>
				</view>
			</view> -->
			<view class="cu-list menu" >
				<view class="cu-item arrow" @click="myService">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/service.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 我的服务</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="myAdvice">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/advice.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 我的咨询</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="mySetting">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/setting.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 账户设置</view>
						</view>
					</button>
				</view>
				<view class="cu-item"  @click="logout" v-if="isLogin">
					<image src="/static/img/out.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm" bindtap="showQrcode">
						<view>
							<text class="text-blue margin-right-xs"></text> 登出</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs"></text> 退出当前登录账号</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<view class="cu-modal" :class="modalVisible ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="confirmLogout">确定</button>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="loginModalVisible?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<text class="text-lg">请点击头像登录</text>
				</view>
			</view>
		</view>
	</view>
	
	
	
	<view v-else-if="flag === 2">
		<!-- 	<cu-custom bgColor="bg-blue">
			<block slot="content">个人中心</block>
		</cu-custom> -->
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg text-grey bg-white shadow-warp" style="background-image: none; background-color: #215D80;">
				<image class="cu-avatar xl round" style="margin: 15px" :src="avatarImg" mode="aspectFit" @click="toLogin"></image>
				<view class="text-xl">
					<text class="text-white">{{userName}}</text>
				</view>
				<!-- <image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image> -->
			</view>
			<view class="cu-list menu" >
				<view class="cu-item arrow" @click="myService">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/service2.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 我的服务</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="myAdvice">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/advice2.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 我的咨询</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="mySetting">
					<button class="cu-btn content" open-type="contact">
						<image src="/static/img/setting2.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 账户设置</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow"  @click="logout" v-if="isLogin">
					<image src="/static/img/out.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm" bindtap="showQrcode">
						<view>
							<text class="text-blue margin-right-xs"></text> 登出</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<view class="cu-modal" :class="modalVisible ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="confirmLogout">确定</button>
	
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="loginModalVisible?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<text class="text-lg">请点击头像登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	
	export default {
		data() {
			return {
				flag: configService.format_type,
				modalVisible: false,
				loginModalVisible: false,
				userName: '点击头像登录',
				avatarImg: '/static/img/person.png',
				userInfo: null,
				isLogin: false
				
			};
		},
		components: {},
		onLoad() {

		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					this.isLogin = true
			        console.log(userinfo);
					this.userName = userinfo.p_name
					this.avatarImg = userinfo.avatarUrl
					
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		mounted() {
		},
		methods: {
			logout() {
				this.modalVisible = true;
			},
			hideModal() {
				this.modalVisible = false;
				this.loginModalVisible = false;
			},
			confirmLogout() {
				this.isLogin = false;
				try {
				    uni.removeStorageSync('user_info');
				} catch (e) {
				    // error
					console.log(e)
				}
				uni.reLaunch({
					url: '/pages/user/index'
				});
			},
			toLogin() {
				// 如果未登录，去登录
				if(!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			// 我的服务
			myService() {
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/user-service'
					})
				}else{
					this.loginModalVisible = true
				}
			},
			// 我的咨询
			myAdvice() {
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/user-advice'
					})
				}else{
					this.loginModalVisible = true
				}
			},
			// 账户设置
			mySetting() {
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/account-setting'
					})
				}else{
					this.loginModalVisible = true
				}
			}
		}
	}
</script>

<style>
	.UCenter-bg {
		background-image: url(../../static/img/user-bg.png);
		background-size: cover;
		height: 600rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}
</style>
