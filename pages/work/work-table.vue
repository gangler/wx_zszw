<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">{{tableName}}</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">{{tableName}}</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in materialList" :index="index" :key="index" @click="getMaterialDetail(item.MATNAME, (type==0?item.EMPTYTABLEPATH:item.EXAMPLEPATH))">
				<image src="@/static/img/pdf.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
				<view class="content padding-left">
					<view class="text-black"><view class="text-cut text-lg" style="width:220px">{{item.MATNAME}}</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut text-df" style="width:220px">{{item.REMARKS == null ? '' : item.REMARKS}}</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
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
				type: 0,
			}
		},
		onShow() {
			this.getMaterialList()
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
						console.log(res.data)
						if(res.data.Result) {
							this.materialList = res.data.Data
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
