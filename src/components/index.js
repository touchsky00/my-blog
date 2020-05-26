import MyDialogComponent from './MyDialog.vue'

export const MyDialog = {
    install: function (Vue) {
        Vue.component('my-dialog', MyDialogComponent)
    }
}
