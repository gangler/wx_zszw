<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">我的咨询</block></cu-custom>
		<cu-custom v-else-if="flag == 2" class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">我的咨询</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in adviceList" :index="index" :key="index" >
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
					<view class="text-gray text-sm">
						
						<text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
	export default {
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				userId: 17,
				infoDetail: {},
				placeholder: '',
				adviceList: []
			}
		},
		onShow() {
			this.getAdviceList()
		},
		created() {
			try {
			    const userinfo = uni.getStorageSync('user_info');
			    if (userinfo) {
			        console.log(userinfo);
					this.userId = userinfo.userId
					// this.getAdviceList()
			    }
			} catch (e) {
			    // error
				console.log(e)
			}
		},
		methods: {
			getAdviceList() {
				uni.request({
					url: configService.apiUrl + '/gxfrTL/GetMyConsult',
					method: 'POST',
					data: {
						USERID: this.userId,
						State: -1
					},
					success: (res) => {
						// console.log(JSON.parse(res.data))
						let resp = JSON.parse(res.data)
						if(resp.Result) {
							this.adviceList = resp.Data
							console.log(this.adviceList)
						}
						// if(res.data.code == "0") {
						// 	if(res.data.data) {
						// 		// console.log(res.data.data)
						// 		// 成功
						// 		uni.navigateBack()
						// 	}
						// }
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
		},
	}
</script>
<style>
</style>
