<template>
	<view>
		<news v-if="PageCur == 'mrxc'"></news>
		<work v-if="PageCur == 'xcsh'"></work>
		<tools v-if="PageCur == 'bjsj'"></tools>
		<user v-if="PageCur == 'grzx'"></user>

		<!-- 	<components v-if="PageCur == 'component'"></components>
		<plugin v-if="PageCur == 'plugin'"></plugin> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="mrxc">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/mrxc' + [PageCur == 'mrxc' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'mrxc' ? 'text-blue' : 'text-gray'">资讯</view>
			</view>
			<view class="action" @click="NavChange" data-cur="xcsh">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/xcsh' + [PageCur == 'xcsh' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'xcsh' ? 'text-blue' : 'text-gray'">办事</view>
			</view>
			<view class="action" @click="NavChange" data-cur="bjsj">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/bjsj' + [PageCur == 'bjsj' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'bjsj' ? 'text-blue' : 'text-gray'">生活</view>
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
export default {
	components: {
		tools,
		user,
		work,
		news
	},
	data() {
		return {
			PageCur: 'mrxc'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
