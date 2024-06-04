<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import {NeuralNetwork} from '../classes/NeuralNetwork'
    import type { ErrorPoint } from '@/utils/interfaces';

    const heron = useHeronStore()
    const arr = computed(() => heron.getArrValues)
    const learningRate = ref(0.1); //taux d'apprentissage
    const neural = ref(new NeuralNetwork(9, 9, 1, learningRate.value, arr.value.map((item) => item.x)))
    const prototypes = ref(neural.value.getPrototype())
    const errorPoints = ref<ErrorPoint[]>(neural.value.train())

    onMounted(() => {
        console.log(errorPoints.value) 
        
    })
    

</script>

<template>
    <div class="apprentissage">
        <h1>Apprentissage du réseau</h1>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/mixing';

    .apprentissage {
        @include setFlex(flex-start, center, column);
        width: 100%;
        height: 100vh;
        padding: 0.5rem;
        h1 {
            padding: 0.25rem 2rem;
            margin-top: 0.5rem;
            font-size: 36px;
        }
    }
</style>../classes/NeuralNetwork