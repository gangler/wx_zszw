<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">申请办事</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">申请办事</block></cu-custom>
		
		<form @submit="formSubmit">
			<view class="cu-form-group bg-gray flex justify-center">
				<view class="title">—— 基础信息 ——</view>
			</view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group flex justify-center">
					<view>
						<radio class='radio blue margin-sm' :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						<text class="text-df">个人</text>
					</view>
					<view>
						<radio class='radio blue margin-sm' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
						<text class="text-df">企业</text>
					</view>
				</view>
			</radio-group>
			<!-- 个人办事 -->
			<view v-if="radio=='A'">
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="docmPickerChange" :value="docmindex" :range="perDocmentList" range-key="DocmentTypeName" name="DocmentType">
						<view class="picker">
							<text class="text-lg text-gray" v-if="docmindex===-1">请选择证件类型</text>
							<text v-else>{{perDocmentList[docmindex].DocmentTypeName}}</text>
							<!-- {{index>-1?perDocmentList[index].DocmentTypeName:'请选择证件类型'}} -->
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input class="text-right" placeholder="请输入证件号码" name="DocmentNumber"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input class="text-right" placeholder="请输入姓名" name="AcceptPersonName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="sexPickerChange" :value="sexindex" :range="sexList" name="AcceptPersonSex">
						<view class="picker">
							<text class="text-lg text-gray" v-if="sexindex===-1">请选择性别</text>
							<text v-else>{{sexList[sexindex]}}</text>
							<!-- {{index>-1?perDocmentList[index].DocmentTypeName:'请选择证件类型'}} -->
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">出生日期</view>
					<picker mode="date" :value="date" start="" end="" @change="DateChange" name="AcceptPersonBirthday">
						<view class="picker">
							<text class="text-lg text-gray">{{date}}</text>
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">移动电话</view>
					<input class="text-right" placeholder="请输入移动电话号码" name="AcceptPersonMoblePhone"></input>
				</view>
				
			</view>
			
			<!-- 企业办事 -->
			<view v-else-if="radio=='B'">
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="docmPickerChange" :value="docmindex" :range="bussDocmentList" range-key="DocmentTypeName" name="DocmentType">
						<view class="picker">
							<text class="text-lg text-gray" v-if="docmindex===-1">请选择证件类型</text>
							<text v-else>{{bussDocmentList[docmindex].DocmentTypeName}}</text>
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input class="text-right" placeholder="请输入证件号码" name="DocmentNumber"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">单位名称</view>
					<input class="text-right" placeholder="请输入单位名称" name="AcceptPersonName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<input class="text-right" placeholder="请输入联系方式" name="AcceptPersonPhone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">注册地址</view>
					<input class="text-right" placeholder="请输入注册地址" name="LiveAddress"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">办公地址</view>
					<input class="text-right" placeholder="请输入办公地址" name="ResidenceAddress"></input>
				</view>
				
			</view>
			
			
			<view class="cu-form-group solid-top">
				<view class="title">材料类别</view>
				<picker @change="objPickerChange" :value="objindex" :range="objectTypeList" range-key="OBJNAME">
					<view class="picker">
						<text class="text-lg text-gray" v-if="objindex===-1">请选择材料分类</text>
						<text v-else>{{objectTypeList[objindex].OBJNAME}}</text>
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group bg-gray flex justify-center">
				<view class="title">—— 材料相关 ——</view>
			</view>
			
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, index) in materialFilterList" :index="index" :key="index" @click="toUpload(item.MATGROUP, item.ID, item.MATNAME)">
					<image src="@/static/img/pdf.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
					<view class="content padding-left">
						<view class="text-black"><view class="text-cut text-lg" style="width:220px">{{item.MATNAME}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df" style="width:220px">{{item.REMARKS == null ? '' : item.REMARKS}}</view></view>
						<view class="text-red text-sm flex"> <view class="text-cut text-df">{{item.REQUIRED == '是' ? '必须上传' : ''}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
					</view>
					<view class="action" v-if="item.MATGROUP != '0' && item.uploaded == false">
						<view class="cu-tag round bg-white light">
							<image src="/static/img/downfill.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="action" v-else-if="!item.uploaded">
						<view class="cu-tag round bg-white light">
							<image src="/static/img/upload.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="action" v-else>
						<view class="cu-tag round bg-white light">
							<image src="/static/img/true.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			<!-- 	<view class="cu-item arrow" v-for="(item, index) in matGroupIdList" :index="index" :key="index" v-if="item.MATINDEX.indexOf(matTypeId) != -1 && item.MATGROUP == '0'" >
					<image src="@/static/img/pdf.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
					<view class="content padding-left">
						<view class="text-black"><view class="text-cut text-lg" style="width:220px">{{item.MATNAME}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df" style="width:220px">{{item.REMARKS}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
					</view>
				</view> -->
			</view>
			
			<view class="bg-white padding-lg solid-top">
				<view class="btn-row"><button form-type="submit" class="cu-btn block bg-darkblue margin-tb-sm lg" >提交</button></view>
			</view>
		</form>
		
		
		<view class="cu-modal" :class="groupModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-darkblue justify-end">
					<view class="content">请选择一种材料上传</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="cu-list menu">
					<view class="cu-item" v-for="(item, index) in materialList" :index="index" :key="index" v-if="item.MATGROUP == currGroupId" @click="toUpload('0', item.ID, item.MATNAME)">
						<image src="@/static/img/pdf.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
						<view class="content">
							<view class="text-black text-left"><view class="text-cut text-lg" style="width:200px">{{item.MATNAME}}</view></view>
							<view class="text-gray text-left"> <view class="text-cut text-df" style="width:200px">{{item.REMARKS == null ? '' : item.REMARKS}}</view></view>
							<view class="text-gray text-left"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
						</view>
						<view class="action" >
							<view class="cu-tag round bg-white light" v-if="uploadedMatIdList.indexOf(item.ID) == -1">
								<image src="/static/img/upload.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
							</view>
							<view class="cu-tag round bg-white light" v-else>
								<image src="/static/img/true.png" style="width: 30px;height: 30px;" class="png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalVisible ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
				<!-- 	<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view> -->
				</view>
				<view class="padding-xl text-lg">
					请先登录
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<!-- <button class="cu-btn line-blue text-blue" @tap="hideModal">取消</button> -->
						<button class="cu-btn bg-red margin-left" @tap="confirmToLogin">确定</button>
			
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import configService from "@/services/config.service.js"
	import {dateFormatCheck} from '@/common/inspect.js';
	import {dateFormat} from '@/common/dateFormat.js';
	
	export default {
		onLoad: function (option) {
			console.log(option)
			if (option && option.affairId) {
				this.affairId = option.affairId;
			}
			if (option && option.affairCode) {
				this.affairCode = option.affairCode;
			}
			// if (option && option.IsNetAccepet) {
			// 	this.IsNetAccepet = option.IsNetAccepet;
			// }
			this.getObjectTypeList()
			this.getDocmentList()
			this.getMaterialList()
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				modalVisible: false,
				userId: 0,
				radio: 'A',
				affairId: 105,
				affairCode: 'CGZ003',
				townCode: 0,
				objectTypeList: [],
				docmindex: -1,
				sexindex: -1,
				objindex: -1,
				matTypeId: 0,
				perDocmentList: [],
				bussDocmentList: [],
				sexList: ["男","女"],
				materialList: [],// 所有材料列表
				date: '请选择出生日期',
				ObjectId: 0,
				matGroupIdList: [],
				materialFilterList: [],// 根据类型过滤后的材料列表
				groupModal: false,
				materialGroupModalList: [],// 弹窗中的材料列表
				currGroupId: 0,// 当前弹窗的GroupId
				uploadedMatIdList: []
			}
		},
		onShow() {
			let materialInfoList = uni.getStorageSync('material_info');
			if(materialInfoList) {
				let matObj = JSON.parse(materialInfoList)
				console.log(matObj)
				if(matObj.length > 0) {
					this.uploadedMatIdList = []
					matObj.forEach((val) => {
						console.log(val)
						this.uploadedMatIdList.push(val.MatID)
						this.materialFilterList.forEach((kal) => {
							if(kal.ID == val.MatID) {
								kal.uploaded = true
							}
						})
						const found = this.materialList.find(element => element.ID == val.MatID);
						console.log(found);
						if(found.MATGROUP != '0') {
							this.materialFilterList.forEach((kal) => {
								if(kal.MATGROUP == found.MATGROUP) {
									kal.uploaded = true
								}
							})
						}
					})
					console.log(this.materialFilterList)
					console.log(this.uploadedMatIdList)
				}
			}
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
					// this.isLogin = true
			        // console.log(userinfo);
					this.userId = userinfo.userId
			    }else {
					this.modalVisible = true
				}
				uni.setStorage({
				    key: 'material_info',
				    data: '[]',
				    success: function () {
				        console.log('mat_storage init');
				    }
				});
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		methods: {
			//材料类别列表
			getObjectTypeList() {
				uni.request({
					url: configService.apiUrl + '/getMaterialsByObject',
					method: 'POST',
					data: {
						AffairId: this.affairId,
						UserType: 2
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.Result) {
							this.objectTypeList = res.data.Data
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			// 证件类型列表
			getDocmentList() {
				uni.request({
					url: configService.apiUrl + '/get_base_dic',
					success: (res) => {
						console.log(res.data)
						let doclist = res.data.Data.D999
						doclist.forEach((val) => {
							// console.log(val)
							if(val.DocmentTypeType === 1) {
								this.perDocmentList.push(val)
							}else if(val.DocmentTypeType === 2) {
								this.bussDocmentList.push(val)
							}
						})
						let townlist = res.data.Data.D005
						this.townCode = townlist[0].CODE
						// console.log(this.townCode)
					}
				})
			},
			//材料列表
			getMaterialList() {
				uni.request({
					url: configService.apiUrl + '/getMaterialsDetailsByAffairId',
					method: 'POST',
					data: {
						AffairId: this.affairId,
						UserType: 2
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.Result) {
							this.materialList = res.data.Data
						}
						this.materialFilterList = []
						this.matGroupIdList = []
						this.materialList.forEach((val) => {
							// 先根据材料类别筛选 this.matTypeId
							// 在进行分组
							if(val.MATGROUP == '0' && val.MATINDEX.indexOf(this.matTypeId) != -1) {
								val['uploaded'] = false
								this.materialFilterList.push(val)
							}else {
								if(this.matGroupIdList.indexOf(val.MATGROUP) == -1 && val.MATINDEX.indexOf(this.matTypeId) != -1) {
									this.matGroupIdList.push(val.MATGROUP)
									val['uploaded'] = false
									this.materialFilterList.push(val)
								}
							}
						})
						console.log(this.materialFilterList)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			docmPickerChange(e) {
				console.log(e.detail.value)
				this.docmindex = e.detail.value
			},
			sexPickerChange(e) {
				console.log(e.detail.value)
				this.sexindex = e.detail.value
			},
			objPickerChange(e) {
				console.log(e.detail.value)
				this.objindex = e.detail.value
				this.matTypeId = this.objectTypeList[this.objindex].OBJINDEX
				this.ObjectId = this.objectTypeList[this.objindex].MATOBJID
				console.log(this.ObjectId)
				this.getMaterialList()
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			warnModel(msg) {
				console.log(msg)
				uni.showModal({
					content: msg,
					showCancel: false
				});
			},
			hideModal(e) {
				this.groupModal = false
			},
			toUpload(group, id, name) {
				if(group != '0') {
					this.groupModal = true
					this.currGroupId = group
				}else {
					uni.navigateTo({
					    url: '../work/work-online-upload?matid=' + id + '&matname=' + name
					});
				}
			},
			confirmToLogin() {
				this.modalVisible = false
				uni.setStorage({
				    key: 'curr_page',
				    data: 'grzx',
				    success: function () {
				        console.log('set curr_page');
				    }
				});
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			// 表单提交
			formSubmit(e) {
				let formdata = e.detail.value
				console.log(formdata)
				// console.log(formdata.DocmentNumber)
				// 表单验证
				if (formdata.DocmentType != undefined && formdata.DocmentType === -1) {
				    this.warnModel('请选择证件类型')
				} else if (formdata.DocmentNumber != undefined && formdata.DocmentNumber == '') {
				    this.warnModel('请输入证件号码')
				} else if (formdata.AcceptPersonName != undefined && formdata.AcceptPersonName == '') {
				    this.warnModel('请输入名称')
				} else if (formdata.AcceptPersonSex != undefined && formdata.AcceptPersonSex === -1) {
				    this.warnModel('请选择性别')
				} else if (formdata.AcceptPersonBirthday != undefined && !dateFormatCheck(formdata.AcceptPersonBirthday)) {
				    this.warnModel('请选择出生日期')
				} else if (formdata.AcceptPersonMoblePhone != undefined && formdata.AcceptPersonMoblePhone == '') {
				    this.warnModel('请输入移动电话')
				} else if (formdata.AcceptPersonPhone != undefined && formdata.AcceptPersonPhone == '') {
				    this.warnModel('请输入联系方式')
				} else if (formdata.LiveAddress != undefined && formdata.LiveAddress == '') {
				    this.warnModel('请输入注册地址')
				} else if (formdata.ResidenceAddress != undefined && formdata.ResidenceAddress == '') {
				    this.warnModel('请输入办公地址')
				} else if (this.objindex == '-1') {
				    this.warnModel('请选择材料类别')
				
				// } else if (formdata.ImageUrl3 == '') {
				//     this.warnModel('请上传材料')
				
				} else {
					// 必传材料校验
					let requiredFlag = false
					this.materialFilterList.forEach((val) => {
						if(val.REQUIRED == '是' && val.uploaded == false) {
							requiredFlag = true
						}
					})
					if(requiredFlag) {
						this.warnModel('请上传必须的材料')
						return
					}
					
					formdata.AffairCode = this.affairCode
					formdata.AffairId = this.affairId
					formdata.CurrAffairCode = this.newAffairCode();
					formdata.Handle_Type = 1
					if(formdata.AcceptPersonSex != undefined) {
						formdata.AcceptPersonSex += 1
					}
					formdata.Is_LegalPerson = this.radio == 'A' ? 0 : 1
					formdata.ObjectId = this.ObjectId
					formdata.TownCode = this.townCode
					formdata.TransTime = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
					formdata.UserId = this.userId
					// formdata.log_verify_code = this.log_verify_code
					// console.log(formdata)
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(formdata))
					
					let materialInfoList = uni.getStorageSync('material_info');
					let matObj = JSON.parse(materialInfoList)
					
					let allInfo = JSON.stringify({
					    'AffairInfo': formdata,
					    'MaterialTakeInfoList': matObj
					})
					// console.log(allInfo)
					
					uni.request({
						url: configService.apiUrl + '/affairAcceptNew',
						method: 'POST',
						data: allInfo,
						success: (res) => {
							console.log(res.data)
							if(res.data.Data) {
								let resp = JSON.parse(res.data.Data)
								if(resp.Result) {
									console.log(resp)
									// 提交成功
									this.warnModel('提交成功')
									uni.navigateBack({
										delta: 1
									})
								}
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
			},
			newAffairCode() {
				//生成上传时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				let minute = date.getMinutes();
				let second = date.getSeconds();
				
				//在1~9的数字前补零
				month < 10 ? (month = '0' + month) : '';
				day < 10 ? (day = '0' + day) : '';
				hour < 10 ? (hour = '0' + hour) : '';
				minute < 10 ? (minute = '0' + minute) : '';
				second < 10 ? (second = '0' + second) : '';
				
				let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;//上传时间
				let timestamp = new Date().getTime();//上传时间戳
				return this.affairCode + '-' + year + month + day + timestamp
			}
			
		}
	}
	
	
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
