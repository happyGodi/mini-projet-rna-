import { ref, computed, onMounted } from 'vue';
import { useHeronStore } from '@/stores/heron';
import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip);
const heron = useHeronStore();
const scatterChart = ref(null);
const tau = 2; //délais de mésure de 1ms
//setp 1: série temporelle
const arr = computed(() => heron.getArrValues);
//setp 2: séquence de vecteur
const target = ref(embedding(arr.value.map((item) => parseFloat((item.x).toPrecision(8))), tau));
//step 3: matrice de covariance
const groupedData = groupData(pairData(target.value), 2); //groupement par 2 
const covMatrix = ref(groupedData.map(group => covarianceMatrix(group))); // matrice de covariance
//step 4: valeurs propres des matrices
const valeurPropres = ref(sortArr(matrixValeurPropre(covMatrix.value)));
//step 5: Calcul des errurs d'approximation
const aproximateErrors = ref(approximateError(valeurPropres.value));
//fonction de calcul de l'erreur d'approximation
function approximateError(valeurPropre) {
    let err = [];
    for (let i = 0; i < valeurPropre.length; i++) {
        err.push({
            x: i,
            y: parseFloat((Math.abs(valeurPropre[i] + 1)).toPrecision(8))
        });
    }
    return err;
}
//fonction de calcul de valeurs propres d'une matrice 2*2
function valeurPropre(matrix) {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    //trace de la matrice
    const trace = a + d;
    //determinant de la matrice
    const determinant = parseFloat(((a * d) - (b * c)).toPrecision(8));
    const discriminant = parseFloat((trace * trace - 4 * determinant).toPrecision(8));
    if (discriminant < 0)
        throw new Error('La matrice possède des valeurs propres complexes');
    const lambda1 = parseFloat(((trace + Math.sqrt(discriminant)) / 2).toPrecision(8));
    const lambda2 = parseFloat(((trace - Math.sqrt(discriminant)) / 2).toPrecision(8));
    return [lambda1, lambda2];
}
//fonction de calcul et stockage de tous les valeurs propres
function matrixValeurPropre(matrices) {
    //prendre uniquement les valeurs propres positives
    return matrices.map(matrix => valeurPropre(matrix)).map((item) => item[0]);
}
//fonction de trie en ordre décroissant
function sortArr(arr) {
    let currentArr = [...arr];
    let sortedArr = [];
    while (currentArr.length > 0) {
        sortedArr.push(Math.max(...currentArr)); //push the max element into the sortedArray
        currentArr.splice(currentArr.indexOf(Math.max(...currentArr)), 1); //removes the max element from the currentArray
    }
    return sortedArr;
}
//fonction de calcul de la moyenne
function mean(arr) {
    return parseFloat((arr.reduce((sum, value) => sum + value, 0) / arr.length).toPrecision(8));
}
//fonction de regrouppement par pair
function pairData(arr) {
    let pairedArray = [];
    for (let i = 0; i < arr.length; i += 2) {
        pairedArray.push([arr[i], arr[i + 1]]);
    }
    return pairedArray;
}
//groupement de donnée
function groupData(data, groupSize) {
    let groupedData = [];
    for (let i = 0; i < data.length; i += groupSize) {
        groupedData.push(data.slice(i, i + groupSize));
    }
    return groupedData;
}
//fonction de calcul de covariance entre deux tableau de nombre avec la formule de covariance
function covariance(x, y) {
    const xMean = mean(x);
    const yMean = mean(y);
    return parseFloat((x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0) / (x.length - 1)).toPrecision(8));
}
//fonction de creation de la matrice de covariance
function covarianceMatrix(data) {
    const x = data.map(row => row[0]);
    const y = data.map(row => row[1]);
    return [
        [covariance(x, x), covariance(x, y)],
        [covariance(y, x), covariance(y, y)]
    ];
}
//fonction de création de séquence de vecteur
function embedding(data, tau) {
    let embedded = [];
    for (let i = 0; i + (i * tau) <= data.length; i++) {
        embedded.push(data[i + (i * tau)]);
    }
    return embedded;
}
onMounted(() => {
    new Chart(scatterChart.value?.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Scatter datasets',
                    data: aproximateErrors.value,
                    backgroundColor: 'rgb(197, 29, 29)',
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: 45,
                    title: {
                        display: true,
                        text: 'Axes des l'
                    }
                },
                y: {
                    type: 'linear',
                    min: 0,
                    max: 4,
                    title: {
                        display: true,
                        text: 'Axes des El'
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
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h2;
    __VLS_intrinsicElements.h2;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.canvas;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.p;
    __VLS_intrinsicElements.br;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("architecture"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("architecture"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["h1"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_10 = __VLS_intrinsicElements["h2"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ ...{}, }));
            (__VLS_13.slots).default;
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
        }
        {
            const __VLS_15 = __VLS_intrinsicElements["div"];
            const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
            const __VLS_17 = __VLS_16({ ...{}, class: ("content"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({}({ ...{}, class: ("content"), }));
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
                const __VLS_25 = __VLS_intrinsicElements["div"];
                const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                const __VLS_27 = __VLS_26({ ...{}, class: ("values"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                ({}({ ...{}, class: ("values"), }));
                {
                    const __VLS_30 = __VLS_intrinsicElements["h4"];
                    const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
                    const __VLS_32 = __VLS_31({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                    ({}({ ...{}, }));
                    (__VLS_33.slots).default;
                    const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                }
                {
                    const __VLS_35 = __VLS_intrinsicElements["ul"];
                    const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
                    const __VLS_37 = __VLS_36({ ...{}, class: ("value_list"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                    ({}({ ...{}, class: ("value_list"), }));
                    for (const [t] of __VLS_getVForSourceType((__VLS_ctx.target))) {
                        {
                            const __VLS_40 = __VLS_intrinsicElements["li"];
                            const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
                            const __VLS_42 = __VLS_41({ ...{}, key: ((t)), class: ("value_item"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                            ({}({ ...{}, key: ((t)), class: ("value_item"), }));
                            (t);
                            (__VLS_43.slots).default;
                            const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
                        }
                        // @ts-ignore
                        [scatterChart, target,];
                    }
                    (__VLS_38.slots).default;
                    const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
                }
                {
                    const __VLS_45 = __VLS_intrinsicElements["h4"];
                    const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
                    const __VLS_47 = __VLS_46({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_46));
                    ({}({ ...{}, }));
                    (__VLS_48.slots).default;
                    const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
                }
                {
                    const __VLS_50 = __VLS_intrinsicElements["ul"];
                    const __VLS_51 = __VLS_elementAsFunctionalComponent(__VLS_50);
                    const __VLS_52 = __VLS_51({ ...{}, class: ("value_list"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                    ({}({ ...{}, class: ("value_list"), }));
                    for (const [err] of __VLS_getVForSourceType((__VLS_ctx.aproximateErrors))) {
                        {
                            const __VLS_55 = __VLS_intrinsicElements["li"];
                            const __VLS_56 = __VLS_elementAsFunctionalComponent(__VLS_55);
                            const __VLS_57 = __VLS_56({ ...{}, key: ((err.x)), class: ("value_item"), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
                            ({}({ ...{}, key: ((err.x)), class: ("value_item"), }));
                            (err.y);
                            (__VLS_58.slots).default;
                            const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57);
                        }
                        // @ts-ignore
                        [aproximateErrors,];
                    }
                    (__VLS_53.slots).default;
                    const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
                }
                {
                    const __VLS_60 = __VLS_intrinsicElements["h4"];
                    const __VLS_61 = __VLS_elementAsFunctionalComponent(__VLS_60);
                    const __VLS_62 = __VLS_61({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
                    ({}({ ...{}, }));
                    (__VLS_63.slots).default;
                    const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
                }
                {
                    const __VLS_65 = __VLS_intrinsicElements["p"];
                    const __VLS_66 = __VLS_elementAsFunctionalComponent(__VLS_65);
                    const __VLS_67 = __VLS_66({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_66));
                    ({}({ ...{}, }));
                    {
                        const __VLS_70 = __VLS_intrinsicElements["br"];
                        const __VLS_71 = __VLS_elementAsFunctionalComponent(__VLS_70);
                        const __VLS_72 = __VLS_71({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_71));
                        ({}({ ...{}, }));
                        const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
                    }
                    {
                        const __VLS_75 = __VLS_intrinsicElements["span"];
                        const __VLS_76 = __VLS_elementAsFunctionalComponent(__VLS_75);
                        const __VLS_77 = __VLS_76({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
                        ({}({ ...{}, }));
                        (__VLS_78.slots).default;
                        const __VLS_78 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77);
                    }
                    (__VLS_68.slots).default;
                    const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_65, __VLS_67);
                }
                {
                    const __VLS_80 = __VLS_intrinsicElements["ul"];
                    const __VLS_81 = __VLS_elementAsFunctionalComponent(__VLS_80);
                    const __VLS_82 = __VLS_81({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_81));
                    ({}({ ...{}, }));
                    {
                        const __VLS_85 = __VLS_intrinsicElements["li"];
                        const __VLS_86 = __VLS_elementAsFunctionalComponent(__VLS_85);
                        const __VLS_87 = __VLS_86({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_86));
                        ({}({ ...{}, }));
                        (__VLS_88.slots).default;
                        const __VLS_88 = __VLS_pickFunctionalComponentCtx(__VLS_85, __VLS_87);
                    }
                    {
                        const __VLS_90 = __VLS_intrinsicElements["li"];
                        const __VLS_91 = __VLS_elementAsFunctionalComponent(__VLS_90);
                        const __VLS_92 = __VLS_91({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_91));
                        ({}({ ...{}, }));
                        (__VLS_93.slots).default;
                        const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92);
                    }
                    {
                        const __VLS_95 = __VLS_intrinsicElements["li"];
                        const __VLS_96 = __VLS_elementAsFunctionalComponent(__VLS_95);
                        const __VLS_97 = __VLS_96({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_96));
                        ({}({ ...{}, }));
                        (__VLS_98.slots).default;
                        const __VLS_98 = __VLS_pickFunctionalComponentCtx(__VLS_95, __VLS_97);
                    }
                    (__VLS_83.slots).default;
                    const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
                }
                (__VLS_28.slots).default;
                const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
            }
            (__VLS_18.slots).default;
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["architecture"];
        __VLS_styleScopedClasses["content"];
        __VLS_styleScopedClasses["values"];
        __VLS_styleScopedClasses["value_list"];
        __VLS_styleScopedClasses["value_item"];
        __VLS_styleScopedClasses["value_list"];
        __VLS_styleScopedClasses["value_item"];
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            scatterChart: scatterChart,
            target: target,
            aproximateErrors: aproximateErrors,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
