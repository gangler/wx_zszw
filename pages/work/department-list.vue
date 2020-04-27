<template>
	<view v-if="flag === 1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">办事部门</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item, index) in worklist" :index="index" :key="index" @tap="tabSelect" @click="getDepartmentList(item.ID)" :data-id="index" :data-deptid="item.ID">
				<text>{{item.CNAME}}</text>
			</view>
		</scroll-view>
		
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item, index) in departmentlist" :index="index" :key="index">
				<view class="content" @click="departOnClick(item)">
					<text class="text-grey">{{item.AffairName}}</text>
				</view>
			</view>
		</view>
		
	</view>
	
	
	<view v-else-if="flag === 2">
		<cu-custom bgColor="bg-darkblue" :isBack="true"><block slot="backText"></block><block slot="content">办事部门</block></cu-custom>
		
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item, index) in worklist" :index="index" :key="index" @tap="tabSelect" @click="getDepartmentList(item.ID)" :data-id="index" :data-deptid="item.ID">
				<text>{{item.CNAME}}</text>
			</view>
		</scroll-view>
		
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item, index) in departmentlist" :index="index" :key="index">
				<view class="content" @click="departOnClick(item)">
					<text class="">{{item.AffairName}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	import configService from "@/services/config.service.js"
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option && option.id != undefined){
				this.departId = option.id
				this.TabCur = option.id - 1
				this.getDepartmentList(this.departId)
			}
			if(option && option.name != undefined){
				this.name = option.name
			}
			if(option && option.level != undefined){
				this.level = option.level
				this.getLevelList(this.departId)
			}
		},
		components: {
		},
		data() {
			return {
				flag: configService.format_type,
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'gear-filled'
				},
				departmentlist: [],
				departId: 1,
				name: '',
				level: '',
				worklist: [],
				TabCur: 0,
				scrollLeft: 0,
			}
		},
		created() {
			this.getWorkList()
		},
		methods: {
			//从办事部门跳转
			getDepartmentList(val) {
				uni.request({
					url: configService.apiUrl + '/get_affairs',
					data: {
						type: 0,
						ContentCode: val
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.departmentlist = wlist
						// console.log(this.departmentlist)
					}
				})
			},
			//从事项层级跳转
			getLevelList(val) {
				uni.request({
					url: configService.apiUrl + '/get_affairs_by_level',
					data: {
						ContentCode: val,
						AffairLevel: this.level,
						Type: 0,
						UserType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.departmentlist = wlist
					}
				})
			},
			// 办事部门
			getWorkList() {
				uni.request({
					url: configService.apiUrl + '/get_base_dic',
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data.D001
						this.worklist = wlist
						console.log(this.worklist)
					}
				})
			},
			tabSelect(e) {
				// console.log(e)
				this.departId = e.currentTarget.dataset.deptid;
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// console.log(this.TabCur)
				// console.log(this.scrollLeft)
				this.getDepartmentList(this.departId)
			},
			departOnClick(item){
				// console.log(item)
				uni.navigateTo({
				    url: '../shared/pdf?Affairid=' + item.Affairid 
						+ '&AffairCode=' + item.AffairCode 
						+ '&AffairName=' + item.AffairName 
						+ '&IsNetAccepet=' + item.IsNetAccepet 
						
				});
			},
			pageBack(){
				uni.navigateBack()
			}
		},
	}
	
	// $(function () {
	// 	getHref();
	// 	getLevelList();
	// 	getSelectedList()
	// })

	// var id;
	// var level;
	// var state;

	// function getHref() {
	// 	var href = window.location.href;

	// 	if (href.indexOf('id') !== -1) {
	// 		state = 1;
	// 		id = window.location.href.match(/id=(\S*)&/)[1];
	// 		getDepartmentList(id);
	// 	}

	// 	if (href.indexOf('level') !== -1) {
	// 		state = 2;
	// 		level = window.location.href.split("level=")[1];
	// 		var name = decodeURI(window.location.href.match(/name=(\S*)&/)[1]);
	// 		$('h1').append(' -- ' + name);
	// 		getLevelList(1);
	// 	}
	// }

	// $('#department-selected').on('change', function () {
	// 	var val = $(this).find('option').eq(this.selectedIndex).val();

	// 	if (state == 1) {
	// 		getDepartmentList(val);
	// 	 } else if (state == 2) {
	// 		getLevelList(val)
	// 	 }
	// })


	// function getSelectedList() {
	// 	$.ajax({
	// 		url: configService.apiUrl + '/get_base_dic',
	// 		success: function (res) {
	// 			var html = '';

	// 			$.each(res.Data.D001, function (index, item) {
	// 				html += '<option value="' + item.ID + '">' + item.CNAME + '</option>';
	// 			});
	// 			$('#department-selected').html(html);
	// 			$('#department-selected').find('option').eq(id - 1).attr('selected', true);
	// 		}
	// 	})
	// }
</script>
<style></style>
