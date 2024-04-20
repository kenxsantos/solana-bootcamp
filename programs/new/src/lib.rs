use anchor_lang::prelude::*;

declare_id!("EJ6XSF9BUjwz5N8fpVrz32LjiZTvMhx2xAE7V5ua6fCd");

#[program]
pub mod new {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, email: String, password: String) -> Result<()> {
        let user: &mut Account<'_, User> = &mut ctx.accounts.user;
        user.email = email;
        user.password = password;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,         
        payer = payer, 
        space = 8 + 8 + 8 
    )]
    pub user: Account<'info, User>,
    pub system_program: Program<'info, System>, 
}

#[account]
pub struct User {
    pub email: String, 
    pub password: String, 
}

