---
sidebar_position: 4
---

# OAuth (Optional)
## Definition
Open Authorization or [OAuth 2.0](https://auth0.com/intro-to-iam/what-is-oauth-2/) is an authorization protocol designed to allow a website or an application to access resources hosted by other web apps on behalf of a user. 

## Access token
An Access Token is a piece of data that represents the authorization to access resources on behalf of the end-user. OAuth 2.0 doesn’t define a specific format for Access Tokens. However, in some contexts, the JSON Web Token (JWT) format is often used.

## Roles
The idea of roles is part of the core specification of the OAuth 2.0. The OAuth 2.0 provide the following:
  - resource owner - the user or system that owns the protected resources and can grant access to them 
  - client - The client is the system that requires access to the protected resources
  - authorization server - the server that receives requests from the client for access token
  - resource server - the server that protects the user’s resources and receives access requests from the client

## Scopes
Scopes are an important part of OAuth 2.0. They are used to specify exactly the reason for which access to resources may be granted. Acceptable scope values, and which resources they relate to, are dependent on the resource server.

## Refresh token
Authorization server may also return not only the access token but refresh token as well. Refresh Tokens have long expiry times and may be used to get new access tokens when the previous expires.

## How Does OAuth 2.0 Work?
Before OAuth 2.0 can be used, the client should get its own credentials (client id and client secret) from the authorization server. Those credentials use to identify and authenticate client when requesting an access token.
The token request, exchange, and response follow this general flow:
  - client (mobile app, web app, desktop) requests authorization from the authorization server, supplying the client id and secret to as identification; it also provides the scopes and redirect URI to send the access token
  - authorization server authenticates the client
  - authorization server redirects back to the client with access token,a refresh token may also be returned
  - client use access token to get access to the resources







With the Access Token, the Client requests access to the resource from the Resource server.
