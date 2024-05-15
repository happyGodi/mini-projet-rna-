<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import { DoughnutChart, LineChart, BarChart, BubbleChart } from 'vue-chart-3'
    import { Chart, registerables } from 'chart.js'

    Chart.register(...registerables)

    const heron = useHeronStore()
    const heronObject = computed(() =>  heron.heron() )  
    const xn = ref(heronObject.value.xn.value) 
    const yn = ref(heronObject.value.yn.value)
    
    onMounted(() => {
        console.log()
    })
    const testChart = {
        labels: xn.value, //x axis
        datasets: [
            {
                label: 'Tracé de Yn en fonction de Xn',
                data: yn.value,
                backgroundColor: '#77ceff',
                borderColor: '#77ceff',
                borderWidth: 1,
                tension: 0.5,
                pointRadius: 0,
            }
        ]
    }
    const options = ref({
        scales: {
           x: {
            title: {
                display: true,
                text: 'Axes des x'
            }
           },
           y: {
            title: {
                display: true,
                text: 'Axes des y'
            }
           }
        },
        responsive: true,
        title: {
            display: true,
            text: 'Tracée de Yn en fonction de Xn',
        }
    })
</script>

<template>
    <div class="trace">
        <h1>Tracée de Yn en fonction de Xn</h1>
        <h3>Zoomez si les valeurs sont trop petites</h3>
        <LineChart class="chart" :chart-data="testChart" :options="options"/>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/mixing';
    .trace {
        @include setFlex(center, center, column);
        width: 100%;
        height: 100%;
        padding: 0 2rem;
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
    }
</style>