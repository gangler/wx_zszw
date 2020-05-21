<template>
	<view>
		<news v-if="PageCur == 'dbsj'"></news>
		<work v-if="PageCur == 'bjsj'"></work>
		<!-- <tools v-if="PageCur == 'sjzz'"></tools> -->
		<publics v-if="PageCur == 'sjzz'"></publics>
		<user v-if="PageCur == 'grzx'"></user>

		<!-- 	<components v-if="PageCur == 'component'"></components>
		<plugin v-if="PageCur == 'plugin'"></plugin> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="dbsj">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/dbsj' + [PageCur == 'dbsj' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'dbsj' ? 'text-blue' : 'text-gray'">资讯</view>
			</view>
			<view class="action" @click="NavChange" data-cur="bjsj">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/bjsj' + [PageCur == 'bjsj' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'bjsj' ? 'text-blue' : 'text-gray'">办事</view>
			</view>
			<!-- <view class="action" @click="NavChange" data-cur="bjsj">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/bjsj' + [PageCur == 'bjsj' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'bjsj' ? 'text-blue' : 'text-gray'">生活</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="sjzz">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/sjzz' + [PageCur == 'sjzz' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'sjzz' ? 'text-blue' : 'text-gray'">监督</view>
			</view>
			<view class="action" @click="NavChange" data-cur="grzx">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/grzx' + [PageCur == 'grzx' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'grzx' ? 'text-blue' : 'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
import tools from '../tools/index.vue';
import user from '../user/index.vue';
import work from '../work/index.vue';
import news from '../news/index.vue';
import publics from '../public/index.vue';
export default {
	components: {
		tools,
		user,
		work,
		news,
		publics
	},
	data() {
		return {
			PageCur: 'dbsj'
		};
	},
	onShow() {
		const currpage = uni.getStorageSync('curr_page');
		if(currpage) {
			this.PageCur = currpage
		}
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
			uni.setStorage({
			    key: 'curr_page',
			    data: this.PageCur,
			    success: function () {
			        console.log('set curr_page');
			    }
			});
		}
	}
};
</script>

<style></style>
