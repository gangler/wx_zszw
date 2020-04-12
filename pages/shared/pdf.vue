<template>
	<view>
		<web-view :src="allUrl" ></web-view>
	</view>
</template>

<script>
	import serverurl from "@/common/globalconfigs.js"
	
	
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
			this.allUrl = 'http://zszw.jsyizhengda.com/StaticHtml/shared/pdf.html?Affairid=' + this.Affairid 
						+ '&AffairCode=' + this.AffairCode 
						+ '&AffairName=' + this.AffairName 
						+ '&IsNetAccepet=' + this.IsNetAccepet
			console.log(this.allUrl)
		},
		data() {
			return {
				Affairid: 0,
				AffairCode: '',
				AffairName: '',
				IsNetAccepet: 0,
				// viewerUrl: '/html/web/viewer.html',
				allUrl: ''
			}
		},
		methods: {
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
