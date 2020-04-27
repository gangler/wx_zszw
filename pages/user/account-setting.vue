<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">账户设置</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">账户设置</block></cu-custom>
		<scroll-view scroll-y class="scrollPage">
			<view class="cu-list menu" >
				<view class="cu-item arrow" @click="myPwd">
					<button class="cu-btn content">
						<image src="/static/img/security.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 修改密码</view>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="myPerson">
					<button class="cu-btn content">
						<image src="/static/img/user.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view><text class="text-blue margin-right-xs"></text> 个人实名认证</view>
						</view>
						<view class="action">
							<text class="text-grey text-sm" v-if="perVerified === 1"> 审核中</text>
							<text class="text-grey text-sm" v-else-if="perVerified === 2"> 已认证</text>
							<text class="text-grey text-sm" v-else> 未认证</text>
						</view>
					</button>
				</view>
				<view class="cu-item arrow" @click="myCompany">
					<button class="cu-btn content">
						<image src="/static/img/company.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text> 企业实名认证</view>
						</view>
						<view class="action">
							<text class="text-grey text-sm" v-if="compVerified === 1"> 审核中</text>
							<text class="text-grey text-sm" v-else-if="compVerified === 2"> 已认证</text>
							<text class="text-grey text-sm" v-else> 未认证</text>
						</view>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	export default {
		data() {
			return {
				flag: configService.format_type,
				isLogin: false,
				perVerified: 0,
				compVerified: 0,
				mobile: '',
			};
		},
		components: {},
		onLoad() {
	
		},
		onShow() {
			this.getUserState()
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					this.isLogin = true
			        console.log(userinfo);
					this.mobile = userinfo.mobile
					this.getUserState()
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		mounted() {
		},
		methods: {
			// 获取用户实名状态
			getUserState() {
				if(this.mobile != '') {
					uni.request({
						url: configService.apiUrl + '/getState',
						data: {
							mobile: this.mobile,
						},
						success: (res) => {
							// console.log(res)
							if(res.data.Result) {
								console.log('state--', res.data.Data)
								this.perVerified = res.data.Data.state
								this.compVerified = res.data.Data.organizationcertified
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
			},
			// 修改密码
			myPwd() {
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/setting/modinify-password'
					})
				}
			},
			// 个人实名认证
			myPerson() {
				if(this.isLogin) {
					if(this.perVerified == 1 || this.perVerified == 2) {
					}else {
						uni.navigateTo({
							url: '/pages/user/setting/personal-certification'
						})
					}
				}
			},
			// 企业实名认证
			myCompany() {
				if(this.isLogin) {
					if(this.compVerified == 1 || this.compVerified == 2) {
					}else {
						uni.navigateTo({
							url: '/pages/user/setting/enterprise-certification'
						})
					}
				}
			},
		}
	
	}
</script>

<style>
</style>
