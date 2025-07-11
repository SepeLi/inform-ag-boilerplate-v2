# tRPC API endpoint

This route contains the relevant functionality for the tRPC API endpoint.
You can query this endpoint with the `trpc` client or with any other HTTP client.

NOTE: Using a namespaced router, our trpc endpoints look like: http://localhost:4200/api/{namespace}.{procedure}

## Usage

**Successful query:**
`curl -i http://localhost:4200/api/example.exampleTRPCProcedure`

**Response:**

```
HTTP/1.1 200 OK
vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url
content-type: application/json
Date: Thu, 14 Dec 2023 02:23:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

```json
{
  "result": {
    "data": "Example tRPC procedure response"
  }
}
```

**Unsuccessful query:**
`curl -i http://localhost:4200/api/example.nonExistentRoute`

**Response:**

```
HTTP/1.1 404 Not Found
vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url
content-type: application/json
Date: Thu, 14 Dec 2023 02:24:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

```json
{
  "error": {
    "message": "No \"query\"-procedure on path \"nonExistentRoute\"",
    "code": -32004,
    "data": {
      "code": "NOT_FOUND",
      "httpStatus": 404,
      "stack": "TRPCError: No \"query\"-procedure on path \"nonExistentRoute\"\n    at callProcedure (webpack-internal:///(rsc)/../../node_modules/@trpc/server/dist/config-00ffd309.mjs:183:15)\n    at inputToProcedureCall (webpack-internal:///(rsc)/../../node_modules/@trpc/server/dist/resolveHTTPResponse-cd1a9112.mjs:54:83)\n    at eval (webpack-internal:///(rsc)/../../node_modules/@trpc/server/dist/resolveHTTPResponse-cd1a9112.mjs:177:51)\n    at Array.map (<anonymous>)\n    at resolveHTTPResponse (webpack-internal:///(rsc)/../../node_modules/@trpc/server/dist/resolveHTTPResponse-cd1a9112.mjs:177:32)",
      "path": "nonExistentRoute"
    }
  }
}
```

> **Note: Stack trace is only shown in development mode.**
