import axios from 'axios';
import { prepareUnspentOutputsStrategy } from '../utils/strategy';

export const prepareUnspentOutputs = async (req, res) => {
  try {
    // Use of axios to make external API call to https://blockchain.info/
    const response = await axios.get('https://blockchain.info/unspent',
      {
        // Retrieve address query param and use it as a parameter to the external API call
        params: { active: req.query.address }
      }
    );

    let unspentOutputs = response.data['unspent_outputs'];

    // Retrieve amount query param
    const amount = req.query.amount;

    // Call to a function that handles the strategies logic
    const result = await prepareUnspentOutputsStrategy(unspentOutputs, amount);

    if(result !== undefined) res.status(200).send(result);
    else res.status(409).send({ message: 'Not enough funds' }).end();

  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
