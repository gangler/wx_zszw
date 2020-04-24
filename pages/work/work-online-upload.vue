<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">材料上传</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">材料上传</block></cu-custom>
		<form @submit="formSubmit">
			<view class="cu-bar bg-white solid-top">
				<view class="action text-black">
					材料名称：{{matName}}
				</view>
			</view>
			<view class="bg-white">
				<view class="cu-form-group padding-top-sm" v-for="(item,index) in imgList" :key="index">
					<view class="grid col-3 grid-square basis-xl">
						<view class="bg-img" @tap="ViewImage" :data-url="item">
							<image :src="item" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
					</view>
					<view class="action basis-xs" @click="uploadImg(index)">
						<view class="cu-tag round bg-white light" v-if="isUploadList.indexOf(item) === -1">
							<image src="/static/img/upload.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
						</view>
						<view class="cu-tag round bg-white light" v-else>
							<image src="/static/img/true.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="cu-form-group padding-top-sm" v-if="imgList.length<4">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage">
							<!-- <image class="png card-img" src="/static/img/plus.png" style="width: 70px;height: 70px;"  mode="aspectFit"></image> -->
							<text class='cuIcon-add'></text>
						</view>
					</view>
				</view>
			</view>
			<!-- <button form-type="submit">Submit</button> -->
			<view class="bg-white padding-lg solid-top">
				<view class="btn-row"><button form-type="submit" class="cu-btn block bg-darkblue margin-tb-sm lg" >确定</button></view>
			</view>
		</form>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	
	export default {
		onLoad: function (option) {
			console.log(option)
			if (option && option.matid) {
				this.matId = option.matid;
			}
			if (option && option.matname) {
				this.matName = option.matname;
			}
			// if (option && option.IsNetAccepet) {
			// 	this.IsNetAccepet = option.IsNetAccepet;
			// }
		},
		data() {
			return {
				flag: configService.format_type,
				isLogin: false,
				imgList: [],
				imgFileList: [],
				log_verify_code: '',
				uploadedImgList: [],
				isUploadList: [],
				MaterialTakeInfoList: [],
				matId: 0,
				matName: '',
				
			};
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					this.isLogin = true
			        console.log(userinfo);
					this.log_verify_code = userinfo.log_verify_code
			    }else {
					console.log("未登录")
					
				}
				let materialInfoList = uni.getStorageSync('material_info');
				if(!materialInfoList) {
					uni.setStorage({
					    key: 'material_info',
					    data: '[]',
					    success: function () {
					        console.log('mat_storage init');
					    }
					});
				}
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		mounted() {
		},
		methods: {
			// 正面
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(res)
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
							this.imgFileList = this.imgFileList.concat(res.tempFiles)
						} else {
							this.imgList = res.tempFilePaths
							this.imgFileList = res.tempFiles
						}
						console.log(this.imgList)
						console.log(this.imgFileList)
						// console.log(res.tempFilePaths);
						// console.log(res.tempFiles)
						
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							let idx = e.currentTarget.dataset.index
							let item = this.imgList[idx]
							this.isUploadList.splice(this.isUploadList.indexOf(item), 1)
							this.imgList.splice(idx, 1)
							this.imgFileList.splice(idx, 1)
							this.uploadedImgList.splice(idx, 1)
							// console.log(this.imgFileList)
							// console.log(this.uploadedImgList)
							// console.log(this.isUploadList)
						}
					}
				})
			},
			uploadImg(index) {
				// 显示上传提示框
				// console.log(this.uploadedImgList)
				if(this.isUploadList.indexOf(this.imgList[index]) != -1) {
					return
				}
				let file = this.imgFileList[index]
				console.log(file)
				// console.log(file.path)
				let type = file.path.substring(file.path.lastIndexOf('.')+1)
				// console.log('type', type)
				// 图片转base64上传
				uni.getFileSystemManager().readFile({
				    filePath: file.path, //选择图片返回的相对路径
				    encoding: 'base64', //编码格式
				    success: res => { //成功的回调
				        // let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
						let base64 = res.data
						// console.log(base64)
						uni.request({
							url: configService.apiUrl + '/gxfrTL/uploadFileByBase64',
							method: 'POST',
							data: {
								type: type,
								File: base64,
								UserType: 2,
							},
							success: (res) => {
								console.log(res)
								if(res.data.Result) {
									this.uploadedImgList[index] = res.data.Data
									// console.log(this.uploadedImgList)
									this.isUploadList.push(this.imgList[index])
									// console.log(this.isUploadList)
								}
							},
							fail: (res) => {
								console.log(res)
							}
						})
				    },
					fail: res => {
						console.log(res)
					}
				})
				// 方法二不可用
				// uni.request({
				// 	url: file.path, //v本地路径
				// 	// method: 'GET',
				// 	responseType: 'arraybuffer',
				// 	success: (res) => {
				// 		let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
				// 		console.log(base64)
				// 		// 文件上传
				// 		uni.request({
				// 			url: configService.apiUrl + '/gxfrTL/uploadFileByBase64',
				// 			method: 'POST',
				// 			data: {
				// 				type: type,
				// 				File: base64,
				// 				UserType: 2,
				// 			},
				// 			success: (res) => {
				// 				console.log(res)
				// 				if(res.data.Result) {
				// 					this.uploadedImgList[index] = res.data.Data
				// 					// console.log(this.uploadedImgList)
				// 					this.isUploadList.push(this.imgList[index])
				// 					// console.log(this.isUploadList)
				// 				}
				// 			},
				// 			fail: (res) => {
				// 				console.log(res)
				// 			}
				// 		})
				// 	},
				// 	fail: (res) => {
				// 		console.log(res)
				// 	}
				// })
			},
			formSubmit() {
				// 保存材料
				let materialInfoList = uni.getStorageSync('material_info');
				console.log(materialInfoList)
				if(materialInfoList) {
					let matObj = JSON.parse(materialInfoList)
					console.log(matObj)
					if(this.uploadedImgList.length > 0) {
						matObj = matObj.concat({
							Copies: 1,
							MatID: this.matId,
							MaterialName: this.matName,
							MaterialType: 5,
							ReMark: "",
							SavePath: this.uploadedImgList.join(','),
							id: this.matId,
							localPath: ""
						})
						console.log(matObj)
						uni.setStorage({
							key: 'material_info',
							data: JSON.stringify(matObj),
							success: function () {
								console.log('success');
							}
						});
						uni.navigateBack({
							delta: 1
						})
					}else {
						uni.showModal({
							content: '请上传材料',
							showCancel: false
						});
					}
				}
				
			}
			
		}
	
	}
</script>

<style>
</style>
