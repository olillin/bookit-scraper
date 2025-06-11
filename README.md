# BookIT Scraper

Scrape data from [BookIT](https://bookit.chalmers.it), the IT-student division
booking service.

## Installation

Install from npm:

```console
npm install bookit-scraper
```

### Selenium

This library uses [Selenium](https://www.selenium.dev) and requires
[geckodriver](https://github.com/mozilla/geckodriver/releases/) to be installed
in order to work properly.

If you are using [Nix or NixOS](https://nixos.org/) you can start a development
environment by running this command in the root directory of the project:

```console
nix-shell
```

## Usage

**BookIT Scraper** has only two functions:

+ `createCookie(username, password)` - Log into BookIT with your Gamma
  credentials using Selenium and get the session cookie.
+ `createGraphQLClient(cookie)` - Create a GraphQL client with the previously
  generated cookie.

### Example

Observe the following script:

```typescript
import { createCookie, createGraphQLClient } from 'bookit-scraper'
import { gql } from 'graphql-request'

async function main() {
    const { GAMMA_USERNAME, GAMMA_PASSWORD } = process.env
    const cookie = await createCookie(GAMMA_USERNAME!, GAMMA_PASSWORD!)
    const client = createGraphQLClient(cookie)
    const response = await client.request(gql`
        {
            event(id: "2e21990a-969d-4e31-a0d4-49a249ce3b42")
            {
                title
                room
                start
            }
        }`
    )
    console.log(response)
}
main()
```

When the [environment variables](https://www.geeksforgeeks.org/javascript/what-are-environment-variables-in-development/)
are configured correctly the code above will produce the following output:

```gql
{
  event: {
    title: 'NollKIT PostOhm o sånt',
    room: [ 'BIG_HUB', 'GROUP_ROOM', 'CTC' ],
    start: '1749898800000'
  }
}
```
