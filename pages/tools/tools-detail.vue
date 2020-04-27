<template>
	<view>
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content"></block></cu-custom>
		<web-view :src="allUrl" ></web-view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	
	
	export default {
		onLoad: function (option) {
			if (option && option.url) {
				this.allUrl = option.url;
			}
			// if (option && option.AffairName) {
			// 	this.AffairName = option.AffairName;
			// }
		},
		created() {
		},
		data() {
			return {
				allUrl: '',
				
			}
		},
		methods: {
		}
	}
</script>

<style>
</style>
