import readline from 'readline';

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ tipo: 'macaco', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ tipo: 'gazela', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ tipo: 'leão', quantidade: 1 }] }
        ];

        const animais = {
            'LEAO': { tamanho: 3, bioma: 'savana', carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: 'savana', carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: 'rio', carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: 'savana', carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };

        animal = animal.toUpperCase();

        if (quantidade <= 0 || quantidade > 12) return { erro: "Quantidade inválida" };
        if (!animais[animal]) return { erro: "Animal inválido" };        

        const animalInfo = animais[animal];

        const recintosViaveis = recintos.filter(recinto => {
            let espacoOcupado = 0;
            let existeCarnivoro = false;
        
            recinto.animaisExistentes.forEach(a => {
                const info = animais[a.tipo.toUpperCase()];
                if (info) {
                    espacoOcupado += info.tamanho * a.quantidade;
                    if (info.carnivoro) existeCarnivoro = true;
                }
            });
        
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            const biomaOk = Array.isArray(animalInfo.bioma)
                ? animalInfo.bioma.includes(recinto.bioma)
                : animalInfo.bioma === recinto.bioma;
        
            if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') return false;
            if (animalInfo.carnivoro && (existeCarnivoro || recinto.animaisExistentes.some(a => a.tipo.toUpperCase() !== animal))) return false;
            if (animal === 'MACACO' && recinto.animaisExistentes.length === 0) return false;
            if (recinto.animaisExistentes.length > 0 && recinto.animaisExistentes.some(a => a.tipo.toUpperCase() !== animal)) espacoOcupado += 1;
        
            return espacoLivre >= animalInfo.tamanho * quantidade;
        }).map(recinto => {
            const animalInfo = animais[animal];
            const espacoOcupado = recinto.tamanhoTotal - (recinto.tamanhoTotal - (animalInfo.tamanho * quantidade));
            return `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado} total: ${recinto.tamanhoTotal})`;
        });        

        return recintosViaveis.length ? { recintosViaveis } : { erro: "Não há recinto viável, porque não tem espaço" };
    }
    adicionarAnimal() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Qual o animal que deseja adicionar? ", (animal) => {
            rl.question("Quantos animais você deseja adicionar? ", (quantidade) => {
                const resultado = this.analisaRecintos(animal, parseInt(quantidade));
                console.log(resultado.erro || "Recintos viáveis: " + resultado.recintosViaveis.join(', '));
                rl.close();
            });
        });
    }
}
const zoo = new RecintosZoo();
zoo.adicionarAnimal();

export { RecintosZoo as RecintosZoo };