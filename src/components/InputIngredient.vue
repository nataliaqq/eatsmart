<template>
  <div>
    <div class="input-group">
        Search for food
        <input
            v-model="search"
            placeholder="ex: broccoli raw ..."
            @input="onChangeInput(search)"
        >
        <!-- <div class="arrow"> > </div> -->
    </div>

    <div class="list" v-if="list && list.length > 0">
        <div v-for="item in list" class="list-item" @click="onSelect(item)">
            {{ item.name }}
        </div>
    </div>

    <div class="nutrients" v-if="selectedItemNutrients">
        <div @click="openedList = !openedList" class="link">{{ selectedItem.name }}</div>
        <br>
        <div class="nutList" v-if="openedList">
            <div>For 100 {{ selectedItemNutrients.ru }}</div>
            <div class="table">
                <div v-for="item in selectedItemNutrients.nutrients" class="row">
                    <div class="cell">{{ item.name }}</div>
                    <div class="cell">{{ item.value | round }} {{ item.unit }}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { GeneralApi } from '../api/general'

export default {
    name: 'InputIngredient',
    data () {
        return {
            list: null,
            search: null,
            selectedItem: null,
            selectedItemNutrients: null,
            openedList: false

        }
    },

    computed: {
        selectedItemId () {
            return this.selectedItem.ndbno
        }
    },

    methods: {
        onSelect(item) {
            this.clearNutrients()
            this.clearList()
            this.selectItem(item)
            this.getNutrition({ ndbno: this.selectedItemId })

            .then(response => {
                this.fillNutrients(response.data.report.food)
            })
        },

        selectItem(item) {
           this.selectedItem = item
            
        },

        fillNutrients(val) {
            this.selectedItemNutrients = val
        },

        clearList () {
            this.list = null
        },

        clearNutrients () {
            this.selectedItemNutrients =  null
        },
        onChangeInput (val) {
            this.getList({q: val})
            
            .then(response => {
                this.fillSelect(response.body.list ? response.body.list.item : [])
            })
        },
        getList (params) {
            var api = new GeneralApi()
            return api.search(params)
        },

        fillSelect(val) {
            this.list = val
        },

        getNutrition (params) {
            var api = new GeneralApi()
            return api.getNutrition(params)
        }
    },

    mounted () {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group {
    position: relative;
    margin-bottom: 20px;
}
input {
    padding: 10px;
    font-size: 20px;
    width: 100%;
}

/*.arrow {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}*/
.list {
    max-width: 100%;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
}

.list-item {
    background-color: #ededed;
    padding: 10px;
    border: 1px solid grey;

}

.link {
    text-decoration: underline;
}


.table {
    display: table;
}
.table .row {
    display: table-row;
}
.table .cell {
    padding: 5px;
    border: 1px solid grey;
    display: table-cell;
}

</style>
