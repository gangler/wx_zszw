<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">个人实名认证</block></cu-custom>
		<cu-custom v-else-if="flag == 2" class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">个人实名认证</block></cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="p_name"></input>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title">身份证</view>
				<input placeholder="请输入身份证" name="id_card"></input>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					身份证正、反面照片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view style="display: none;">
				<input name="mater_positive" :value="materPositive"></input>
				<input name="mater_opposite" :value="materOpposite"></input>
			</view>
			<view class="cu-form-group">
				<view class="flex">
					<view class="flex-sub" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;margin-right: 10px;'">
						<view class="bg-img flex" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<view>
								<image class="card-img" :src="imgList[index]" mode="aspectFill"></image>
							</view>
							<view class="cu-tag bg-grey del-tab " @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view @tap="ChooseImage" v-if="imgList.length<1">
							<image class="png card-img" src="/static/img/idcard/upload_zheng.png"  mode="aspectFit"></image>
							<!-- <text class='cuIcon-cameraadd'></text> -->
						</view>
					</view>
					<view class="flex-sub" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;margin-right: 10px;'">
						<view class="bg-img flex" >
								<image class="card-img" src="/static/img/idcard/zheng.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white padding-sm"></view>
			<view class="cu-form-group">
				<view class="flex">
					<view class="flex-sub" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;margin-right: 10px;'">
						<view class="bg-img flex" v-for="(item,index) in imgList_fan" :key="index" @tap="ViewImageFan" :data-url="imgList_fan[index]">
							<view>
								<image class="card-img" :src="imgList_fan[index]" mode="aspectFill"></image>
							</view>
							<view class="cu-tag bg-grey del-tab " @tap.stop="DelImgFan" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view @tap="ChooseImageFan" v-if="imgList_fan.length<1">
							<image class="png card-img" src="/static/img/idcard/upload_fan.png" ></image>
							<!-- <text class='cuIcon-cameraadd'></text> -->
						</view>
					</view>
					<view class="flex-sub" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;margin-right: 10px;'">
						<view class="bg-img flex" >
								<image class="card-img" src="/static/img/idcard/fan.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- <button form-type="submit">Submit</button> -->
			<view class="btn-row"><button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg" style="background-color: #215D80;">提交</button></view>
		</form>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	export default {
		data() {
			return {
				flag: configService.format_type,
				isLogin: false,
				imgList: [],
				imgList_fan: [],
				imgWidth: 230,
				imgHeight: 124,
				materPositive: null,
				materOpposite: null
			};
		},
		components: {},
		onLoad() {
	
		},
		created() {
			let winWidth = uni.getSystemInfoSync().windowWidth
			let winHeight = uni.getSystemInfoSync().windowHeight;
			// console.log(winHeight)
			// console.log(winWidth)
			this.imgWidth = winWidth*0.45
			this.imgHeight = this.imgWidth*0.53
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					this.isLogin = true
			        console.log(userinfo);
					
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
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						// console.log(this.imgList)
						// console.log(res.tempFilePaths);
						// console.log(res.tempFiles)
						let file = res.tempFiles[0]
						// console.log(file.name)
						let type = file.name.substring(file.name.indexOf('.')+1)
						console.log('type', type)
						uni.request({
							url: res.tempFilePaths[0], //v本地路径
							method: 'GET',
							responseType: 'arraybuffer',
							success: res => {
								let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
								// base64 ='data:image/jpeg;base64,'+base64 //不加上这串字符，在页面无法显示
								console.log(base64)
								// 文件上传
								uni.request({
									url: configService.apiUrl + '/gxfrTL/uploadFile',
									method: 'POST',
									data: {
										GuId: '',
										type: type,
										File: base64,
										Ftype: 2,
									},
									success: (res) => {
										// console.log(res)
										if(res.data.code == "0") {
											if(res.data.data != "") {
												// console.log(res.data.data)
												this.materPositive = configService.apiUrl + res.data.data
											}
										}
									},
									fail: (res) => {
										console.log(res)
									}
								})
							}
						})
						
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
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 反面
			ChooseImageFan() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList_fan.length != 0) {
							this.imgList_fan = this.imgList_fan.concat(res.tempFilePaths)
						} else {
							this.imgList_fan = res.tempFilePaths
						}
						// console.log(this.imgList_fan)
						let file = res.tempFiles[0]
						// console.log(file.name)
						let type = file.name.substring(file.name.indexOf('.')+1)
						console.log('type', type)
						uni.request({
							url: res.tempFilePaths[0], //v本地路径
							method: 'GET',
							responseType: 'arraybuffer',
							success: res => {
								let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
								// base64 ='data:image/jpeg;base64,'+base64 //不加上这串字符，在页面无法显示
								console.log(base64)
								// 文件上传
								uni.request({
									url: configService.apiUrl + '/gxfrTL/uploadFile',
									method: 'POST',
									data: {
										GuId: '',
										type: type,
										File: base64,
										Ftype: 2,
									},
									success: (res) => {
										// console.log(res)
										if(res.data.code == "0") {
											if(res.data.data != "") {
												// console.log(res.data.data)
												this.materOpposite = configService.apiUrl + res.data.data
											}
										}
									},
									fail: (res) => {
										console.log(res)
									}
								})
							}
						})
						
						
					}
					
				});
			},
			ViewImageFan(e) {
				uni.previewImage({
					urls: this.imgList_fan,
					current: e.currentTarget.dataset.url
				});
			},
			DelImgFan(e) {
				uni.showModal({
					title: '',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList_fan.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 表单提交
			formSubmit(e) {
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
				
				if(!formdata.p_name || !formdata.id_card) {
					uni.showModal({
						content: '信息不能为空',
						showCancel: false
					});
					return
				}
				if(!materPositive || !materOpposite) {
					
				}
				
				// uni.request({
				// 	url: configService.apiUrl + '/gxfrTL/updateUserAuthentication',
				// 	method: 'POST',
				// 	data: {
				// 	    p_name: name,
				// 	    id_card: number,
				// 	    mater_positive: mater_positive,
				// 	    mater_opposite: mater_opposite,
				// 	    UserType: 2,
				// 	    log_verify_code: log_verify_code
				// 	},
				// 	success: (res) => {
				// 		// console.log(res)
				// 		if(res.data.code == "0") {
				// 			if(res.data.data != "") {
				// 				console.log(res.data.data)
				// 			}
				// 		}
				// 	},
				// 	fail: (res) => {
				// 		console.log(res)
				// 	}
				// })
				
			},
			
			
		}
	
	}
</script>

<style>
	.card-img {
		width: 170px;
		height: 90px;
	}
	.del-tab {
		position: relative;
		right: 28px;
		/* top: -35px; */
	}
</style>
