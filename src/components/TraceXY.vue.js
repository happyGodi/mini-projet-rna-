import { computed, onMounted, ref } from 'vue';
import { useHeronStore } from '@/stores/heron';
import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip);
const heron = useHeronStore();
const arr = computed(() => heron.getArrValues);
const scatterChart = ref(null);
onMounted(() => {
    new Chart(scatterChart.value?.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Scatter datasets',
                    data: arr.value,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    min: -1.5,
                    max: 1.5,
                    title: {
                        display: true,
                        text: 'Axes des x'
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.4,
                    max: 0.4,
                    title: {
                        display: true,
                        text: 'Axes des y'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: '#f8f8f8'
                    }
                },
            }
        }
    });
});
let __VLS_modelEmitsType;
const __VLS_componentsOption = {};
let __VLS_name;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    /* CSS variable injection */
    /* CSS variable injection end */
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h3;
    __VLS_intrinsicElements.h3;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.canvas;
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("trace"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("trace"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["h1"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_10 = __VLS_intrinsicElements["h3"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ ...{}, }));
            (__VLS_13.slots).default;
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
        }
        {
            const __VLS_15 = __VLS_intrinsicElements["canvas"];
            const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
            const __VLS_17 = __VLS_16({ ...{}, ref: ("scatterChart"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({}({ ...{}, ref: ("scatterChart"), }));
            // @ts-ignore
            (__VLS_ctx.scatterChart);
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["trace"];
    }
    var __VLS_slots;
    // @ts-ignore
    [scatterChart,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            scatterChart: scatterChart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
