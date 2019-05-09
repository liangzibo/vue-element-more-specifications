<template>
  <div class="wrapper">
    <el-form label-width="90px">
      <el-form-item
        v-for="(item, indexs) in simulatedData.specArr"
        :key="indexs"
        :label="item.name"
      >
        <ul class="ulStyle">
          <li
            v-for="(val, index) in item.conName"
            :key="index"
            :class="[val.isShow?'':'noneActive',subIndex[indexs] == index ? 'productActive' : '']"
            @click="val.isShow == true && clickLi(val.name,indexs,$event,index)"
          >{{val.name}}</li>
        </ul>
      </el-form-item>
      <el-form-item label="购买数量" v-if="simulatedData.specArr.length > 0">
        <el-input-number v-model="specStock" :min="1" :max="specMaxStock" size="mini"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      simulatedData: {
        specArr: [],
        tableData: this.$store.state.tableData
      },
      specArr: this.$store.state.specArr,
      specAllValue: {},
      specValue: {},
      conName: [],
      bigActive: "",
      smallActive: "",
      specStock: 1,
      specMaxStock: 0,
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [] //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
    };
  },
  created() {
    this.simulatedData.tableData = this.$store.state.tableData;
    for (var i in this.simulatedData.tableData) {
      this.shopItemInfo[
        this.simulatedData.tableData[i].specs.toString()
      ] = this.simulatedData.tableData[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
    }
    for (var item in this.specArr) {
      this.specAllValue = {};
      this.conName = [];
      this.specAllValue.name = this.specArr[item].name;
      for (const val in this.specArr[item].conName) {
        this.specValue = {};
        this.specValue.name = this.specArr[item].conName[val];
        this.conName.push(this.specValue);
      }
      this.specAllValue.conName = this.conName;
      this.simulatedData.specArr.push(this.specAllValue);
    }
    this.checkItem();
  },
  methods: {
    clickLi(value, indexs, event, index) {
      if (this.selectArr[indexs] != value) {
        this.selectArr[indexs] = value;
        this.subIndex[indexs] = index;
      } else {
        this.selectArr[indexs] = "";
        this.subIndex[indexs] = -1; //去掉选中的颜色
      }
      this.checkItem();
    },
    checkItem() {
      const option = this.simulatedData.specArr;
      const result = []; //定义数组存储被选中的值
      for (const i in option) {
        result[i] = this.selectArr[i] ? this.selectArr[i] : "";
      }
      for (const i in option) {
        const last = result[i]; //把选中的值存放到字符串last去
        for (const k in option[i].conName) {
          result[i] = option[i].conName[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].conName[k].isShow = this.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
      }
      for (const item of this.simulatedData.tableData) {
        if (item.specs.toString() == result.toString()) {
          this.specMaxStock = Number(item.stock);
          this.specStock = 1;
        }
      }
      this.$forceUpdate();
    },
    isMay(result) {
      for (const i in result) {
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  }
};
</script>
<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
}

.ulStyle {
  list-style: none;
}

.ulStyle li {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 5px 10px;
  text-align: center;
  color: #606266;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
  margin: 0 10px;
}

.ulStyle li:hover {
  cursor: pointer;
}

.productActive {
  border: 1px solid rgb(255, 61, 31) !important;
  color: #ffffff !important;
  background: rgb(255, 61, 31) !important;
}

.noneActive {
  background-color: #ccc;
  opacity: 0.4;
  color: #000;
}
</style>
<style>
.el-form-item__label {
  font-weight: 600;
}

.wrapper .el-input-number__decrease {
  width: 30px;
}

.el-input-number .el-input__inner {
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
}
</style>
