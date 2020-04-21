<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" v-if="flag === 1"><block slot="backText">返回</block><block slot="content">{{infoDetail.title}}</block></cu-custom>
		<cu-custom bgColor="bg-darkblue" :isBack="true" v-else-if="flag === 2"><block slot="backText">返回</block><block slot="content">{{infoDetail.title}}</block></cu-custom>
		<!-- <view class="box">
			<view class="cu-bar bg-gradual-blue">
				<view class="action" @click="pageBack()">
					<text class="cuIcon-back text-gray"></text> 返回
				</view>
				<view class="content text-bold">
					{{infoDetail.title}}
				</view>
			</view>
		</view> -->
		
		
		<view class="container">
			<editor id="editor" class="ql-container text-lg" :placeholder="placeholder" :read-only="true" ></editor>
		</view>
		
	</view>
</template>


<script>
	import configService from '@/services/config.service.js';
	
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
				flag: configService.format_type,
				informationId: 3,
				infoDetail: {},
				placeholder: ''
			}
		},
		created() {
			// this.getNewsInformation(this.informationId)
		},
		methods: {
			//从新闻列表跳转
			getNewsInformation(val) {
				uni.request({
					url: configService.apiUrl + '/gxsdapi/get_information',
					data: {
						information_id: val,
						UserType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.data
						this.infoDetail = wlist
						// console.log(this.departmentlist)
						this.insertEditorInfo()
					}
				})
			},
			pageBack(){
				uni.navigateBack()
			},
			// 将html文本内容，放入富文本编辑器
			insertEditorInfo() {
				// console.log("aaa",this.infoDetail.content)
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					let content={
						html: this.infoDetail.content
					}
					this.editorCtx.setContents(content);//设置富文本编辑器的内容
				}).exec()
			},
		},
	}
</script>
<style>
    .container {
        padding: 10px;
    }

    #editor {
        width: 100%;
        height: 100%;
        /* background-color: #CCCCCC; */
    }

    button {
        margin-top: 10px;
    }
</style>
