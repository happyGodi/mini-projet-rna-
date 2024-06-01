import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { ex } from '../utils/interfaces';

export const useHeronStore = defineStore('heron', () => {
    const n = ref(500);
    const a = ref(1.4);
    const b = ref(0.3);
  
    let arr = ref<Array<ex>>([{
        x: 0.0,
        y: 0.0
    }])
    function heron() {
        for(let i = 0; i <= n.value; i++){
            arr.value.push({
                x: parseFloat((arr.value[i].y + 1 - a.value*(arr.value[i].x*arr.value[i].x)).toPrecision(8)),
                y: parseFloat((b.value*arr.value[i].x).toPrecision(8))
            })
        }
        return {arr}
    }
    const getArrValues = computed(() => arr.value);
    return {heron, getArrValues}
})