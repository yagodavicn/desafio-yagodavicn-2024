import { RecintosZoo } from './desafio-zoo.js';
import readline from 'readline';

const zoo = new RecintosZoo();

function rodarTeste(animal, quantidade) {
    console.log(`Testando: animal = ${animal}, quantidade = ${quantidade}`);
    const resultado = zoo.analisaRecintos(animal, quantidade);
    if (resultado.erro) {
        console.log("Erro:", resultado.erro);
    } else {
        console.log("Recintos viáveis:", resultado.recintosViaveis.join(', '));
    }
    console.log('---');
}

rodarTeste('leão', 2);
rodarTeste('leão', 0);
rodarTeste('tigre', 1);
rodarTeste('crocodilo', 5);
rodarTeste('macaco', 1);
rodarTeste('gazela', 2);
rodarTeste('hipopotamo', 1);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function interagirComUsuario() {
    rl.question("Qual animal você deseja adicionar? ", (animal) => {
        rl.question("Quantos animais você deseja adicionar? ", (quantidade) => {
            const resultado = zoo.analisaRecintos(animal, parseInt(quantidade));
            if (resultado.erro) {
                console.log("Erro:", resultado.erro);
            } else {
                console.log("Recintos viáveis:", resultado.recintosViaveis.join(', '));
            }
            rl.close();
        });
    });
}

interagirComUsuario();