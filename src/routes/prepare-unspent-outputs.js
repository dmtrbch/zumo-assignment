import express from 'express';
import { prepareUnspentOutputs } from './prepare-unspent-outputs.controller';

const router = express.Router();

router.get('/api/prepare-unspent-outputs/', prepareUnspentOutputs);

export { router as prepareUnspentOutputsRouter };
