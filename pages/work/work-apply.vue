<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">申请办事</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">申请办事</block></cu-custom>
		
		<view>
			<text>{{affairId}}</text>
			<text>{{affairCode}}</text>
		</view>
		<!-- <view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in materialList" :index="index" :key="index" @click="getMaterialDetail(item.MATNAME, (type==0?item.EMPTYTABLEPATH:item.EXAMPLEPATH))">
				<image src="@/static/img/pdf.png" class="cu-avatar lg margin-top margin-bottom bg-white" mode="aspectFit"></image>
				<view class="content padding-left">
					<view class="text-black"><view class="text-cut text-lg">{{item.MATNAME}}</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut text-df">收{{item.MATNUMBER}}份</view></view>
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	import configService from "@/services/config.service.js"
	
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
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				affairId: 105,
				affairCode: '',
				materialList: [],
				type: 0,
			}
		},
		onShow() {
		},
		created() {
		},
		methods: {
			//材料列表
			getMaterialList() {
				uni.request({
					url: configService.apiUrl + '/gxfrTL/getMaterialsDetailsByAffairId',
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
			
			
		}
	}
	
	
</script>

<style>
</style>
