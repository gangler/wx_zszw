<template>
	<view class="bg-white" style="height: 100%;">
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">{{materialName}}</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">{{materialName}}</block></cu-custom>
		
		<view class="flex margin-lg">
			<view class="flex-sub">
				<text class="text-xl text-bold">文件名称：</text>
			</view>
			<view class="flex-twice">
				<text class="text-xl">{{materialName}}</text>
			</view>
		</view>
		<view class="flex margin-sm">
			<view class="flex-sub padding-sm">
				<button class="cu-btn bg-grey lg" style="background-color: #F37B1D; width: 100%;" @click="downloadFile">下载</button>
			</view>
			<view class="flex-sub padding-sm">
				<button class="cu-btn bg-grey lg" style="background-color: #F37B1D; width: 100%;" @click="openFile">编辑</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import configService from "@/services/config.service.js"
	
	export default {
		onLoad: function (option) {
			console.log(option)
			if (option && option.name) {
				this.materialName = option.name;
			}
			if (option && option.src) {
				this.materialSrc = option.src;
			}
			
			// if (option && option.AffairName) {
			// 	this.AffairName = option.AffairName;
			// }
			// if (option && option.IsNetAccepet) {
			// 	this.IsNetAccepet = option.IsNetAccepet;
			// }
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				materialName: '',
				materialSrc: '',
				saveFilePath: '',
			}
		},
		onShow() {
			// this.getMaterialList()
		},
		created() {
		},
		methods: {
			downloadFile() {
				uni.downloadFile({
				    url: this.materialSrc, //仅为示例，并非真实的资源
				    success: (res) => {
				        if (res.statusCode === 200) {
				            console.log('下载成功');
							console.log(res.tempFilePath)
							this.saveFilePath = res.tempFilePath
							// this.saveFile(res.tempFilePath)
							uni.showModal({
								content: '下载成功',
								showCancel: false
							});
				        }
				    },
					fail: (res) => {
						console.log(res)
					}
				});
				
			},
			saveFile(src) {
				uni.saveFile({
					tempFilePath: src,
					success: function (res) {
						console.log('保存成功')
						console.log(res)
						let savedFilePath = res.savedFilePath;
						uni.showModal({
							content: savedFilePath,
							showCancel: false
						});
						this.saveFilePath = savedFilePath
				  }
				});
			},
			openFile() {
				if(this.saveFilePath) {
					uni.openDocument({
					  filePath: this.saveFilePath,
					  success: function (res) {
					    console.log('打开文档成功');
					  }
					});
				}else {
					uni.showModal({
						content: '请先下载，然后再编辑',
						showCancel: false
					});
				}
			}
			
		}
	}
	
</script>

<style>
</style>
