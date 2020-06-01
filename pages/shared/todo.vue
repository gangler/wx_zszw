<template>
	<view>
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content"></block></cu-custom>
		<web-view :src="allUrl" ></web-view>
	<!-- 	<view :style="'height:'+viewHeight+'px;position: relative;'" >
			<view class="bottom-but">
				<view class="flex">
					<view class="flex-sub" style="background-color: #03A9F4;">
						<button class="cu-btn bg-grey lg" style="width: 100%;background-color: #03A9F4;" @click="getWorkList('办事空表')">空表</button>
					</view>
					<view class="flex-sub" style="background-color: #5ABEBC;">
						<button class="cu-btn bg-grey lg" style="width: 100%;background-color: #5ABEBC;" @click="getWorkList('办事样表')">样表</button>
					</view>
					<view class="flex-sub" style="background-color: #FB767B;">
						<button class="cu-btn bg-grey lg" style="width: 100%;background-color: #FB767B;" @click="addNewAdvice">网上办事</button>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	
	
	export default {
		onLoad: function (option) {
			// if (option && option.UserId) {
			// 	this.UserId = option.UserId;
			// }
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					this.userId = userinfo.userId
			        console.log(userinfo);
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
			
			// let fileUrl = encodeURIComponent(
			// 	'http://47.101.41.168:8014/Affairs/ShowFile?filePath=/YmsFileUpload/AffairGuidFiles/CGZ003.pdf')
			// this.allUrl = this.viewerUrl 
			this.allUrl = configService.baseUrl + '/affairs/commissionHistory?userid=' + this.userId
			console.log(this.allUrl)
		},
		created() {
			let winWidth = uni.getSystemInfoSync().windowWidth;
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.pdfviewHeight = winHeight - 180
			this.viewHeight = winHeight - 45
			
		},
		data() {
			return {
				// viewerUrl: '/html/web/viewer.html',
				allUrl: '',
				pdfviewHeight: 550,
				viewHeight: 550,
				userId: 0,
				//:style="'height:'+pdfviewHeight+'px;top: 45px;'"
			}
		},
		methods: {
		}
	}
</script>

<style>
.bottom-but {
	z-index: 99;
	position: absolute;
	width: 100%;
	bottom: 0px;
}
</style>
