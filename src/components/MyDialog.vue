<template>
	<el-dialog :show-close="false" @open="getRuleForm" :title="title" :visible.sync="visable" width="30%" :close-on-click-modal="false">
		<el-form :rules="rules" :model="ruleForm" class="my-form" ref="ruleForm">
			<el-form-item :prop="item.name" v-for="(item,index) in content" :key="index">
				<div class="input-wrapper">
					<div class="input-label">
						<label><span v-if="item.rules&&item.rules[0].required" style="color:red">*</span>{{item.label}}：</label>
					</div>
					<div class="input-content">
						<el-input :autofocus="index==0?true:false" v-model="ruleForm[item.name]"  :placeholder="item.placeholder?item.placeholder:'请输入'"></el-input>
					</div>
				</div>
			</el-form-item>
		</el-form>

        <span class="dialog-footer">
			<el-button @click="onCencel">取 消</el-button>
			<el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
        </span>
	</el-dialog>
</template>


<script>
export default {
	model: {
		prop: "ruleForm",
		event: "confirm",
		event: "cancel"
	},
	props: {
		visable: {
			type: Boolean,
			required: true
        },
		content: {
			type: Array,
			default() {
				return [];
			}
		},
		title: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			ruleForm: {},
			rules:{}
		};
	},
	methods: {
		onCencel() {
			this.$emit('cancel')
		},
		//确认提交表单
		onConfirm(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					this.$emit('confirm',this.ruleForm)
				} else {
					return false
				}
			})
			
		},
		//初始化表单
		getRuleForm() {
			let form = {}
			this.content.forEach(item => {
				if(item.name) {
					if(item.content) {
						form[item.name] = item.content
					} else {
						form[item.name] = ''
					}
					
				}
			})
			this.ruleForm = form
			this.getRules();
		},

		//表单验证规则
		getRules() {
			let rules = {}
			this.content.forEach(item => {
				if(item.rules) {
					rules[item.name] = item.rules
				}
			});
			this.rules = rules;
		},
	}
};
</script>


<style>
.my-form .el-form-item__error {
    left: 20% !important;
}
</style>

<style scoped>
.input-wrapper {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.input-label {
	width: 20%;
	box-sizing: border-box;
	overflow: hidden;
	text-align: right;
}
.input-content {
	width: 75%;
	box-sizing: border-box;
	overflow: hidden;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 5%;
}
</style>