<template>
	<view class="warp">
		<view class="h3">办事部门</view>
		<view class="example-body">
			<uni-grid :column="4" :highlight="true">
				<uni-grid-item v-for="(item, index) in worklist" :index="index" :key="index">
					<view class="grid-item-box" @click="workchange(item.ID)">
						<image :src="item.SAVPATH" class="image" mode="aspectFill" />
						<text class="text">{{ item.CNAME }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view class="h3">事项层级列表</view>
		<view class="example-body">
			<uni-grid :column="4" :highlight="true">
				<uni-grid-item v-for="(item, index) in levellist" :index="index" :key="index">
					<view class="grid-item-box" @click="levelchange(item.AffairLevelTypeName, item.AffairLevelTypeCode)">
						<!-- <image :src="item.SAVPATH" class="image" mode="aspectFill" /> -->
						<text class="text">{{ item.AffairLevelTypeName }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		
		<view class="h3">热门办理事项</view>
		<uni-list v-for="(item, index) in hotlist" :index="index" :key="index">
		    <uni-list-item :title="item.AffairName" :show-arrow="false" @click="hotchange(index)"></uni-list-item>
		</uni-list>
		
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import serverurl from "@/common/globalconfigs.js"
	
	export default {
		components: {
			uniSection,
			uniGrid,
			uniGridItem,
			uniBadge,
			uniList,
			uniListItem
		},
		data() {
			return {
				worklist: [],
				levellist: [],
				hotlist: []
			}
		},
		created() {
			this.getWorkList()
			this.getLevelList()
			this.getHotList()
		},
		methods: {
			// 办事部门
			getWorkList() {
				uni.request({
					url: serverurl + '/gxfrTL/get_base_dic',
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data.D001
						this.worklist = wlist
						// console.log(this.worklist)
					}
				})
			},
			workchange(index){
				// console.log(index)
				uni.navigateTo({
				    url: '../shared/department-list?id=' + index
				});
			},
			//事项层级列表
			getLevelList() {
				uni.request({
					url: serverurl + '/gxfrTL/get_affair_level_type',
					data: {
						userType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.levellist = wlist
						// console.log(this.levellist)
					}
				})
			},
			levelchange(name, level){
				console.log('name', name)
				console.log('level', level)
				uni.navigateTo({
				    url: '../shared/department-list?name=' + name + '&level=' + level
				});
			},
			//热门办理事项
			getHotList() {
				uni.request({
					url: serverurl + '/gxfrTL/get_hot_affairs',
					data: {
						userType: 2
					},
					success: (res) => {
						// console.log(res.data)
						let wlist = res.data.Data
						this.hotlist = wlist
						// console.log(this.hotlist)
					}
				})
			},
			hotchange(index){
				console.log(index)
			}
		}
	}
	
	
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
 */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}
</style>
