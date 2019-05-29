<img src="https://travis-ci.com/tommyyork/json2gql.svg?branch=master"/>

Converts a given JSON object, containing GraphQL data, to a GraphQL-style query, containing only the keys required to request the data in the JSON object. Useful for large arrays, with objects inside that could contain a variety of different keys and objects.

For example, converts this:

```
json2gql({
  "shortName": "product shortname",
  "productFeatures": {
    "content": [
      {
        "key": "welcomeBonus",
        "header": "Welcome Bonus",
        "desc": [
          {
            "type": "text",
            "text": "-"
          }
        ]
      },
      {
        "key": "annualFee",
        "header": "Annual Fee",
        "style": "example style"
      }
    ]
  }
})
```

Returns this:

```
shortName
productFeatures {
  content {
    key
    header
    desc {
      type
      text
    }
    style
  }
}
```
