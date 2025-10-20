import { Connection, clusterApiUrl } from '@solana/web3.js';

(async () => {
  const conn = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const version = await conn.getVersion();
  console.log('RPC version:', version);
})();
