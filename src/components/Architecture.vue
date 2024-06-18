<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import { Chart, Legend, registerables, ScatterController, PointElement, LinearScale, Title, Tooltip } from 'chart.js'

    Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip)

    interface Trace {
        x: number,
        y: number
    }

    const heron = useHeronStore()
    const scatterChart = ref<HTMLCanvasElement | null>(null)
    const tau = 2 //délais de mésure de 1ms
    //setp 1: série temporelle
    const arr = computed(() => heron.getArrValues)
    //setp 2: séquence de vecteur
    const target = ref(embedding(arr.value.map((item) =>  parseFloat((item.x).toPrecision(8))), tau))
    //step 3: matrice de covariance
    const groupedData = groupData(pairData(target.value), 2) //groupement par 2 
    const covMatrix = ref(groupedData.map(group => covarianceMatrix(group))) // matrice de covariance
    //step 4: valeurs propres des matrices
    const valeurPropres = ref(sortArr(matrixValeurPropre(covMatrix.value)))
    //step 5: Calcul des errurs d'approximation
    const aproximateErrors = ref(approximateError(valeurPropres.value))

    //fonction de calcul de l'erreur d'approximation
    function approximateError(valeurPropre: number[]): Trace[] {
        let err: Trace[] = []
        for( let i = 0; i < valeurPropre.length; i++) {
            err.push({
                x: i,
                y: parseFloat((Math.abs(valeurPropre[i] + 1)).toPrecision(8))
            })
        }

        return err
    }
    //fonction de calcul de valeurs propres d'une matrice 2*2
    function valeurPropre(matrix: number[][]): number[] {
        const a = matrix[0][0]
        const b = matrix[0][1]
        const c = matrix[1][0]
        const d = matrix[1][1]
        //trace de la matrice
        const trace = a + d 
        //determinant de la matrice
        const determinant = parseFloat(((a * d) - (b *c)).toPrecision(8))

        const discriminant = parseFloat((trace * trace - 4 * determinant).toPrecision(8))

        if (discriminant < 0) throw new Error('La matrice possède des valeurs propres complexes')

        const lambda1 = parseFloat(((trace + Math.sqrt(discriminant)) / 2).toPrecision(8))
        const lambda2 = parseFloat(((trace - Math.sqrt(discriminant)) / 2).toPrecision(8))

        return [lambda1, lambda2]
    }

    //fonction de calcul et stockage de tous les valeurs propres
    function matrixValeurPropre(matrices: number[][][]): number[] {
        //prendre uniquement les valeurs propres positives
        return matrices.map(matrix => valeurPropre(matrix)).map((item) => item[0])
    }

    //fonction de trie en ordre décroissant
    function sortArr(arr: number[]): number[] {
        let currentArr: number[] = [...arr]
        let sortedArr: number[] = []
        while(currentArr.length > 0) {
           sortedArr.push(Math.max(...currentArr))//push the max element into the sortedArray
           currentArr.splice(currentArr.indexOf(Math.max(...currentArr)), 1)//removes the max element from the currentArray
        }

        return sortedArr
    }

    //fonction de calcul de la moyenne
    function mean(arr: number[]): number {
        return parseFloat((arr.reduce((sum, value) => sum + value, 0) / arr.length).toPrecision(8))
    }

    //fonction de regrouppement par pair
    function pairData(arr: number[]): number[][] {
        let pairedArray: number[][] = []
        for (let i = 0; i < arr.length; i += 2) {
            pairedArray.push([arr[i], arr[i + 1]])
        }

        return pairedArray
    }
    //groupement de donnée
    function groupData(data: number[][], groupSize: number): number[][][] {
        let groupedData: number[][][] = []

        for(let i = 0; i < data.length; i += groupSize) {
            groupedData.push(data.slice(i, i + groupSize))
        }

        return groupedData
    }

    //fonction de calcul de covariance entre deux tableau de nombre avec la formule de covariance
    function covariance(x: number[], y: number[]): number {
        const xMean = mean(x)
        const yMean = mean(y)

        return parseFloat((x.reduce((sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean), 0) / (x.length - 1)).toPrecision(8))
    }

    //fonction de creation de la matrice de covariance
    function covarianceMatrix(data: number[][]): number[][] {
        const x = data.map(row => row[0])
        const y = data.map(row => row[1])
        
        return [
            [covariance(x, x), covariance(x, y)],
            [covariance(y, x), covariance(y, y)]
        ]
    }

    //fonction de création de séquence de vecteur
    function embedding(data: number[], tau: number): number[] {
        let embedded: number[] = []

        for (let i = 0; i + (i*tau) <= data.length; i++) {
            embedded.push(data[i + (i*tau)])
        }

        return embedded
    }
   
    onMounted(() => {

        new Chart(scatterChart.value?.getContext('2d') as CanvasRenderingContext2D, {
            type: 'scatter',
            data:  {
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
        })
    })
    
</script>

<template>
    <div class="architecture">
        <h1>Recherche de l'architecture optimale</h1>
        <h2>(Algorithme de Takens)</h2>
        <div class="content">
            <canvas ref="scatterChart"></canvas>
            <div class="values">
                <h4>Séquence de vecteur</h4>
                <ul class="value_list">
                    <li v-for="t in target" :key="t"  class="value_item">{{t}}&nbsp;</li>
                </ul>
                <h4>Valeurs propres positives données par les matrices de covariance dans un ordre décroisssant</h4>
                <ul class="value_list">
                    <li v-for="err in aproximateErrors" :key="err.x"  class="value_item">{{err.y}}&nbsp;</li>
                </ul>
                <h4>Résulats</h4>
                <p>d'après le tracé de El en fonction de l ci-contre, le premier plateau est rencontré aux coordonnée <br> <span>El: 2.5988324, l: 9</span></p>
                <ul>
                    <li>Nombre d'unité d'entrée: 9</li>
                    <li>Nombre d'unité cachée: 9</li>
                    <li>Nombre d'unité de sortie: 1</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../utils/mixing';
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(92, 92, 92);
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: #f8f8f8;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  background-color: rgb(92, 92, 92);
  border-radius: 10px;
}
::-webkit-scrollbar-track:horizontal {
  background-color: #f8f8f8;
  border-radius: 10px;
}
    .architecture {
        @include setFlex(center, center, column);
        width: 100%;
        height: auto;
        padding: 1rem 0.25;
        h1 {
            padding: 0.25rem 2rem;
            margin-top: 0.5rem;
            font-size: 36px;
        }
        .content {
            @include setFlex(flex-start, space-evenly, row);
            width: 100%;
            height: 100%;
            padding: 0.5rem;
            canvas {
                max-width: 50%;
                height: 40%;
                padding: 0.5rem;
            }
            .values {
                @include setFlex(flex-start, flex-start, column);
                width: 50%;
                height: 100%;
                padding: 0.5rem;
                h4 {
                    text-decoration: underline;
                    font-size: 18px;
                    margin: 0.5rem;
                }
                span {
                    color: rgb(6, 197, 63);
                }
               .value_list {
                    @include setFlex(flex-start, flex-start, row);
                    @include flexing();
                    list-style-type: none;
                    max-height: 250px;
                    overflow-y: auto;
                    margin: 0.5rem 0rem;
                    .value_item {
                        width: fit-content;
                        height: fit-content;
                        padding: 0.25rem 0.5rem;
                        margin: 0.25rem ;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>