<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import {NeuralNetwork} from '../classes/NeuralNetwork'
    import type { ErrorPoint } from '@/utils/interfaces';
    import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js'

    Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip)

    const scatterChart = ref<HTMLCanvasElement | null>(null)
    const scatter = ref<HTMLCanvasElement | null>(null)
    const heron = useHeronStore()
    const epoch = ref(100) //100 époque
    const arr = computed(() => heron.getArrValues)
    const learningRate = ref(0.1); //taux d'apprentissage
    const neural = ref(new NeuralNetwork(10, 9, 1, learningRate.value, arr.value.map((item) => item.x)))
    const timeSerie = ref(neural.value.getTimeSerie())
    const error = ref()
    const errorList = ref<ErrorPoint[]>([])
    const predictions = ref<number[]>([])
    const predList = ref<ErrorPoint[]>([])
    const steps = ref(200)

    onMounted(() => {
        neural.value.train(epoch.value)
        error.value = neural.value.getLearningErrors()
        //console.log(error.value)
        //mapping des valeurs de la liste d'erreur  pour le traçcage
        for (let i = 0; i < error.value.length; i++) {   
            errorList.value.push({
                x: i,
                y: error.value[i]
            })
        }
        // prédiction
        for (let i = 0; i < 200; i++) {
            const nextPrediction = neural.value.predict(timeSerie.value.slice(300 + i, 500), steps.value)[i]
            predictions.value.push(nextPrediction)
        } 

        for (let i = 0; i < predictions.value.length; i++) {   
            predList.value.push({
                x: predictions.value[i],
                y: arr.value.slice(300, 500)[i].y
            })
        }  

        predList.value = arr.value.slice(0, 300).concat(predList.value)
        console.log(predList.value)

        new Chart(scatter.value?.getContext('2d') as CanvasRenderingContext2D, {
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
        })

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
        })    
    })
    

</script>

<template>
    <div class="apprentissage">
        <h1>Apprentissage et prédiction</h1>
        <h4>Courbe des erreurs à gauche, prédictions à droite en bleu</h4>
        <div class="trace">
            <canvas ref="scatterChart"></canvas>
            <canvas ref="scatter"></canvas>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/mixing';

    .apprentissage {
        @include setFlex(flex-start, center, column);
        width: 100%;
        height: 200vh;
        padding: 0.5rem;
        h1 {
            padding: 0.25rem 2rem;
            margin-top: 0.5rem;
            font-size: 36px;
          /*   background-color: rgb(8, 119, 216); */
        }
        .trace {
            @include setFlex(center, space-evenly, row);
            width: 100%;
            height: 100%;
            canvas {
                max-width: 50%;
                max-height: 600px;
                padding: 0.5rem;
            }
        }
    }
</style>../classes/NeuralNetwork