# My Movies GraphQL

- `make run/server/movies`
- `make run/server/ui-settings`
- `make run/gateway`

```
query GetUISettingsWithMovie {
  uiSettings {
    auth {
      audience
      clientId
      domain
    }
    releaseToggles {
      example
    }
    movie(id: "1") {
      title
    }
  }
}
```
