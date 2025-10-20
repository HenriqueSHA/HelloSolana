# 🦀 Hello Solana

Programa minimalista em **Rust + Solana** que imprime `Hello, Solana!` nos logs on-chain.  
Criado para entender o ciclo completo de build, deploy e execução de um programa BPF na Solana.

---

## 🚀 Objetivo

Demonstrar a estrutura mínima de um **smart contract Solana**:
- Uso do macro `entrypoint!()` como ponto de entrada.
- Definição da função `process_instruction`.
- Emissão de logs com `msg!()`.
- Compilação para bytecode BPF e deploy na Devnet.

---

## 🧩 Estrutura do código

```rust
use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Solana!");
    Ok(())
}
