import { ref, computed, onMounted } from 'vue';
import { useHeronStore } from '@/stores/heron';
import { NeuralNetwork } from '../classes/NeuralNetwork';
import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip);
const scatterChart = ref(null);
const scatter = ref(null);
const heron = useHeronStore();
const epoch = ref(100); //100 époque
const arr = computed(() => heron.getArrValues);
const learningRate = ref(0.1); //taux d'apprentissage
const neural = ref(new NeuralNetwork(10, 9, 1, learningRate.value, arr.value.map((item) => item.x)));
const timeSerie = ref(neural.value.getTimeSerie());
const error = ref();
const errorList = ref([]);
const predictions = ref([]);
const predList = ref([]);
const steps = ref(200);
onMounted(() => {
    neural.value.train(epoch.value);
    error.value = neural.value.getLearningErrors();
    //console.log(error.value)
    //mapping des valeurs de la liste d'erreur  pour le traçcage
    for (let i = 0; i < error.value.length; i++) {
        errorList.value.push({
            x: i,
            y: error.value[i]
        });
    }
    // prédiction
    for (let i = 0; i < 200; i++) {
        const nextPrediction = neural.value.predict(timeSerie.value.slice(300 + i, 500), steps.value)[i];
        predictions.value.push(nextPrediction);
    }
    for (let i = 0; i < predictions.value.length; i++) {
        predList.value.push({
            x: predictions.value[i],
            y: arr.value.slice(300, 500)[i].y
        });
    }
    predList.value = arr.value.slice(0, 300).concat(predList.value);
    console.log(predList.value);
    new Chart(scatter.value?.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Scatter datasets',
                    data: arr.value,
                    backgroundColor: 'rgb(255, 99, 132)'
                },
                {
                    label: 'Scatter data',
                    data: predList.value,
                    backgroundColor: 'rgb(54, 162, 235)'
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -1.5,
                    max: 1.5,
                    title: {
                        display: true,
                        text: 'Axes des X'
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
            }
        }
    });
    //traçcage de l'erreur
    new Chart(scatterChart.value?.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Scatter datasets',
                    data: errorList.value,
                    backgroundColor: 'rgb(63, 255, 127)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    type: 'linear',
                    min: 0,
                    max: 1,
                    title: {
                        display: true,
                        text: 'Axes des y'
                    }
                },
                x: {
                    type: 'linear',
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Axes des x'
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
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.canvas;
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("apprentissage"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("apprentissage"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["h1"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_10 = __VLS_intrinsicElements["h4"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ ...{}, }));
            (__VLS_13.slots).default;
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
        }
        {
            const __VLS_15 = __VLS_intrinsicElements["div"];
            const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
            const __VLS_17 = __VLS_16({ ...{}, class: ("trace"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({}({ ...{}, class: ("trace"), }));
            {
                const __VLS_20 = __VLS_intrinsicElements["canvas"];
                const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                const __VLS_22 = __VLS_21({ ...{}, ref: ("scatterChart"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                ({}({ ...{}, ref: ("scatterChart"), }));
                // @ts-ignore
                (__VLS_ctx.scatterChart);
                const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
            }
            {
                const __VLS_25 = __VLS_intrinsicElements["canvas"];
                const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                const __VLS_27 = __VLS_26({ ...{}, ref: ("scatter"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                ({}({ ...{}, ref: ("scatter"), }));
                // @ts-ignore
                (__VLS_ctx.scatter);
                const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
            }
            (__VLS_18.slots).default;
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["apprentissage"];
        __VLS_styleScopedClasses["trace"];
    }
    var __VLS_slots;
    // @ts-ignore
    [scatterChart, scatter,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            scatterChart: scatterChart,
            scatter: scatter,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
