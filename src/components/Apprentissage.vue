<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHeronStore } from '@/stores/heron';
    import {NeuralNetwork} from '../classes/NeuralNetwork'

    const heron = useHeronStore()
    const arr = computed(() => heron.getArrValues)
    const learningRate = 0.1; //taux d'apprentissage
    const period = 10; //10 itérations

    onMounted(() => {
        const neural = new NeuralNetwork(9, 9, 1, 0.1, arr.value.map((item) => item.x))
        neural.getPrototype()
    })
    
    function ann() {// Structure du réseau
        const inputUnits = 9;
        const hiddenUnits = 9;
        const outputUnits = 1;

        // Initialisation aléatoire des poids
        const weightsInputHidden = Array.from({ length: hiddenUnits }, () => Array.from({ length: inputUnits }, () => Math.random() - 0.5));
        const weightsHiddenOutput = Array.from({ length: outputUnits }, () => Array.from({ length: hiddenUnits }, () => Math.random() - 0.5));

        // Fonction d'activation (sigmoïde) et sa dérivée
        const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
        const sigmoidDerivative = (x: number): number => x * (1 - x);

        // Données d'entrée 
        const inputs = ref<number[]>(Array(inputUnits).fill(arr.value.map(item => item.x)));

        // Cible de sortie 
        const target = ref(1);

        // Fonction de propagation avant
        const forwardPropagation = (inputs: number[]): { hidden: number[], output: number } => {
        // Calcul des activations de la couche cachée
        const hidden = weightsInputHidden.map(hiddenWeights => sigmoid(hiddenWeights.reduce((sum, weight, i) => sum + weight * inputs[i], 0)));

        // Calcul de l'activation de la sortie
        const output = sigmoid(weightsHiddenOutput[0].reduce((sum, weight, i) => sum + weight * hidden[i], 0));

            return { hidden, output };
        };

        // Fonction de rétropropagation
        const backPropagation = (inputs: number[], hidden: number[], output: number, target: number) => {
        // Erreur à la sortie
            const outputError = target - output;
            const outputDelta = outputError * sigmoidDerivative(output);

            // Erreur à la couche cachée
            const hiddenErrors = weightsHiddenOutput[0].map((weight, i) => weight * outputDelta);
            const hiddenDeltas = hiddenErrors.map((error, i) => error * sigmoidDerivative(hidden[i]));

            // Mise à jour des poids de la couche cachée à la sortie
            for (let i = 0; i < hiddenUnits; i++) {
                weightsHiddenOutput[0][i] += learningRate * outputDelta * hidden[i];
            }

            // Mise à jour des poids des entrées à la couche cachée
            for (let i = 0; i < hiddenUnits; i++) {
                for (let j = 0; j < inputUnits; j++) {
                weightsInputHidden[i][j] += learningRate * hiddenDeltas[i] * inputs[j];
                }
            }
        };

        // Fonction d'entraînement du réseau
        const trainNeuralNetwork = () => {
        for (let i = 0; i < period; i++) {
            const { hidden, output } = forwardPropagation(inputs.value);
            backPropagation(inputs.value, hidden, output, target.value);
            error.value = calculateError(output, target.value);
        }
        };

        // Calcul de l'erreur (Mean Squared Error)
        const calculateError = (output: number, target: number): number => {
        return 0.5 * Math.pow(target - output, 2);
        };

        // Sortie actuelle après propagation avant
        const { output } = forwardPropagation(inputs.value);

        // Erreur d'apprentissage
        const error = ref(calculateError(output, target.value));
        console.log(error.value)
    }

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