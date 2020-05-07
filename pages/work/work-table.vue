<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">{{tableName}}</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">{{tableName}}</block></cu-custom>
		<view v-for="(item2, index2) in objectTypeList" :index="index2" :key="index2">
			<view class="margin-xs padding-left">
				<text class="text-lg text-blue">{{item2.OBJNAME}}</text> 
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" v-if="item.MATINDEX.indexOf(item2.OBJINDEX) != -1" v-for="(item, index) in materialList" :index="index" :key="index" @click="getMaterialDetail(item.MATNAME, (type==0?item.EMPTYTABLEPATH:item.EXAMPLEPATH))">
					<image v-if="item.existed" src="@/static/img/pdf1.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
					<image v-else src="@/static/img/pdf2.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
					<view class="content padding-left">
						<view class="text-black"><view class="text-cut text-lg" style="width:220px">{{item.MATNAME}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df" style="width:220px">{{item.REMARKS == null ? '' : item.REMARKS}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
					</view>
				</view>
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
				this.tableName = option.name;
			}
			if (option && option.affairId) {
				this.affairId = option.affairId;
			}
			if (option && option.type) {
				this.type = option.type;
			}
			// if (option && option.IsNetAccepet) {
			// 	this.IsNetAccepet = option.IsNetAccepet;
			// }
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				tableName: '办事空表',
				affairId: 1,
				materialList: [],
				objectTypeList: [],
				type: 0,
			}
		},
		onShow() {
			this.getMaterialList()
			this.getObjectTypeList()
		},
		created() {
		},
		methods: {
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
						// console.log(res.data)
						if(res.data.Result) {
							this.materialList = res.data.Data
						}
						
						this.materialList.forEach((val) => {
							if(this.type == 0) { //空表
								if(val.EMPTYTABLEPATH) {
									val.existed = true
								}else{
									val.existed = false
								}
							}else {//样表
								if(val.EXAMPLEPATH) {
									val.existed = true
								}else{
									val.existed = false
								}
							}
						})
						console.log(this.materialList)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
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
			getMaterialDetail(materialName, src) {
				if(src) {
					uni.navigateTo({
					    url: '../work/work-table-detail?name=' + materialName + '&src=' + src
					});
				}else {
					uni.showModal({
						content: '没有对应文件',
						showCancel: false
					});
				}
			}
			
		}
	}
	
	
</script>

<style>
</style>
