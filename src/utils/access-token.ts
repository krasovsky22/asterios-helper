/* eslint-disable camelcase */

import { STORAGE_KEY } from "@constants/auth";
import { DiscordResponseType, DiscordUserType } from "@/types";

export async function fetchAccessToken(code: string) {
  const client_id = process.env.REACT_APP_DISCORD_CLIENT_ID ?? "";
  const client_secret = process.env.REACT_APP_DISCORD_CLIENT_SECRET ?? "";
  const redirect_uri = process.env.REACT_APP_DISCORD_REDIRECT_URL ?? "";
  const grant_type = "authorization_code";
  const scope = "identify email";

  const data = {
    code,
    scope,
    client_id,
    grant_type,
    redirect_uri,
    client_secret,
  };

  const params = new URLSearchParams(data);

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const responseData = (await response.json()) as DiscordResponseType;

  if (!responseData.error) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + (responseData?.expires_in ?? 0));
    responseData.expires_at = now.toLocaleString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responseData));
  }

  return responseData;
}

export async function fetchAuthenticatedUser() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as DiscordResponseType;
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${storageData.token_type} ${storageData.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const responseData = await response.json();
  //if error
  if (responseData.message) {
    return null;
  }

  return responseData as DiscordUserType;
}
