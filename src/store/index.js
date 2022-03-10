import Vue from 'vue'
import Vuex from 'vuex'
import {nanoid} from "nanoid";

Vue.use(Vuex)

const testModule = {
    namespaced: true,
    state: {
        testData: [{a: 'test'}],
        arr1: []
    },
    actions: {},
    mutations: {},
}

export default new Vuex.Store({
    strict: true,
    state: {
        tableData: [
            {todos: 'Sample TodoList 1', isChecked: true, id: nanoid()},
            {todos: 'Sample TodoList 2', isChecked: false, id: nanoid()},
            {todos: 'Sample TodoList 3', isChecked: true, id: nanoid()},
            {todos: 'Sample TodoList 4', isChecked: false, id: nanoid()},
            {todos: 'Sample TodoList 5', isChecked: true, id: nanoid()},
        ],
        status: 'showAll',  // デフォルト
    },
    getters: {
        filteredData(state) {
            switch (state.status) {
                case "showAll":  // 全てのデータを表示
                    return state.tableData
                case "doneOnly": // 完成済みのみ
                    return state.tableData.filter(el => el.isChecked)
                case 'undoneOnly':　// 未完成データのみ
                    return state.tableData.filter(el => !el.isChecked)
            }
        }
    },
    mutations: {
        updateStatus(state, data) {
            let index = state.tableData.findIndex(el => el.id === data.id)
            state.tableData[index].isChecked = !data.isChecked
        },
        addList(state, value) {
            state.tableData.push(value)
        },
        deleteItem(state, value) {
            const index = state.tableData.findIndex(el => el.todos === value)
            state.tableData.splice(index, 1)
        },
        DELETEDONE(state, value) {
            state.tableData = value
        },
        UNDONE(state, value) {
            state.status = value
        },
        SHOWALL(state, value) {
            state.status = value
        },
        DONE(state, value) {
            state.status = value
        }
    },
    actions: {
        deleteDone(context) {
            let td = context.state.tableData
            const deleteItems = td.filter(el => {
                return el.isChecked === false
            })
            context.commit('DELETEDONE', deleteItems)
        },
    },
    modules: {
        testModule
    }
})
