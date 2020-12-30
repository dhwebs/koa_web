<template>
  <div>
    <div class="top">
      <h3>表单构建</h3>
    </div>
    <el-row style="width:100%;height:calc(100vh - 200px);">
      <el-col :span="6" style="height:100%;background:#eee">
        <div class="formBox">
          <el-row :gutter="30">
            <el-col :span="8">输入框</el-col>
            <el-col :span="8">单选框</el-col>
            <el-col :span="8">多选框</el-col>
            <el-col :span="8">计数器</el-col>
            <el-col :span="8">选择器</el-col>
            <el-col :span="8">级联选择器</el-col>
            <el-col :span="8">开关</el-col>
            <el-col :span="8">滑块</el-col>
            <el-col :span="8">时间选择器</el-col>
            <el-col :span="8">日期选择器</el-col>
            <el-col :span="8">上传</el-col>
            <el-col :span="8">评分</el-col>
            <el-col :span="8">颜色选择器</el-col>
            <el-col :span="8">插槽</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" style="height:100%;border:1px solid #f8f8f8">
        <el-form size="mini" style="width:90%">
          <el-form-item v-for="(item,i) in formList" :key='i' :label="item.label">
            <!-- 输入框 -->
            <el-input 
              v-if="item.formType === 'input'"
              v-model="item.model"
              :type='item.type'
              :maxlength='item.maxlength'
              :minlength='item.minlength'
              :show-word-limit='item.show-word-limit'
              :placeholder='item.placeholder'
              :clearable='item.clearable'
              :show-password='item.show-password'
              :disabled='item.disabled'
              :prefix-icon='item.prefix-icon'
              :suffix-icon='item.suffix-icon'
              :rows='item.rows'
              :readonly='item.readonly'
            ></el-input>
            <!-- 单选 -->
            <el-radio-group v-if="item.formType === 'radio'" v-model="item.model">
              <el-radio 
                v-for="(rad,k) in item.options" 
                :key='k' 
                :label="rad.value"
                :disabled='item.disabled'
                :border='item.border'
              >{{rad.label}}</el-radio>
            </el-radio-group>
            <!-- 多选 -->
            <el-checkbox-group v-if="item.formType === 'checkbox'" v-model="item.model" :min="item.min" :max='item.max'>
              <el-checkbox
               v-for="(che,k) in item.list" 
               :key="k" 
               :label="che"
               :disabled='item.disabled'
               :border='item.border'
              ></el-checkbox>
            </el-checkbox-group>
            <!-- 步进器 -->
            <el-input-number
             v-if="item.formType === 'inputNumber'" 
             v-model="item.model" 
             :min="item.min" 
             :max='item.max'
             :step="item.step"
             :step-strictly="item.step-strictly"
             :precision="item.precision"
             :disabled="item.disabled"
             :controls="item.controls"
             :controls-position="item.controls-position"
            ></el-input-number>
            <!-- 选择器 -->
            <el-select
             v-if="item.formType === 'select'" 
             v-model="item.model" 
             :multiple='item.multiple'
             :disabled='item.disabled'
             :clearable='item.clearable'
             :collapse-tags='item.collapse-tags'
             :multiple-limit='item.multiple-limit'
             :filterable='item.filterable'
             :allow-create='item.allow-create'
             :placeholder="item.placeholder">
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- 级联选择器 -->
            <el-cascader
             v-if="item.formType === 'cascader'" 
             v-model="item.model" 
             :options="item.options"
             :props='item.props'
             :disabled='item.disabled'
             :placeholder='item.placeholder'
             :clearable='item.clearable'
             :show-all-levels='item.show-all-levels'
             :collapse-tags	= 'item.collapse-tags'
             :filterable='item.filterable'
            ></el-cascader>
            <!-- 开关 -->
            <el-switch
              v-if="item.formType === 'switch'"
              v-model="item.model"
              :active-value='item.active-value'
              :inactive-value='item.inactive-value'
              :disabled='item.disabled'
              :active-color="item.active-color"
              :inactive-color="item.inactive-color"
              :active-text="item.active-text"
              :inactive-text="item.inactive-text">
            </el-switch>
            <!-- 滑块 -->
            <el-slider 
              v-if="item.formType === 'slider'" 
              v-model="item.model"
              :min="item.min" 
              :max='item.max'
              :step="item.step"
              :disabled="item.disabled" 
              :show-input='item.show-input'
              :show-input-controls="item.show-input-controls"
              :show-stops="item.show-stops" 
              :show-tooltip='item.show-tooltip'
              :range="item.range"
              :vertical="item.vertical"
              :height="item.height"
            ></el-slider>
            <!-- 时间选择器 -->
            <el-time-select
              v-if="item.formType === 'timeSelect'"
              v-model="item.model"
              :readonly="item.readonly" 
              :disabled='item.disabled'
              :editable="item.editable"
              :clearable="item.clearable" 
              :placeholder='item.placeholder'
              :start-placeholder="item.start-placeholder" 
              :end-placeholder='item.end-placeholder'
              :is-range="item.is-range" 
              :arrow-control='item.arrow-control'
              :align='item.align'
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
            <!-- 时间范围选择器 -->
            <el-time-picker
              v-if="item.formType === 'timeSelect'"
              v-model="item.model"
              :readonly="item.readonly" 
              :disabled='item.disabled'
              :editable="item.editable"
              :clearable="item.clearable" 
              :placeholder='item.placeholder'
              :start-placeholder="item.start-placeholder" 
              :end-placeholder='item.end-placeholder'
              :is-range="item.is-range" 
              :arrow-control='item.arrow-control'
              :align='item.align'
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-picker>
            <!-- 日期选择器 -->
            <el-date-picker
              v-if="item.formType === 'datePicker'"
              v-model="item.model"
              :readonly="item.readonly" 
              :disabled='item.disabled'
              :editable="item.editable"
              :clearable="item.clearable" 
              :placeholder='item.placeholder'
              :start-placeholder="item.start-placeholder" 
              :end-placeholder='item.end-placeholder'
              :type="item.type"
              :format='item.format'
              :align="item.align"
            >
            </el-date-picker>
            <!-- 评分 -->
            <el-rate
              v-if="item.formType === 'rate'" 
              v-model="item.model"
              :max="item.max" 
              :disabled='item.disabled'
              :allow-half="item.allow-half"
              :low-threshold="item.low-threshold" 
              :high-threshold='item.high-threshold'
              :colors="item.colors"
              :void-color="item.void-color" 
              :disabled-void-color='item.disabled-void-color'
              :icon-classes="item.icon-classes"
              :void-icon-class="item.void-iconClass"
              :disabled-void-icon-class="item.disabled-void-iconClass"
              :show-text='item.show-text'
              :show-score='item.show-score'
              :text-color='item.text-color'
              :texts='item.texts'
              :score-template='item.score-template'
            ></el-rate>
            <!-- 颜色选择器 -->
            <el-color-picker
              v-if="item.formType === 'colorPicker'" 
              v-model="item.model"
              :show-alpha="item.show-alpha" 
              :disabled='item.disabled'
              :color-format="item.color-format"
              :predefine="item.predefine" 
            ></el-color-picker>
            <slot :name='item.slotName'>
              <div>具名插槽</div>
            </slot>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="height:100%;overflow:auto;border:1px solid #f8f8f8">
        <el-form size="mini" label-width="90px" style="width:95%">
          <el-form-item label="字段描述">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="双向绑定">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="占位描述">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="前图标">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="后图标">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="最多输入">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="输入统计">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="能否清空">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否只读">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否禁用">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否必填">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'setForm',
  data(){
    return{
      formList:[],
      leftList:['输入框','单选框','多选框','计数器','选择器','级联选择器','开关','滑块','时间选择器','日期选择器','上传','评分','颜色选择器','插槽'],
      active:{

      }
    }
  },
  methods:{

  }
}
</script>