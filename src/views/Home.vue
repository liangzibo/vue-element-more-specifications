<template>
    <div>
        <el-form label-width="120px" @submit.native.prevent>
            <el-form-item label="规格组和规格值">
                <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium" placeholder="请输入内容" v-model="specName" style="width: 400px" @keyup.enter.native="createdSpecifi">
                    <template slot="prepend">规格组</template>
                    <el-button slot="append" @click="createdSpecifi">设置</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label style="margin: 10px 0 20px 0">
                <div class="introTitle" v-for="(tab, indexs) in specArr" :key="indexs">
                    <span class="fontWidth">{{tab.name}}</span>
                    <span class="delete clear" @click="clearSpe(indexs)">×</span>
                    <div class="introCon">
                        <ul>
                            <li v-for="(val, index) in tab.conName" :key="index">
                                <span>{{val}}</span>
                                <span class="delete" @click="clearSpecif(indexs, index)">×</span>
                            </li>
                            <li>
                                <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="small" placeholder="请输入内容" v-model="tab.addField" @keyup.enter.native="clickSpecVal(indexs, tab.addField)">
                                    <template slot="prepend">规格值</template>
                                    <el-button slot="append" @click="clickSpecVal(indexs, tab.addField)">设置</el-button>
                                </el-input>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="批量设置" style="margin-bottom: 20px" v-if="tableData.length > 0">
                <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium" placeholder="请输入库存" v-model="setStock" style="width: 250px;margin-right: 20px"
                          @keyup.native="proving(1)">
                    <template slot="prepend">库存</template>
                    <el-button slot="append" @click="clicksSet(1)">设置</el-button>
                </el-input>
                <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" size="medium" placeholder="请输入单价" v-model="setPrice" style="width: 250px;margin-right: 20px"
                          @keyup.native="proving(2)">
                    <template slot="prepend">单价</template>
                    <el-button slot="append" @click="clicksSet(2)">设置</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="价格和库存" v-if="tableData.length > 0">
                <el-table :data="tableData" border>
                    <el-table-column prop="name" label="名称" align="center"/>
                    <el-table-column v-for="(item, index) in specArr" :key="index" :label="item.name" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.specs[index] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stock" label="库存" align="center">
                        <template slot-scope="scope">
                            <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="scope.row.stock"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价" align="center">
                        <template slot-scope="scope">
                            <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sku" label="sku" align="center">
                        <template slot-scope="scope">
                            <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="scope.row.sku"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spu" label="spu" align="center">
                        <template slot-scope="scope">
                            <el-input onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="scope.row.spu"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="picture" label="图片" align="center"/>
                </el-table>
            </el-form-item>
              <!-- <p>{{specArr}}</p> -->
              <!--<p>{{allData}}</p>-->
              <!--<p>{{tableData}}</p>-->
        </el-form>
    </div>
</template>

<script>
    import descartes from "../utli/descartes";

    const defaultTable = {
        specs: [],
        name: "奶粉",
        stock: "0",
        price: "0",
        picture: "",
        sku: "",
        spu: ""
    };
    export default {
        name: "Home",
        data() {
            return {
                specName: "",
                specArr: [],
                specContent: {},
                tableData: [],
                changeTableData: [],
                allData: [],
                setStock: "",
                setPrice: ""
            };
        },
        created() {
            const storeTableData = this.$store.state.tableData
            const storeSpecArr = this.$store.state.specArr
            if (storeTableData !== '' && storeSpecArr !== '') {
                this.tableData = storeTableData
                this.specArr = storeSpecArr
            }
        },
        methods: {
            descartes,
            // 点击添加规格组
            createdSpecifi() {
                if (this.specName) {
                    const data = {
                        name: "",
                        conName: [],
                        addField: ''
                    };
                    this.specContent = Object.assign({}, data);
                    this.specContent.name = this.specName;
                    this.specContent.conName = [];
                    this.specArr.push(this.specContent);
                    let obj = {};
                    this.specArr = this.specArr.reduce((cur, next) => {
                        obj[next.name] ? "" : (obj[next.name] = true && cur.push(next));
                        return cur;
                    }, []);
                    this.specName = "";
                    this.$store.dispatch("getSpecArr", this.specArr);
                }
            },
            // 点击添加规格值
            clickSpecVal(indexs, name) {
                if (name) {
                    this.specArr[indexs].conName.push(name);
                    this.specArr[indexs].conName = [
                        ...new Set(this.specArr[indexs].conName)
                    ];
                    for(const val in this.specArr) {
                        if(this.specArr[val].conName.length === 0) {
                            this.changeTableData[val] = ['']
                        } else {
                            this.changeTableData[val] = this.specArr[val].conName
                        }
                    }
                    this.changeDataTable(this.changeTableData, this.specArr);
                    this.specArr[indexs].addField = "";
                    this.$store.dispatch("getSpecArr", this.specArr);
                }
            },
            // 删除规格组
            clearSpe(indexs) {
                this.specArr.splice(indexs, 1);
                this.changeTableData = [];
                for (const item of this.specArr) {
                    this.changeTableData.push(item.conName);
                }
                this.changeDataTable(this.changeTableData, this.specArr);
                this.$store.dispatch("getSpecArr", this.specArr);
            },
            // 删除规格值
            clearSpecif(indexs, index) {
                this.specArr[indexs].conName.splice(index, 1);
                this.changeTableData[indexs] = this.specArr[indexs].conName;
                for (const item in this.changeTableData) {
                    if (this.changeTableData[item].length === 0) {
                        this.changeTableData.splice(item, 1);
                    }
                }
                this.changeDataTable(this.changeTableData, this.specArr);
                this.$store.dispatch("getSpecArr", this.specArr);
            },
            // 整理数据
            changeDataTable(m, n) {
                this.tableData = []
                this.allData = descartes(m);
                if (n.length > 1) {
                    for (const i in this.allData) {
                        const dataArr = Object.assign({}, defaultTable);
                        if (typeof this.allData[i] === "string") {
                            dataArr.specs[i] = this.allData[i];
                        } else {
                            dataArr.specs = this.allData[i];
                        }
                        this.tableData.push(dataArr);
                        this.$store.dispatch("getTableData", this.tableData);
                    }
                } else {
                    for (const i in this.allData) {
                        const dataArr = Object.assign({}, defaultTable);
                        dataArr.specs = [this.allData[i]];
                        this.tableData.push(dataArr);
                        this.$store.dispatch("getTableData", this.tableData);
                    }
                }
            },
            clicksSet(name) {
                for (const item of this.tableData) {
                    if (name === 1 && this.setStock != '') {
                        item.stock = this.setStock;
                    } else if (name === 2 && this.setPrice != '') {
                        item.price = this.setPrice;
                    }
                }
            },
            proving(num) {
                if (num === 1) {
                    this.setStock = this.setStock.replace(/[^\.\d]/g, "");
                    this.setStock = this.setStock.replace(".", "");
                } else if (num === 2) {
                    this.setPrice = this.setPrice.replace(/[^\.\d]/g, "");
                    this.setPrice = this.setPrice.replace(".", "");
                }
            }
        }
    };
</script>
<style scoped>
    html,
    body,
    div,
    span,
    p,
    i,
    ul,
    li {
        margin: 0;
        padding: 0;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .introTitle {
        border: 1px solid rgb(238, 238, 238);
        padding-left: 10px;
        padding-top: 10px;
        line-height: 30px;
        margin-bottom: 10px;
    }

    .fontWidth {
        font-weight: 500;
        font-size: 16px;
        display: inline-block;
        padding: 0 10px;
        vertical-align: middle;
    }

    .introTitle i {
        cursor: pointer;
    }

    .introCon ul {
        list-style: none;
        padding: 5px 0 10px 0;
    }

    .introCon ul li {
        display: inline-block;
        margin: 5px 10px;
        background-color: rgb(238, 238, 238);
        line-height: 30px;
    }

    .introCon ul li:last-child {
        background-color: #ffffff;
        width: 300px;
    }

    .introCon ul li span:nth-child(1) {
        display: inline-block;
        padding: 0 10px;
        text-align: center;
    }

    .introCon ul li span:nth-child(2) {
        display: inline-block;
        width: 30px;
        background-color: rgb(211, 207, 208);
        text-align: center;
    }

    .delete {
        color: #ffffff;
        cursor: pointer;
    }

    .clear {
        background-color: rgb(238, 238, 238);
        display: inline-block;
        width: 15px;
        line-height: 15px;
        height: 15px;
        vertical-align: middle;
        border-radius: 50%;
        text-align: center;
    }

</style>
