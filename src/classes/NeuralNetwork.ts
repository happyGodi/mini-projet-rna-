import type { Prototype } from '../utils/interfaces';
import type { ErrorPoint } from '../utils/interfaces';

export class NeuralNetwork {
    //class de création d'un réseau de neurone avec apprentissage
    private inputUnitNumber: number //nombre d'unité d'entréé
    private hiddenUnitNumber: number //nombre d'unité caché
    private outputUnitNumber: number //nombre d'unité de sortie
    private learningRate: number //pas d'apprentissage
    private weightsInputHidden: number[][] //poids des unités caché venant des entréés
    private weightsOutputHidden: number[][] //poids des unités caché vers la sortie
    private timeSerie: number[]// la série temporelle initiale
    private prototype: Prototype[][] //les prototypes

    constructor(inputUnitNumber: number, hiddenUnitNumber: number, outputUnitNumber: number, learningRate: number, timeSerie: number[]) {
        this.inputUnitNumber = inputUnitNumber
        this.hiddenUnitNumber = hiddenUnitNumber
        this.outputUnitNumber = outputUnitNumber
        this.learningRate = learningRate
        this.timeSerie = timeSerie

        //step1: initialisation des poids avec de petites valeurs aléatoire (min: 0.1, max: 0.5)
        this.weightsInputHidden = Array.from({length: hiddenUnitNumber}, () => Array.from({length: inputUnitNumber}, () => Math.random() * (0.5 - 0.1) + 0.1))
        this.weightsOutputHidden = Array.from({length: outputUnitNumber}, () => Array.from({length: hiddenUnitNumber}, () => Math.random() * (0.5 - 0.1) + 0.1))

        //step2: initialisation du premier prototype
        this.prototype = this.generatePrototype(timeSerie.slice(0, 300), 6)
    }
    //géneration des prototypes
    private generatePrototype(arr: number[], numberPerSet: number): Prototype[][] {
        const totalValue = arr.length
        const prototypeSets = totalValue / numberPerSet
        const maxValue = numberPerSet * prototypeSets

        let prototype: Prototype[][] = []
        let count = 0

        for (let i = 0; i < prototypeSets && count < maxValue; i++) {
            const prototypeSet: Prototype[] = []
            for (let j = 0; j < numberPerSet && count < maxValue; j++) {
                const inputs = arr.slice(count, count + this.inputUnitNumber);
                const target = arr[count + this.inputUnitNumber]
                prototypeSet.push({inputs, target})
                count += this.inputUnitNumber + 1
            }
            prototype.push(prototypeSet)
        }
        return prototype
    }
    //fonction d'activation sigmoid
    private sigmoid(x: number): number {
        return parseFloat((1 / (1 + Math.exp(-x))).toPrecision(8))
    }
    //fonction sigmoid dérivé
    private sigmoidDerivated(x: number): number {
        return parseFloat((x * (1 - x)).toPrecision(8))
    }

    //step 3: propagation du signal vers l'avant
    private forwardPropagation(inputs: number[]): { hidden: number[], output: number[] } {
        const hidden = this.weightsInputHidden.map(hiddenWeights => this.sigmoid(hiddenWeights.reduce((sum, weight, i) => parseFloat((sum + weight * inputs[i]).toPrecision(8)), 0)))
        /**
         parcours de l'ensemble de poids entre la couche d'entréé et celle caché
         hiddenWeights.reduce calcul la valeur du paramètre de la fonction sigmoid
         la valeur finale est celle retourné par cette fonction
         le processus est le même pour l'instruction suivante mais utilisant la couche caché et celle de sortie
         */
        const output = this.weightsOutputHidden.map(outputWeights => this.sigmoid(outputWeights.reduce((sum, weight, i) => parseFloat((sum + weight * hidden[i]).toPrecision(8)), 0)))
        //calcul de toutes les sortie
        return {hidden, output}
    }

    //propagation vers l'arrière
    private backwardPropagation(inputs: number[], hiddens: number[], output: number, target: number): void {
        //calcule de l'erreur de sortie
        const outputError = target - output
        //step 4: calcul des deltas pour la couche de sortie
        const outputDelta = outputError * this.sigmoidDerivated(output)
        //step 5: propagation des erreurs vers l'arrière et calcul des deltas pour les couches précedentes
        const hiddenErrors = this.weightsOutputHidden[0].map((weight) => parseFloat((weight * outputDelta).toPrecision(8)))
        const hiddenDeltas = hiddenErrors.map((error, i) => parseFloat((error * this.sigmoidDerivated(hiddens[i])).toPrecision(8)))

        //step 6: mise à jour de toutes les connexions
        for (let i = 0; i < this.hiddenUnitNumber; i++) {
            this.weightsOutputHidden[0][i] += this.learningRate * outputDelta * hiddens[i]
        }
        for (let i = 0; i < this.hiddenUnitNumber; i++) {
            for (let j = 0; j < this.inputUnitNumber; j++) {
                this.weightsInputHidden[i][j] += this.learningRate * hiddenDeltas[i] * inputs[j]
            }
        }
    }

    //fonction test prototype
    getPrototype() {
        console.log(this.prototype)
    }

  
}