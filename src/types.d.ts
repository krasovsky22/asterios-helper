/* eslint-disable camelcase */
export type DiscordResponseType = {
  access_token?: string;
  expires_in?: number;
  expires_at?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

export type DiscordUserType = {
  avatar: null;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
};
