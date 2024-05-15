import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeronStore = defineStore('heron', () => {
    const n = ref(50);
    const a = ref(1.4);
    const b = ref(0.3);
    let xn = ref([0.0]);
    let yn = ref([0.0]);

    function heron() {
        for(let i = 0; i < n.value; i++){
            xn.value.push(parseFloat((yn.value[i] + 1 - a.value*(xn.value[i]*xn.value[i])).toPrecision(8)))
            yn.value.push(parseFloat((b.value*xn.value[i]).toPrecision(8)))
        }
        return {xn, yn}
    }

    return {heron}
})