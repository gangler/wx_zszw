<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">企业实名认证</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">企业实名认证</block></cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">企业名称</view>
				<input class="text-right" placeholder="请输入企业名称" name="CorpName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">企业统一社会信用代码</view>
				<input class="text-right" placeholder="请输入统一社会信用代码" name="CorpId"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">类型</view>
				<input class="text-right" placeholder="请输入类型" name="CorpType"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">住所</view>
				<input class="text-right" placeholder="请输入住所" name="CorpAddress"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">法人代表</view>
				<input class="text-right" placeholder="请输入法人代表" name="FrzzName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">成立日期</view>
				<picker mode="date" :value="date" start="" end="" @change="DateChange" name="FoundedDate">
					<view class="picker">
						<text class="text-lg text-gray">{{date}}</text>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">营业期限</view>
				<view class="flex align-center" >
					<view class="flex-twice  margin-xs radius">
						<picker mode="date" :value="startdate" start="" end="" @change="StartDateChange" name="BussinessTermFrom">
							<view class="picker">
								<text class="text-lg text-gray">{{startdate}}</text>
							</view>
						</picker>
					</view>
					<view class="flex-sub  margin-xs radius">至</view>
					<view class="flex-twice  margin-xs radius margin-left">
						<picker mode="date" :value="enddate" start="" end="" @change="EndDateChange" name="BussinessTermTo">
							<view class="picker">
								<text class="text-lg text-gray">{{enddate}}</text>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">发证单位</view>
				<input class="text-right" placeholder="请输入发证单位" name="IssueOrg"></input>
			</view>
			<view class="cu-bar bg-white solid-top">
				<view class="action text-black">
					经营范围
				</view>
			</view>
			<view class="bg-white padding-bottom-lg">
				<view class="cu-form-group solids margin-left-sm margin-right-sm">
					<textarea maxlength="-1"  @input="textareaAInput" placeholder="请输入经营范围" name="BusinessScope"></textarea>
				</view>
			</view>
			<view class="cu-bar bg-white solid-top">
				<view class="action text-black">
					营业执照
				</view>
			</view>
			<view style="display: none;">
				<input name="ImageUrl3" :value="ImageUrl3"></input>
			</view>
			<view class="bg-white padding-bottom-lg">
				<view class="cu-form-group">
					<view class="flex">
						<view class="flex-sub" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;margin-right: 10px;'">
							<view class="bg-img flex" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								<view>
									<image class="card-img radius" :src="imgList[index]" mode="aspectFill"></image>
								</view>
								<view class="cu-tag bg-grey del-tab radius" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view @tap="ChooseImage" v-if="imgList.length<1">
								<image class="png card-img" src="/static/img/idcard/yingye.png"  mode="aspectFit"></image>
								<!-- <text class='cuIcon-cameraadd'></text> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <button form-type="submit">Submit</button> -->
			<view class="bg-white padding-lg solid-top">
				<view class="btn-row"><button form-type="submit" class="cu-btn block bg-darkblue margin-tb-sm lg" >提交</button></view>
			</view>
		</form>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	import {dateFormatCheck} from '@/common/inspect.js';
	export default {
		data() {
			return {
				flag: configService.format_type,
				isLogin: false,
				imgList: [],
				imgWidth: 230,
				imgHeight: 124,
				log_verify_code: '',
				ImageUrl3: '',
				date: '请输入日期',
				startdate: '请输入日期',
				enddate: '请输入日期',
				
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
					this.log_verify_code = userinfo.log_verify_code
			    }else {
					console.log("未登录")
					
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
						console.log(res.tempFiles)
						let file = res.tempFiles[0]
						// console.log(file.name)
						// let type = file.name.substring(file.name.indexOf('.')+1)
						// 微信小程序中没有name
						let type = file.path.substring(file.path.lastIndexOf('.')+1)
						// console.log('type', type)
						uni.getFileSystemManager().readFile({
						    filePath: file.path, //选择图片返回的相对路径
						    encoding: 'base64', //编码格式
						    success: res => { //成功的回调
						        // let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
								let base64 = res.data
								// console.log(base64)
								// 文件上传
								uni.request({
									url: configService.apiUrl + '/uploadFile',
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
												this.ImageUrl3 = configService.imgUrl + res.data.data
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
							this.ImageUrl3 = ''
						}
					}
				})
			},
			// 表单提交
			formSubmit(e) {
				let formdata = e.detail.value
				// console.log(formdata)
				
				if (formdata.CorpName == '') {
				    this.warnModel('请输入企业名称')
				} else if (formdata.CorpId == '') {
				    this.warnModel('请输入企业统一社会信用代码')
				} else if (formdata.CorpType == '') {
				    this.warnModel('请输入类型')
				} else if (formdata.CorpAddress == '') {
				    this.warnModel('请输入住所')
				} else if (formdata.FrzzName == '') {
				    this.warnModel('请输入法人代表')
				} else if (!dateFormatCheck(formdata.FoundedDate)) {
				    this.warnModel('请选择成立日期')
				} else if (!dateFormatCheck(formdata.BussinessTermFrom)) {
				    this.warnModel('请输入营业期限')
				} else if (!dateFormatCheck(formdata.BussinessTermTo)) {
				    this.warnModel('请输入营业期限')
				} else if (formdata.IssueOrg == '') {
				    this.warnModel('请输入发证单位')
				} else if (formdata.BusinessScope == '') {
				    this.warnModel('请输入经营范围')
				} else if (formdata.ImageUrl3 == '') {
				    this.warnModel('请上传营业执照')
				} else {
					formdata.UserType = 2
					formdata.log_verify_code = this.log_verify_code
					console.log(formdata)
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					uni.request({
						url: configService.apiUrl + '/enterpriseAuthentication',
						method: 'POST',
						data: formdata,
						success: (res) => {
							console.log(res.data)
							if(res.data.code == "0") {
								if(res.data.data) {
									// console.log(res.data.data)
									// 成功
									uni.navigateBack()
								}
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			StartDateChange(e) {
				this.startdate = e.detail.value
			},
			EndDateChange(e) {
				this.enddate = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			warnModel(msg) {
				console.log(msg)
				uni.showModal({
					content: msg,
					showCancel: false
				});
			}
			
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
	.cu-form-group uni-picker::after {
		color: #ffffff;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
