<template>
	<div class="HomeView">
		<h1>My Todo List</h1>
		<div class="content">
			<div id="input">
				<el-input
					v-model="itemContent"
					clearable
					placeholder="请输入内容">
				</el-input>
			</div>

			<div id="btn">
				<el-button type="primary" @click="addList">添加事件</el-button>
			</div>
		</div>
		<todo-display></todo-display>
	</div>
</template>

<script>
import TodoDisplay from "@/components/TodoDisplay/TodoDisplay";

import {nanoid} from "nanoid";

export default {
	name: 'HomeView',
	data() {
		return {
			itemContent: '',
		}
	},
	methods: {
		addList() {
			if (this.itemContent === '') return this.$message.warning('Empty string detected')
			this.$store.commit('addList', {todos: this.itemContent, isChecked: false, id: nanoid()})
		}
	},
	computed: {},
	components: {
		TodoDisplay,
	}
};
</script>

<style lang="scss" scoped>
.content {
	#input {
		display: inline-block;
		width: 500px;
	}

	#btn {
		margin-left: 20px;
		display: inline-block;
	}
}
</style>
