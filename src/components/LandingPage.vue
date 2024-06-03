<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import TraceXY from './TraceXY.vue';
    import Architecture from './Architecture.vue';
    import Apprentissage from './Apprentissage.vue';

    const heron = useHeronStore()
    const heronObject = computed(() =>  heron.heron() )  
    const arr = heronObject.value.arr.value

    onMounted(() => {

    })

</script>

<template>
    <div class="landing">
    <h1>Mini projet RNA.</h1>
        <div class="first_value">
        <span></span>
            <div class="xnvalue">
                <h4 class="serie_title">500 premiers valeurs de Xn</h4>
                <ul class="value_list">
                    <li v-for="x in arr" :key="x.x"  class="value_item">{{x.x}}&nbsp;</li>
                </ul>
            </div>
            <div class="xnvalue">
                <h4 class="serie_title">500 premiers valeurs de Yn</h4>
                <ul class="value_list">
                    <li v-for="y in arr" :key="y.y"  class="value_item">{{y.y}}&nbsp;</li>
                </ul>
            </div>
        </div>
        <div class="trace">
            <TraceXY/>
        </div>
        <div class="arch">
            <Architecture/>
        </div>
        <div class="arch">
            <Apprentissage/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/_mixing.scss';
    .landing{
        @include setFlex(center, center, column);
        width: 100%;
        height: auto;
        padding: 0 2rem;
        overflow: hidden;

        h1 {
            padding: 1rem 2rem;
            margin: 1rem;
            font-size: 36px;
        }
        .first_value {
            @include setFlex(space-evenly, flex-start, row);
            width: 100%;
            height: fit-content;
            padding-bottom: 1rem;
            position: relative;
            overflow-x: hidden;
            span {
                position: absolute;
                left: 50%;
                top: 0%;
                transform: translateX(-50%);
                width: 2px;
                height: 100%;
                z-index: 1;
                background-color: white;
            }
            .xnvalue{
                @include setFlex(flex-start, center, column);
                width: 50%;
                padding: 1rem;
                .serie_title {
                    font-size: 24px;
                    text-decoration: underline;
                    margin: 1rem;
                    padding: 0.5rem 1rem;
                }
                .value_list {
                    @include setFlex(flex-start, flex-start, row);
                    @include flexing();
                    list-style-type: none;
                    .value_item {
                        width: fit-content;
                        height: fit-content;
                        padding: 0.25rem 0.5rem;
                        margin: 0.5rem ;
                    }
                }
            }
        }
        .trace {
            width: 100%;
            height: 100vh;
        }
        .arch {
            width: 100%;
            height: 100vh;
        }
    }

</style>