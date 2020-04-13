<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">办事部门</block></cu-custom> -->
		<view class="box">
			<view class="cu-bar bg-gradual-blue">
				<view class="action" @click="pageBack()">
					<text class="cuIcon-back text-gray"></text> 返回
				</view>
				<view class="content text-bold">
					{{infoDetail.title}}
				</view>
			</view>
		</view>
		
		<view >
			<view class="text-df padding">{{infoDetail.content}}</view>
		</view>
		
	</view>
</template>


<script>
	import serverurl from "@/common/globalconfigs.js"
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option && option.id != undefined){
				this.informationId = option.id
				this.getNewsInformation(this.informationId)
			}
		},
		components: {
		},
		data() {
			return {
				informationId: 1,
				infoDetail: {}
			}
		},
		created() {
			
		},
		methods: {
			//从新闻列表跳转
			getNewsInformation(val) {
				uni.request({
					url: serverurl + '/gxsdapi/get_information',
					data: {
						information_id: val,
						UserType: 2
					},
					success: (res) => {
						console.log(res.data)
						let wlist = res.data.data
						this.infoDetail = wlist
						// console.log(this.departmentlist)
					}
				})
			},
			pageBack(){
				uni.navigateBack()
			}
		},
	}
</script>
<style></style>
