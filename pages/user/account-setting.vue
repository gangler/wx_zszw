<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">账户设置</block></cu-custom>
		<scroll-view scroll-y class="scrollPage">
			<view class="cu-list menu" >
				<navigator class="cu-item arrow"   open-type="navigate">
					<!-- <view class="cu-avatar round lg" style="background-image:url(/static/logo.png);"></view> -->
					<image src="/static/img/security.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm">
						<view>
							<text class="text-blue margin-right-xs"></text> 修改密码</view>
					</view>
				</navigator>
				<navigator class="cu-item arrow"  
				 open-type="navigate">
					<image src="/static/img/user.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm">
						<view>
							<text class="text-blue margin-right-xs"></text> 个人实名认证</view>
					</view>
				</navigator>
				<navigator class="cu-item arrow"
				 open-type="navigate">
					<image src="/static/img/company.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm">
						<view>
							<text class="text-blue margin-right-xs"></text> 企业实名认证</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	export default {
		data() {
			return {
				modalVisible: false,
			};
		},
		components: {},
		onLoad() {
	
		},
		created() {},
		mounted() {
		},
		methods: {
			logout() {
				this.modalVisible = true;
			},
			hideModal() {
				this.modalVisible = false;
			},
			confirmLogout() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			},
		}
	
	}
</script>

<style>
</style>
