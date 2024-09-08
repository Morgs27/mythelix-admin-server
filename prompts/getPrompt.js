export default function getPrompt (version) {

    var totalWeight = 0

    const promptWeights = JSON.parse(version.promptWeights)

    promptWeights.forEach((type) => {
        totalWeight+= parseFloat(type.probability)
    })

    var found = false;
    var returnPrompt = "";
    var returnPromptIndex = 0;

    var returnType = "null";
    var returnAlteration = "null";

    var runningWeight = 0;
    var randomNum = Math.random();
    
    promptWeights.forEach((type, index) => {

        if (!found){
            var trueWeight = parseFloat(type.probability) / totalWeight;
            runningWeight += trueWeight;

            if (index == (promptWeights.length - 1)){

            returnPromptIndex = index
            returnPrompt = type.prompt;
            found = true;

            }
            else {
                if (randomNum < runningWeight){
                    
                    returnPromptIndex = index;
                    returnPrompt = type.prompt;
                    found = true;

                }
            }
        }
    })

    returnType = returnPrompt;
    var returnAlter = "null";

    if (Math.random() < parseFloat(version.alterChance)){

        var totalAlterWeights = 0

        const alterArray =  promptWeights[returnPromptIndex].alters


        alterArray.forEach((alter) => {
            totalAlterWeights += parseFloat(alter.probability);
        })

        var foundAlter = false;
        var alterPosition = "null";

        var runningAlterWeight = 0;
        var randomNumAlter = Math.random();

        alterArray.forEach((alter, alterIndex) => {

            if (!foundAlter){

                var trueWeightAlter = parseFloat(alter.probability) / totalAlterWeights;
                runningAlterWeight += trueWeightAlter;

                if (alterIndex == (alterArray.length - 1)){

                    alterPosition = alter.type;
                    returnAlter = alter.value;
                    foundAlter = true;

                }
                else {

                    if (randomNumAlter < runningAlterWeight){
                        
                        alterPosition = alter.type;
                        returnAlter = alter.value;
                        foundAlter = true;

                    }
                }
            }

        })


        returnPrompt = returnAlter + " " + returnPrompt;

    }

    returnPrompt = returnPrompt + version.extraString

    return [returnPrompt, returnType, returnAlter];

}