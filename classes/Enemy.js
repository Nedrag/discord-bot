const EnemyPool = require("../db/models/enemy_pools/EnemyPool");

const ENEMY_HEALTH = 100;
const ENEMY_SHIELD = 0;
const ENEMY_GUN = 0;

class Enemy {
    #interaction;
    constructor(interaction) { 
        this.#interaction = interaction;
    }
    randomWeight(choices)
    {
        let weightSum = 0;
        for(const choice of choices)
        {
            weightSum += choice.weight;
        }

        let randWeight = Math.random() * weightSum;
        for(const choice of choices)
        {
            if(randWeight < choice.weight) return choice;
            randWeight -= choice.weight;
        }
        return null;

    }
    async handleCalculateStats()
    {
        const enemyPool = await EnemyPool.findAll();
        const enemyChoice = this.randomWeight(enemyPool);

        if(enemyChoice.name == "CHUMP"){
            HEALTH *= 1.1;
        }
        

    }

}
module.exports = {Enemy};