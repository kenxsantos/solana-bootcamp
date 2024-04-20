import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Contract } from "../target/types/contract";
import { web3 } from "@coral-xyz/anchor";

describe("contract", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.Contract as Program<Contract>;

  it("Is initialized!", async () => {
    const email: string = "test@gmail.com";
    const password: string = "test123";

    const userAccount: web3.Keypair = web3.Keypair.generate();
    const tx = await program.methods
      .initialize(email, password)
      .accounts({
        payer: provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
        userAccount: userAccount.publicKey,
      })
      .signers([userAccount])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
