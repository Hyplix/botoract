# Botoract
Botoract is a npm module to interact with different botlist public APIs.

## Botlist (Support)
- [Discord Boats](https://discord.boats/)
- More coming soon...

## Usage
### Discord Boats
```js
const { Boat } = require("botoract");

const boat = new Boat({
    token: "API Token",
    botId: "BotId"
});

// Post your bot's server count
boat.post.serverCount(69, "Bot ID - Not required here if you passed on the constructor");

// Fetch a Bot
boat.bots.fetch("Bot ID").then((bot) => {
    //...
});

// Fetch a User
boat.users.fetch("User Id").then((bot) => {
    //...
});

// Check if the user voted your bot
boat.bots.isVoted("User ID", "Bot ID - Not required here if you passed on the constructor").then((voted) => {
    if (voted) {
        //...
    };
});
```

## Support
Have any issue? or want us to add API support for your desire botlist? Consider joining our [Discord Server](https://discord.gg/f6Ky3QUvUF).

## License
Package is licensed under [Apache-2.0](LICENSE).