import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { New } from "../target/types/new";
import {web3} from "@coral-xyz/anchor";
describe("new", () => {

  const provider = anchor.AnchorProvider.local()
  anchor.setProvider(provider);

  const program = anchor.workspace.Test as Program<New>;

  it("Is initialized!", async () => {
    const email: string = "test@gmail.com"
    const password: string = "test123"

    const userAccount: web3.Keypair = web3.Keypair.generate()
    const tx = await program.methods.initialize(email, password).accounts({
       payer: provider.publicKey,
       systemProgram: web3.SystemProgram.programId,
       userAccount: userAccount.publicKey
      }).signers([userAccount]).rpc();
    console.log("Your transaction signature", tx);
  });
});
