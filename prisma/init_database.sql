CREATE DATABASE IF NOT EXISTS nextjs_cockroachdb_speechmaster;

USE nextjs_cockroachdb_speechmaster;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name STRING,
  email STRING UNIQUE,
  email_verified TIMESTAMPTZ,
  image STRING
);

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  type STRING NOT NULL,
  provider STRING NOT NULL, 
  provider_account_id STRING NOT NULL,
  refresh_token STRING,
  access_token STRING,
  refresh_token_expires_in INT,
  expires_at INT,
  token_type STRING,
  scope STRING,
  id_token STRING,
  session_state STRING,
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token STRING UNIQUE,
  user_id UUID REFERENCES users (id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE verificationtokens (
  identifier STRING NOT NULL,
  token STRING NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  UNIQUE(identifier, token)
);