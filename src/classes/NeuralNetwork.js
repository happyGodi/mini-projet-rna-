export class NeuralNetwork {
    //class de création d'un réseau de neurone avec apprentissage
    inputUnitNumber; //nombre d'unité d'entréé
    hiddenUnitNumber; //nombre d'unité caché
    outputUnitNumber; //nombre d'unité de sortie
    learningRate; //pas d'apprentissage
    weightsInputHidden; //poids des unités caché venant des entréés
    weightsOutputHidden; //poids des unités caché vers la sortie
    outputs = []; // la série temporelle initiale
    prototype; //les prototypes
    targets = [];
    timeSerie;
    learningErrors = [];
    constructor(inputUnitNumber, hiddenUnitNumber, outputUnitNumber, learningRate, timeSerie) {
        this.inputUnitNumber = inputUnitNumber;
        this.hiddenUnitNumber = hiddenUnitNumber;
        this.outputUnitNumber = outputUnitNumber;
        this.learningRate = learningRate;
        this.timeSerie = timeSerie;
        //step1: initialisation des poids avec de petites valeurs aléatoire (min: 0.1, max: 0.5)
        this.weightsInputHidden = Array.from({ length: hiddenUnitNumber }, () => Array.from({ length: inputUnitNumber }, () => parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toPrecision(8))));
        this.weightsOutputHidden = Array.from({ length: outputUnitNumber }, () => Array.from({ length: hiddenUnitNumber }, () => parseFloat((Math.random() * (0.5 - 0.1) + 0.1).toPrecision(8))));
        //step2: initialisation du premier prototype
        this.prototype = this.generatePrototype(timeSerie.slice(0, 300));
    }
    //géneration des prototypes
    generatePrototype(arr) {
        const prototype = [];
        let count = 0;
        while (count < arr.length - this.inputUnitNumber) {
            const inputs = arr.slice(count, count + this.inputUnitNumber);
            const target = arr[count + this.inputUnitNumber];
            prototype.push({ inputs, target });
            count += this.inputUnitNumber + 1;
        }
        this.targets = prototype.map(p => p.target);
        return prototype;
    }
    //fonction d'activation sigmoid
    sigmoid(x) {
        return parseFloat((1 / (1 + Math.exp(-x))).toPrecision(8));
    }
    //fonction sigmoid dérivé
    sigmoidDerivated(x) {
        return parseFloat((x * (1 - x)).toPrecision(8));
    }
    //step 3: propagation du signal vers l'avant
    forwardPropagation(inputs) {
        const hidden = this.weightsInputHidden.map(hiddenWeights => this.sigmoid(hiddenWeights.reduce((sum, weight, i) => parseFloat((sum + weight * inputs[i]).toPrecision(8)), 0)));
        /**
         parcours de l'ensemble de poids entre la couche d'entréé et celle caché
         hiddenWeights.reduce calcul la valeur du paramètre de la fonction sigmoid
         la valeur finale est celle retourné par cette fonction
         le processus est le même pour l'instruction suivante mais utilisant la couche caché et celle de sortie
         */
        // const output = this.weightsOutputHidden.map(outputWeights => this.sigmoid(outputWeights.reduce((sum, weight, i) => parseFloat((sum + weight * hidden[i]).toPrecision(8)), 0)))
        const output = this.sigmoid(this.weightsOutputHidden[0].reduce((sum, weight, i) => parseFloat((sum + weight * hidden[i]).toPrecision(8)), 0));
        //calcul de toutes les sortie
        return { hidden, output };
    }
    calculateVariance(arr) {
        const mean = parseFloat((arr.reduce((sum, value) => sum + value, 0) / (arr.length - 1)).toPrecision(8));
        const variance = arr.reduce((sum, value) => sum + (value + mean) ** 2, 0) / (arr.length - 1);
        return variance;
    }
    //propagation vers l'arrière
    backwardPropagation(inputs, hiddens, output, target) {
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
    train(epochs) {
        this.learningErrors = [];
        for (let epoch = 0; epoch < epochs; epoch++) {
            this.outputs = [];
            for (const { inputs, target } of this.prototype) {
                const { hidden, output } = this.forwardPropagation(inputs);
                this.backwardPropagation(inputs, hidden, output, target);
                this.outputs.push(output);
            }
            const nmse = this.calculNMSE(this.outputs, this.targets);
            this.learningErrors.push(nmse);
            if (epoch > 0 && this.learningErrors[epoch] > this.learningErrors[epoch - 1])
                break;
        }
    }
    //fonction de prédiction
    predict(inputSerie, steps) {
        const predictions = [];
        let currentInputSerie = inputSerie.slice(-this.inputUnitNumber);
        for (let step = 0; step < steps; step++) {
            const currentInput = currentInputSerie.slice(-this.inputUnitNumber);
            const { output } = this.forwardPropagation(currentInput);
            predictions.push(output);
            currentInputSerie.push(output);
        }
        return predictions;
    }
    //fonction de calcul de l'erreur NMSE
    calculNMSE(predictions, targets) {
        let sum = 0;
        if (predictions.length != 0) {
            for (let i = 0; i < predictions.length; i++) {
                sum += (predictions[i] - targets[i]) ** 2;
            }
            return parseFloat((Math.sqrt(sum / (predictions.length))).toPrecision(8));
        }
        else
            return 0;
    }
    //fonction test prototype
    getPrototype() {
        return this.prototype;
    }
    getInputs() {
        return this.weightsInputHidden;
    }
    getOutput() {
        return this.outputs;
    }
    getTarget() {
        return this.targets;
    }
    getLearningErrors() {
        return this.learningErrors;
    }
    getTimeSerie() {
        return this.timeSerie;
    }
}
