import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

// ======= CONFIG =======
// Cole aqui o Program Id retornado no deploy:
const PROGRAM_ID = new PublicKey('6B6KPhMZK8B5BM1HNEKrBEheLfBxNzQuo1iWCPiHw4rp');
// ======================

async function main() {
  console.log('🚀 Launching client...');

  // 1) Conexão com Devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // 2) Conta cliente + airdrop (1 SOL)
  const triggerKeypair = Keypair.generate();
  console.log('👤 Client pubkey:', triggerKeypair.publicKey.toBase58());

  const airdropSig = await connection.requestAirdrop(
    triggerKeypair.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSig, 'confirmed');
  console.log('💰 Airdrop confirmado');

  // 3) Monta instrução "ping" (payload vazio)
  console.log('-- Pinging program', PROGRAM_ID.toBase58());
  const ix = new TransactionInstruction({
    keys: [{ pubkey: triggerKeypair.publicKey, isSigner: false, isWritable: true }],
    programId: PROGRAM_ID,
    data: Buffer.alloc(0),
  });

  // 4) Envia transação
  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [triggerKeypair]);
  console.log('✅ Transação confirmada:', sig);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
