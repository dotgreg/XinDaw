export const interpolateValToNewRange = (c: {value:number, min:number, max:number, minNew:number, maxNew:number}):number => {
    // get current percent inside current range
    let positionInOldRange = c.value / (c.max - c.min)  // from 0 to 1
    let percentageInOldRange = positionInOldRange * 100 // from 0 to 1

    let aPercentValueInNewRange = (c.maxNew - c.minNew) / 100
    let result = aPercentValueInNewRange * percentageInOldRange

    // console.log({result, aPercentValueInNewRange, percentageInOldRange, positionInOldRange, c});

    result = result + c.minNew
    
    return result
}