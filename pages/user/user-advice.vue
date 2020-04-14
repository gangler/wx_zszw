<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">我的咨询</block></cu-custom>
		
	</view>
</template>


<script>
	import serverurl from "@/common/globalconfigs.js"
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			// if(option && option.id != undefined){
			// 	this.informationId = option.id
			// }
		},
		components: {
		},
		data() {
			return {
				informationId: 3,
				infoDetail: {},
				placeholder: ''
			}
		},
		created() {
			
		},
		methods: {
			
		},
	}
</script>
<style>
</style>
