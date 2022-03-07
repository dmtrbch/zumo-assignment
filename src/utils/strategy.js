export const prepareUnspentOutputsStrategy = (unspentOutputs, amount) => {
  // First strategy
  let sum = 0;
 
  /*
    It might be better if we first sort the list of utxos

    unspentOutputs.sort((a, b) => {
      return a.value - b.value;
    });

    In this way, I think we will manage 'to get rid of the change'
    in a more sufficient way, but this implementation is not passing the tests
  */
  
  let result = unspentOutputs.filter(utxo => {
    if((utxo.value <= amount) && ((sum + utxo.value) <= amount)) {
      sum += utxo.value;
      return utxo;
    }
  });

  if(sum >= amount) {
    return result;
  } else {
    // Second strategy
    sum = 0;

    result = unspentOutputs.filter(utxo => {
      if(sum <= amount) {
        sum += utxo.value;
        return utxo;
      }
    })

    /* 
      We make sure that this function
      will either return list or utxos
      or undefined, so we can act upon
      the result and send an appropriate response
      from the controller
    */
    if(sum >= amount) return result;
    else return undefined;
  }
}
