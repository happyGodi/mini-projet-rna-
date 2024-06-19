import { computed, onMounted } from 'vue';
import { useHeronStore } from '@/stores/heron';
import TraceXY from './TraceXY.vue';
import Architecture from './Architecture.vue';
import Apprentissage from './Apprentissage.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const heron = useHeronStore();
const heronObject = computed(() => heron.heron());
const arr = heronObject.value.arr.value;
onMounted(() => {
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
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.h1;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.h4;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.ul;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_intrinsicElements.li;
    __VLS_components.TraceXY;
    __VLS_components.TraceXY;
    // @ts-ignore
    [TraceXY,];
    __VLS_components.Architecture;
    __VLS_components.Architecture;
    // @ts-ignore
    [Architecture,];
    __VLS_components.Apprentissage;
    __VLS_components.Apprentissage;
    // @ts-ignore
    [Apprentissage,];
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("landing"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("landing"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["h1"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_10 = __VLS_intrinsicElements["div"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, class: ("first_value"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ ...{}, class: ("first_value"), }));
            {
                const __VLS_15 = __VLS_intrinsicElements["span"];
                const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                const __VLS_17 = __VLS_16({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                ({}({ ...{}, }));
                const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
            }
            {
                const __VLS_20 = __VLS_intrinsicElements["div"];
                const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                const __VLS_22 = __VLS_21({ ...{}, class: ("xnvalue"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                ({}({ ...{}, class: ("xnvalue"), }));
                {
                    const __VLS_25 = __VLS_intrinsicElements["h4"];
                    const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                    const __VLS_27 = __VLS_26({ ...{}, class: ("serie_title"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                    ({}({ ...{}, class: ("serie_title"), }));
                    (__VLS_28.slots).default;
                    const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
                }
                {
                    const __VLS_30 = __VLS_intrinsicElements["ul"];
                    const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
                    const __VLS_32 = __VLS_31({ ...{}, class: ("value_list"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                    ({}({ ...{}, class: ("value_list"), }));
                    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.arr))) {
                        {
                            const __VLS_35 = __VLS_intrinsicElements["li"];
                            const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
                            const __VLS_37 = __VLS_36({ ...{}, key: ((x.x)), class: ("value_item"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                            ({}({ ...{}, key: ((x.x)), class: ("value_item"), }));
                            (x.x);
                            (__VLS_38.slots).default;
                            const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
                        }
                        // @ts-ignore
                        [arr,];
                    }
                    (__VLS_33.slots).default;
                    const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                }
                (__VLS_23.slots).default;
                const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
            }
            {
                const __VLS_40 = __VLS_intrinsicElements["div"];
                const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
                const __VLS_42 = __VLS_41({ ...{}, class: ("xnvalue"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                ({}({ ...{}, class: ("xnvalue"), }));
                {
                    const __VLS_45 = __VLS_intrinsicElements["h4"];
                    const __VLS_46 = __VLS_elementAsFunctionalComponent(__VLS_45);
                    const __VLS_47 = __VLS_46({ ...{}, class: ("serie_title"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
                    ({}({ ...{}, class: ("serie_title"), }));
                    (__VLS_48.slots).default;
                    const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
                }
                {
                    const __VLS_50 = __VLS_intrinsicElements["ul"];
                    const __VLS_51 = __VLS_elementAsFunctionalComponent(__VLS_50);
                    const __VLS_52 = __VLS_51({ ...{}, class: ("value_list"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                    ({}({ ...{}, class: ("value_list"), }));
                    for (const [y] of __VLS_getVForSourceType((__VLS_ctx.arr))) {
                        {
                            const __VLS_55 = __VLS_intrinsicElements["li"];
                            const __VLS_56 = __VLS_elementAsFunctionalComponent(__VLS_55);
                            const __VLS_57 = __VLS_56({ ...{}, key: ((y.y)), class: ("value_item"), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
                            ({}({ ...{}, key: ((y.y)), class: ("value_item"), }));
                            (y.y);
                            (__VLS_58.slots).default;
                            const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57);
                        }
                        // @ts-ignore
                        [arr,];
                    }
                    (__VLS_53.slots).default;
                    const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
                }
                (__VLS_43.slots).default;
                const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
            }
            (__VLS_13.slots).default;
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
        }
        {
            const __VLS_60 = __VLS_intrinsicElements["div"];
            const __VLS_61 = __VLS_elementAsFunctionalComponent(__VLS_60);
            const __VLS_62 = __VLS_61({ ...{}, class: ("trace"), }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            ({}({ ...{}, class: ("trace"), }));
            {
                const __VLS_65 = {}.TraceXY;
                const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({ ...{}, }));
                ({}.TraceXY);
                const __VLS_67 = __VLS_66({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_66));
                ({}({ ...{}, }));
                const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_65, __VLS_67);
            }
            (__VLS_63.slots).default;
            const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
        }
        {
            const __VLS_70 = __VLS_intrinsicElements["div"];
            const __VLS_71 = __VLS_elementAsFunctionalComponent(__VLS_70);
            const __VLS_72 = __VLS_71({ ...{}, class: ("arch"), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
            ({}({ ...{}, class: ("arch"), }));
            {
                const __VLS_75 = {}.Architecture;
                const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ ...{}, }));
                ({}.Architecture);
                const __VLS_77 = __VLS_76({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
                ({}({ ...{}, }));
                const __VLS_78 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77);
            }
            (__VLS_73.slots).default;
            const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
        }
        {
            const __VLS_80 = __VLS_intrinsicElements["div"];
            const __VLS_81 = __VLS_elementAsFunctionalComponent(__VLS_80);
            const __VLS_82 = __VLS_81({ ...{}, class: ("arch"), }, ...__VLS_functionalComponentArgsRest(__VLS_81));
            ({}({ ...{}, class: ("arch"), }));
            {
                const __VLS_85 = {}.Apprentissage;
                const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({ ...{}, }));
                ({}.Apprentissage);
                const __VLS_87 = __VLS_86({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_86));
                ({}({ ...{}, }));
                const __VLS_88 = __VLS_pickFunctionalComponentCtx(__VLS_85, __VLS_87);
            }
            (__VLS_83.slots).default;
            const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["landing"];
        __VLS_styleScopedClasses["first_value"];
        __VLS_styleScopedClasses["xnvalue"];
        __VLS_styleScopedClasses["serie_title"];
        __VLS_styleScopedClasses["value_list"];
        __VLS_styleScopedClasses["value_item"];
        __VLS_styleScopedClasses["xnvalue"];
        __VLS_styleScopedClasses["serie_title"];
        __VLS_styleScopedClasses["value_list"];
        __VLS_styleScopedClasses["value_item"];
        __VLS_styleScopedClasses["trace"];
        __VLS_styleScopedClasses["arch"];
        __VLS_styleScopedClasses["arch"];
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            TraceXY: TraceXY,
            Architecture: Architecture,
            Apprentissage: Apprentissage,
            arr: arr,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
