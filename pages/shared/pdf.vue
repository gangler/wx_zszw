<template>
	<view>
		<cu-custom class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">{{AffairName}}</block></cu-custom>
		<web-view :src="allUrl" :style="'height:'+webviewHeight+'px;;top: 45px;'"></web-view>
		<view :style="'height:'+webviewHeight+'px;'">
			
		</view>
		<view class="flex">
			<view class="flex-sub">
				<button class="cu-btn bg-blue lg" style="width: 100%;background-color: #03A9F4;" @click="getWorkList('办事空表')">空表</button>
			</view>
			<view class="flex-sub">
				<button class="cu-btn bg-grey lg" style="width: 100%;background-color: #5ABEBC;" @click="getWorkList('办事样表')">样表</button>
			</view>
			<view class="flex-sub">
				<button class="cu-btn bg-grey lg" style="width: 100%;background-color: #FB767B;" @click="addNewAdvice">网上办事</button>
			</view>
		</view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	
	
	export default {
		onLoad: function (option) {
			if (option && option.Affairid) {
				this.Affairid = option.Affairid;
			}
			if (option && option.AffairCode) {
				this.AffairCode = option.AffairCode;
			}
			if (option && option.AffairName) {
				this.AffairName = option.AffairName;
			}
			if (option && option.IsNetAccepet) {
				this.IsNetAccepet = option.IsNetAccepet;
			}
			// let fileUrl = encodeURIComponent(
			// 	'http://47.101.41.168:8014/Affairs/ShowFile?filePath=/YmsFileUpload/AffairGuidFiles/CGZ003.pdf')
			// this.allUrl = this.viewerUrl 
			this.allUrl = 'http://zszw.jsyizhengda.com/StaticHtml/shared/pdf-wx.html?Affairid=' + this.Affairid 
						+ '&AffairCode=' + this.AffairCode 
						+ '&AffairName=' + this.AffairName 
						+ '&IsNetAccepet=' + this.IsNetAccepet
			console.log(this.allUrl)
		},
		created() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.webviewHeight = winHeight - 85
		},
		data() {
			return {
				//Affairid=105&AffairCode=CGZ003&AffairName=户外广告设置的审批&IsNetAccepet=3
				Affairid: 105,
				AffairCode: 'CGZ003',
				AffairName: '户外广告设置的审批',
				IsNetAccepet: 3,
				// viewerUrl: '/html/web/viewer.html',
				allUrl: '',
				webviewHeight: 550
			}
		},
		methods: {
			getWorkList(workname) {
				uni.navigateTo({
				    url: '../work/work-table?name=' + workname
				});
			}
			// getMessage(event) {
			// 	uni.showModal({
			// 		content: JSON.stringify(event.detail),
			// 		showCancel: false
			// 	});
			// }
		}
	}
</script>

<style>

</style>
