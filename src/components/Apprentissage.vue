<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import {NeuralNetwork} from '../classes/NeuralNetwork'
    import type { ErrorPoint } from '@/utils/interfaces';
    import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js'

    Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip)

    const scatterChart = ref<HTMLCanvasElement | null>(null)
    const heron = useHeronStore()
    const epoch = ref(300)
    const arr = computed(() => heron.getArrValues)
    const learningRate = ref(0.1); //taux d'apprentissage
    const neural = ref(new NeuralNetwork(9, 9, 1, learningRate.value, arr.value.map((item) => item.x)))
    const error = ref()
    const errorList = ref<ErrorPoint[]>([])

    onMounted(() => {
        neural.value.train(epoch.value)
        error.value = neural.value.getLearningErrors()
        for (let i = 0; i < error.value.length; i++) {   
            errorList.value.push({
                x: i,
                y: error.value[i]
            })
        }
        console.log(errorList.value)

        //traçcage de l'erreur
        new Chart(scatterChart.value?.getContext('2d') as CanvasRenderingContext2D, {
            type: 'scatter',
            data:  {
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
                        min: -0.65,
                        max: 0.2,
                        title: {
                            display: true,
                            text: 'Axes des y'
                        }
                    },
                    x: {
                        type: 'linear',
                        min: 0,
                        max: 300,
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
        })
        
    })
    

</script>

<template>
    <div class="apprentissage">
        <h1>Apprentissage du réseau</h1>
        <h2>Courbe des erreurs</h2>
        <canvas ref="scatterChart"></canvas>
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
        canvas {
            max-width: 60%;
            height: 30%;
            padding: 0.5rem;
        }
    }
</style>../classes/NeuralNetwork