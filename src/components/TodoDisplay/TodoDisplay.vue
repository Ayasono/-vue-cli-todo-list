<template>
	<div class="TodoDisplay">

		<el-table
			:data="filteredData"
			stripe
			style="width: 100%">

			<el-table-column align="center">
				<template v-slot="scope">
					<el-checkbox
						:value="scope.row.isChecked"
						@change="changeStatus(scope.row)">
					</el-checkbox>
				</template>
			</el-table-column>

			<el-table-column
				align="center"
				label="事件"
				prop="todos"
				width="180">
			</el-table-column>

			<el-table-column align="center" label="操作">
				<template v-slot="scope">
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<footer>
			<span id="undone">
				未完成: {{ undone }} / {{ tableData.length }}
			</span>
			<el-button type="primary" @click="showAll">全部</el-button>
			<el-button type="primary" @click="undoneOnly">未完成</el-button>
			<el-button type="primary" @click="doneOnly">已完成</el-button>
			<el-button type="danger" @click="deleteDone">清除已完成</el-button>
		</footer>
	</div>
</template>

<script>

import {mapGetters, mapState} from "vuex";

export default {
	name: 'TodoDisplay',
	methods: {
		changeStatus(data) {
			this.$store.commit('updateStatus', data)
		},
		handleDelete(index, data) {
			this.$store.commit('deleteItem', data.todos)
			console.log(data)
		},
		deleteDone() {
			this.$store.dispatch('deleteDone')
		},
		undoneOnly() {
			this.$store.commit('UNDONE', 'undoneOnly')
		},
		showAll() {
			this.$store.commit('SHOWALL', 'showAll')
		},
		doneOnly() {
			this.$store.commit('DONE', 'doneOnly')
		},
	},
	computed: {
		...mapState(['tableData']),
		...mapGetters(['filteredData']),
		undone() {
			const data = this.tableData
			return data.length - data.reduce((acc, curr) => {
				if (curr.isChecked) {
					acc += 1
				}
				return acc
			}, 0)
		},
	},
};
</script>

<style lang="scss" scoped>
.TodoDisplay {
	width: 100%;
	height: 100%;
}

footer {
	display: flex;
	justify-content: space-around;
	margin-top: 20px;

	#undone {
		text-align: center;
		font-size: 16px;
		line-height: 40px;
	}
}
</style>