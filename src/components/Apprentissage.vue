<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import {NeuralNetwork} from '../classes/NeuralNetwork'
    import type { ErrorPoint } from '@/utils/interfaces';
    import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js'

    Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip)

    const scatterChart = ref<HTMLCanvasElement | null>(null)
    const heron = useHeronStore()
    const epoch = ref(500)
    const arr = computed(() => heron.getArrValues)
    const learningRate = ref(0.1); //taux d'apprentissage
    const neural = ref(new NeuralNetwork(10, 9, 1, learningRate.value, arr.value.map((item) => item.x)))
    const timeSerie = ref(neural.value.getTimeSerie())
    const error = ref()
    const errorList = ref<ErrorPoint[]>([])
    const predictions = ref<number[]>(timeSerie.value.slice(0, 300))
    const predList = ref<ErrorPoint[]>([])
    const steps = ref(1)

    onMounted(() => {
        neural.value.train(epoch.value)
        error.value = neural.value.getLearningErrors()
        //mapping des valeurs de la liste d'erreur  pour le traçcage
        for (let i = 0; i < error.value.length; i++) {   
            errorList.value.push({
                x: i,
                y: error.value[i]
            })
        }
        //première prédiction à 1 pas
        predictions.value.push(neural.value.predict(timeSerie.value.slice(300, 500), steps.value)[0])
        
       for (let i = 0; i < 199; i++) {
            //utilise la dernière valeure prédite
            const newInput = predictions.value
            //console.log({p: predictions.value[predictions.value.length - 1], i: predictions.value.length - 1})
            const nextPrediction = neural.value.predict(newInput, steps.value)[0]
            //console.log(nextPrediction)
            predictions.value.push(nextPrediction)
        } 


        for (let i = 0; i < predictions.value.length; i++) {   
            predList.value.push({
                x: predictions.value[i],
                y: i
            })
        }

        console.log(predList.value)

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
                        max: 500,
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
        <div class="trace">
            <canvas ref="scatterChart"></canvas>
        </div>
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
          /*   background-color: rgb(8, 119, 216); */
        }
        .trace {
            @include setFlex(flex-start, center, row);
            width: 100%;
            height: auto;
            canvas {
                max-width: 50%;
                height: 30%;
                padding: 0.5rem;
            }
        }
    }
</style>../classes/NeuralNetwork