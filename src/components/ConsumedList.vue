<template>
 <div>
    <div v-if="consumedList.length <= 0" class="flex-center">
        Your daily list is empty. Add some food.
    </div>
    <div v-if="consumedList.length > 0">
        You consumed within last 24 h:
        <div v-for="item in consumedListSorted"> 
            <div class="flex">
                <div class="">
                    {{ item.name }} - {{ item.value }}g/ml
                </div>
                <div class="remove" @click="remove(item)">
                    x
                </div>
            </div>
            <div v-if="item.time">at {{ item.time | formatTime }}</div>
        </div>

    </div>

    <br>
    
    <div v-if="totalWithDaily.length > 0">
        Your total nutrients / daily recommended / %
        <div class="table">
            <div v-for="item in totalNutrients" class="row"> 
                <div class="cell">{{ item.name }}</div>
                <div
                    class="cell"
                    :class="{ 'red': isRed(item), 'green': isGreen(item) }"
                >
                    {{ item.val | round }} {{ item.unit }}
                </div>
                <div class="cell" v-if="item.daily_val">
                    {{ item.daily_val | round }} {{ item.ru }}
                </div>
                <div class="cell" v-if="item.daily_val && item.daily_val > 0">
                    {{ item.val / item.daily_val * 100 | round }}%
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import daily from '../data/daily.json' 
import { generalMixin } from '../mixins/general'

export default {
    name: 'ConsumedList',
    data () {
        return {
            daily: daily
        }
    },

    props: {
        consumedList: {
            type: Array,
            default () {
                return []
            }
        }
    },

    mixins: [
        generalMixin
    ],

    computed: {
        totalNutrients () {
            const findField = (name, value) => value.nutrients.find(r => r.name.toLowerCase() === name.toLowerCase()) 
            const findNut = (name, value) => {
              if (!findField(name, value)) return 0
              return +findField(name, value).val
            }
            const reducer = (sum, item) => {
              sum.forEach(r => r.val += findNut(r.name, item))
              return sum
            }
            return this.consumedList.reduce(reducer, this.emptyArray)
        },

        totalWithDaily () {
            return this.totalNutrients.map(r => {
                const findField = (name) => this.daily.find(a => a.name.toLowerCase() === name.toLowerCase())
                r.daily_val =  findField(r.name) ? findField(r.name).daily_val : 0
                r.consume =  findField(r.name) ? findField(r.name).consume : ''
                r.ru =  findField(r.name) ? findField(r.name).ru : ''
            })
        },

        consumedListSorted () {
            return this.consumedList.sort((a, b) => {
              return a.time - b.time
            })
        },

        // consumedListWithDaily () {
        //     return this.consumedList.map(r =>
        //         r.daily_val = this.daily[r.name] ? this.daily[r.name] : 'ND'
        //     )
        // }

        emptyArray () {
            var nutrients = []
            this.consumedList.forEach(r => r.nutrients.forEach(b => {
              if (!nutrients.find(c => c.name.toLowerCase() === b.name.toLowerCase())) nutrients.push({ name: b.name, unit: b.unit })
            }))
            return nutrients.map(r => r = { name: r.name, val: 0, unit: r.unit })
        }
    },

    methods: {
        remove (item) {
            this.$emit('remove', item)
        },

        isRed(item) {
            return !this.isGreen(item)
        },

        isGreen(item) {
            if (!item.consume) return
            if (!item.consume.includes('-')) return
            var min = +item.consume.split('-')[0]
            var max = +item.consume.split('-')[1]
            return item.val >= min && item.val <= max
        }
    },

    mounted () {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input.small {
    width: auto;
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

.inline {
    display: inline-block;
}

.remove {
    font-size: 25px;
    font-weight: bold;
    color: red;
    margin-left: auto;
    padding: 10px;
    margin-right: -10px;
}

.red {
    color: red;
}

.green {
    color: green;
}

.flex {
    display: flex;
    align-items: center;
}
</style>
