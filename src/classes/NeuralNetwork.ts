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
    private outputs: number[] = []// la série temporelle initiale
    private prototype: Prototype[] //les prototypes
    private targets: number[] = []
    private timeSerie: number[]

    constructor(inputUnitNumber: number, hiddenUnitNumber: number, outputUnitNumber: number, learningRate: number, timeSerie: number[]) {
        this.inputUnitNumber = inputUnitNumber
        this.hiddenUnitNumber = hiddenUnitNumber
        this.outputUnitNumber = outputUnitNumber
        this.learningRate = learningRate
        this.timeSerie = timeSerie.slice(0, 250)

        //step1: initialisation des poids avec de petites valeurs aléatoire (min: 0.1, max: 0.5)
        this.weightsInputHidden = Array.from({length: hiddenUnitNumber}, () => Array.from({length: inputUnitNumber}, () => parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toPrecision(8))))
        this.weightsOutputHidden = Array.from({length: outputUnitNumber}, () => Array.from({length: hiddenUnitNumber}, () => parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toPrecision(8))))

        //step2: initialisation du premier prototype
        this.prototype = this.generatePrototype(timeSerie.slice(0, 250))
    }
    //géneration des prototypes
    private generatePrototype(arr: number[]): Prototype[] {
        const prototype: Prototype[] = [];
        let count = 0;

        while (count < arr.length - this.inputUnitNumber) {
            const inputs = arr.slice(count, count + this.inputUnitNumber)
            const target = arr[count + this.inputUnitNumber];
            prototype.push({ inputs, target })
            count += this.inputUnitNumber + 1
        }

        this.targets = prototype.map(p => p.target)

        return prototype;
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
    private forwardPropagation(inputs: number[]): { hidden: number[], output: number } {
        const hidden = this.weightsInputHidden.map(hiddenWeights => this.sigmoid(hiddenWeights.reduce((sum, weight, i) => parseFloat((sum + weight * inputs[i]).toPrecision(8)), 0)))
        /**
         parcours de l'ensemble de poids entre la couche d'entréé et celle caché
         hiddenWeights.reduce calcul la valeur du paramètre de la fonction sigmoid
         la valeur finale est celle retourné par cette fonction
         le processus est le même pour l'instruction suivante mais utilisant la couche caché et celle de sortie
         */
        // const output = this.weightsOutputHidden.map(outputWeights => this.sigmoid(outputWeights.reduce((sum, weight, i) => parseFloat((sum + weight * hidden[i]).toPrecision(8)), 0)))
       
        const output = this.sigmoid(this.weightsOutputHidden[0].reduce((sum, weight, i) => parseFloat((sum + weight * hidden[i]).toPrecision(8)), 0));
        //calcul de toutes les sortie
 
        return {hidden, output}
    }

    private calculateVariance(arr: number[]): number {
        const mean = parseFloat((arr.reduce((sum, value) => sum + value, 0) / (arr.length - 1)).toPrecision(8))
        const variance = arr.reduce((sum, value) => sum + (value + mean) ** 2, 0) / (arr.length - 1)
        return variance
    }

    //propagation vers l'arrière
    private backwardPropagation(inputs: number[], hiddens: number[], output: number, target: number): void {
        //calcule de l'erreur de sortie
        const outputError = parseFloat((target - output).toPrecision(8));
        //step 4: calcul des deltas pour la couche de sortie
        const outputDelta = parseFloat((outputError * this.sigmoidDerivated(output)).toPrecision(8));
        //step 5: propagation des erreurs vers l'arrière et calcul des deltas pour les couches précedentes
        const hiddenErrors = this.weightsOutputHidden[0].map((weight) => parseFloat((weight * outputDelta).toPrecision(8)));
        const hiddenDeltas = hiddenErrors.map((error, i) => parseFloat((error * this.sigmoidDerivated(hiddens[i])).toPrecision(8)));

        //step 6: mise à jour de toutes les connexions
        //mis à jour des connexion entre la couche caché et celle de sortie
        for (let i = 0; i < this.hiddenUnitNumber; i++) {
            this.weightsOutputHidden[0][i] = parseFloat((this.weightsOutputHidden[0][i] + parseFloat((this.learningRate * outputDelta * hiddens[i]).toPrecision(8))).toPrecision(8));
        }
        //mis à jour des couches caché entre la couche d'entré et celle caché
        for (let i = 0; i < this.hiddenUnitNumber; i++) {
            for (let j = 0; j < this.inputUnitNumber; j++) {
                this.weightsInputHidden[i][j] = parseFloat((this.weightsInputHidden[i][j] + parseFloat((this.learningRate * hiddenDeltas[i] * inputs[j]).toPrecision(8))).toPrecision(8));
            }
        }
    }

    //fonction d'apprentissage
    public train(): number {
        let nmse: number = 0
        for (const { inputs, target } of this.prototype) {
            const { hidden, output } = this.forwardPropagation(inputs)
            this.backwardPropagation(inputs, hidden, output, target)
            this.outputs.push(output)
        }
 
        return this.calculNMSE(this.targets, this.outputs)
    }

    //fonction de calcul de l'erreur NMSE
    private calculNMSE(predictions: number[], targets: number[]): number {
        let sum: number = 0
        for (let i = 0; i < predictions.length; i++) {
            sum += targets[i] - predictions[i]
        }
        return parseFloat((sum / (predictions.length * this.calculateVariance(this.timeSerie))).toPrecision(8))
    }

    //fonction test prototype
    getPrototype(): Prototype[] {
        return this.prototype
    }

    getInputs(): number[][] {
        return this.weightsInputHidden
    }

    getTarget(): number[] {
        return this.targets
    }
}