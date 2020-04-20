<template>
	<view>
		<cu-custom v-if="flag == 1" bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">{{tableName}}</block></cu-custom>
		<cu-custom v-else-if="flag == 2" class="bg-blue" style="background-color: #215D80;" :isBack="true"><block slot="backText"></block><block slot="content">{{tableName}}</block></cu-custom>
		
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="cu-avatar radius xl margin-top margin-bottom" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content padding-left">
					<view class="text-pink"><view class="text-cut text-lg">莫甘娜</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut text-df">收 1 份</view></view>
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
			// if (option && option.AffairCode) {
			// 	this.AffairCode = option.AffairCode;
			// }
			// if (option && option.AffairName) {
			// 	this.AffairName = option.AffairName;
			// }
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
				
			}
		},
		created() {
		},
		methods: {
			//gxfrTL/getMaterialsDetailsByAffairId?AffairId=105&UserType=2
			
		}
	}
	
	
</script>

<style>
</style>
