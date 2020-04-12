<template>
	<view class="warp">
		<cu-custom bgColor="bg-blue" :isBack="true"><block slot="content">办事部门</block></cu-custom>
		<uni-list v-for="(item, index) in departmentlist" :index="index" :key="index">
		    <uni-list-item :title="item.AffairName" :show-extra-icon="true" :extra-icon="extraIcon1" @click="departOnClick(item)" ></uni-list-item>
		</uni-list>
		
	</view>
</template>


<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import serverurl from "@/common/globalconfigs.js"
	
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			if(option && option.id != undefined){
				this.departId = option.id
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
			uniList,
			uniListItem
		},
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'gear-filled'
				},
				departmentlist: [],
				departId: 1,
				name: '',
				level: ''
			}
		},
		created() {
			
		},
		methods: {
			//从办事部门跳转
			getDepartmentList(val) {
				uni.request({
					url: serverurl + '/gxfrTL/get_affairs',
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
					url: serverurl + '/gxfrTL/get_affairs_by_level',
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
			departOnClick(item){
				// console.log(item)
				uni.navigateTo({
				    url: '../shared/pdf?Affairid=' + item.Affairid 
						+ '&AffairCode=' + item.AffairCode 
						+ '&AffairName=' + item.AffairName 
						+ '&IsNetAccepet=' + item.IsNetAccepet 
						
				});
			},
			
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
	// 		url: serverurl + '/gxfrTL/get_base_dic',
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
