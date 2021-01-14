<template>
  <div>
    <div class="top">
      <h3>表单构建</h3>
    </div>
    <el-row style="width:100%;height:calc(100vh - 200px);">
      <el-col :span="6" style="height:100%;background:#eee">
        <div class="formBox">
          <el-row :gutter="30">
            <draggable v-model="leftList" :options="{group:{name: 'itxst',pull:'clone',put:'false'},sort: false}">
              <transition-group>
                <el-col :span="8" v-for="(item,i) in leftList" :key="item.key_name" style="height:40px;text-align:center;margin:8px 0">
                  <p><i :class="item.icon"></i></p>
                  <p>{{item.key_name}}</p>
                </el-col>
              </transition-group>
            </draggable> 
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" style="height:100%;border:1px solid #f8f8f8">
        <el-row size="mini" style="width:90%">
          <draggable v-model="formList" @end="end2" group="itxst"  animation="300" :move="onMove">
            <transition-group>
              <div style="height:80px;width:100%" v-if="!formList || !formList.length" key='1'>拖拽到这</div>
              <el-col :span="24" v-for="(item,i) in formList" :key='i'>
                <!-- 输入框 -->
                {{item.key_name}}
                <el-input 
                  v-if="item.formType === 'input'"
                  v-model="item.model"
                  :type='item.type'
                  :maxlength='item.maxlength'
                  :minlength='item.minlength'
                  :show-word-limit='item.show_word_limit'
                  :placeholder='item.placeholder'
                  :clearable='item.clearable'
                  :show-password='item.show_password'
                  :disabled='item.disabled'
                  :prefix-icon='item.prefix_icon'
                  :suffix-icon='item.suffix_icon'
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
                  :step-strictly="item.step_strictly"
                  :precision="item.precision"
                  :disabled="item.disabled"
                  :controls="item.controls"
                  :controls-position="item.controls_position"
                ></el-input-number>
                <!-- 选择器 -->
                <el-select
                  v-if="item.formType === 'select'" 
                  v-model="item.model" 
                  :multiple='item.multiple'
                  :disabled='item.disabled'
                  :clearable='item.clearable'
                  :collapse-tags='item.collapse_tags'
                  :multiple-limit='item.multiple_limit'
                  :filterable='item.filterable'
                  :allow-create='item.allow_create'
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
                  :show-all-levels='item.show_all_levels'
                  :collapse-tags='item.collapse_tags'
                  :filterable='item.filterable'
                  ></el-cascader>
                <!-- 开关 -->
                <el-switch
                  v-if="item.formType === 'switch'"
                  v-model="item.model"
                  :active-value='item.active_value'
                  :inactive-value='item.inactive_value'
                  :disabled='item.disabled'
                  :active-color="item.active_color"
                  :inactive-color="item.inactive_color"
                  :active-text="item.active_text"
                  :inactive-text="item.inactive_text">
                </el-switch>
                <!-- 滑块 -->
                <el-slider 
                  v-if="item.formType === 'slider'" 
                  v-model="item.model"
                  :min="item.min" 
                  :max='item.max'
                  :step="item.step"
                  :disabled="item.disabled" 
                  :show-input='item.show_input'
                  :show-input-controls="item.show_input_controls"
                  :show-stops="item.show_stops" 
                  :show-tooltip='item.show_tooltip'
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
                  :start-placeholder="item.start_placeholder" 
                  :end-placeholder='item.end_placeholder'
                  :is-range="item.is_range" 
                  :arrow-control='item.arrow_control'
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
                  :start-placeholder="item.start_placeholder" 
                  :end-placeholder='item.end_placeholder'
                  :is-range="item.is_range" 
                  :arrow-control='item.arrow_control'
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
                  :start-placeholder="item.start_placeholder" 
                  :end-placeholder='item.end_placeholder'
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
                  :allow-half="item.allow_half"
                  :low-threshold="item.low_threshold" 
                  :high-threshold='item.high_threshold'
                  :colors="item.colors"
                  :void-color="item.void-color" 
                  :disabled-void-color='item.disabled_void_color'
                  :icon-classes="item.icon_classes"
                  :void-icon-class="item.void_iconClass"
                  :disabled-void-icon-class="item.disabled_void_iconClass"
                  :show-text='item.show_text'
                  :show-score='item.show_score'
                  :text-color='item.text_color'
                  :texts='item.texts'
                  :score-template='item.score_template'
                ></el-rate>
                <!-- 颜色选择器 -->
                <el-color-picker
                  v-if="item.formType === 'colorPicker'" 
                  v-model="item.model"
                  :show-alpha="item.show_alpha" 
                  :disabled='item.disabled'
                  :color-format="item.color_format"
                  :predefine="item.predefine" 
                ></el-color-picker>
                <div v-if="item.formType === 'slot'" >插槽</div>
              </el-col>
            </transition-group>
          </draggable> 
        </el-row>
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
import draggable from 'vuedraggable'
export default {
  name:'setForm',
  components: {
    draggable,
  },
  data(){
    return{
      formList:[],
      leftList:[
        {key_name:'输入框',icon:'el-icon-plus',formType:'input'},
        {key_name:'单选框',icon:'el-icon-plus',formType:'radio'},
        {key_name:'多选框',icon:'el-icon-plus',formType:'checkbox'},
        {key_name:'计数器',icon:'el-icon-plus',formType:'inputNumber'},
        {key_name:'选择器',icon:'el-icon-plus',formType:'select'},
        {key_name:'级联选择',icon:'el-icon-plus',formType:'cascader'},
        {key_name:'开关',icon:'el-icon-plus',formType:'switch'},
        {key_name:'滑块',icon:'el-icon-plus',formType:'slider'},
        {key_name:'时间选择',icon:'el-icon-plus',formType:'timeSelect'},
        {key_name:'日期选择',icon:'el-icon-plus',formType:'timeSelect'},
        {key_name:'上传',icon:'el-icon-plus',formType:'datePicker'},
        {key_name:'评分',icon:'el-icon-plus',formType:'rate'},
        {key_name:'颜色选择',icon:'el-icon-plus',formType:'colorPicker'},
        {key_name:'插槽',icon:'el-icon-plus',formType:'slot'},
      ],
      active:{

      }
    }
  },
  methods:{
    end2(){

    },
    onMove(val){

    }
  }
}
</script>