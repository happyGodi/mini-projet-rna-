<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js'

    Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip)

    const heron = useHeronStore()
    const arr = computed(() => heron.getArrValues)
    const scatterChart = ref<HTMLCanvasElement | null>(null)
    

    onMounted(() => {

        new Chart(scatterChart.value?.getContext('2d') as CanvasRenderingContext2D, {
            type: 'scatter',
            data:  {
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
        })
    })

</script>

<template>
    <div class="trace">
        <h1>Tracé de Yn en fonction de Xn</h1>
        <h3>Zoomez si les valeurs sont trop dificilles à lire</h3>
        <canvas ref="scatterChart"></canvas>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/mixing';
    .trace {
        @include setFlex(center, center, column);
        width: 100%;
        height: 100%;
        padding: 1rem 2rem;
        overflow: hidden;
        h1 {
            padding: 0.25rem 2rem;
            margin-top: 0.5rem;
            font-size: 36px;
        }
        h3 {
            padding: 0.25rem 2rem;
            margin-bottom: 0.5rem;
            font-size: 20px;
        }
        .chart {
            width: 100%;
            height: 70%;
        }

        canvas {
            max-width: 90%;
            max-height: 70%;
        }
    }
</style>