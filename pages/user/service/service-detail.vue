<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">办事流程</block></cu-custom>
		<cu-custom v-else-if="flag == 2" bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">办事流程</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item" >
				<view class="content padding-tb-sm">
					<view class="margin-xs">
						<text class="text-black text-bold text-xl margin-right-xs">{{affairName}}</text>
					</view>
					<view class="margin-xs">
						<text class="text-blue text-sm margin-right-xs">网上办事</text>
					</view>
					<view class="text-blue text-sm margin-xs flex">
						<text class="flex-sub margin-right-xs">{{affairCode}}</text>
					</view>
					<view class="margin-xs">
						<text class="text-blue text-sm margin-right-xs">{{transTime}}</text>
					</view>
				</view>
			</view>
			<view class="cu-item" v-for="(item, index) in serviceDetailList" :index="index" :key="index" >
				<view class="flex content padding-tb-sm">
					<view class="basis-xs margin-xs padding-sm radius">
						<button class="cu-btn cuIcon bg-blue">
							<text class="">{{index+1}}</text>
						</button>
					</view>
					<view class="flex-twice padding-sm radius">
						<view class="margin-xs">
							<text class="text-black text-xl margin-right-xs">状态：{{item.AffairFlowName}}</text>
						</view>
						<view class="text-black text-xl margin-xs flex">
							<text class="flex-sub margin-right-xs">结果：{{item.FlowResultName}}</text>
						</view>
						<view class="margin-xs">
							<text class="text-black text-xl margin-right-xs">{{item.OperaorTime.replace('T', ' ')}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if (option && option.affairName) {
				this.affairName = option.affairName;
			}
			if (option && option.affairCode) {
				this.affairCode = option.affairCode;
			}
			if (option && option.transTime) {
				this.transTime = option.transTime;
			}
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 17,
				affairName: '',
				affairCode: '',
				transTime: '',
				serviceDetailList: [],
				
			}
		},
		onShow() {
			this.getServiceDetailList()
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
			        // console.log(userinfo);
					this.userId = userinfo.userId
					// this.getAdviceList()
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		methods: {
			getServiceDetailList() {
				uni.request({
					url: configService.apiUrl + '/getWorkFlowByCurrAffairCode',
					method: 'POST',
					data: {
						CurrAffairCode: this.affairCode,
						UserType: 2
					},
					success: (res) => {
						// console.log(res.data)
						if(res.data.Result) {
							this.serviceDetailList = res.data.Data
							console.log(this.serviceDetailList)
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			
		},
	}
</script>
<style>
</style>
