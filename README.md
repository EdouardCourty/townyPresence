# tonwyPresence
Based on my [DiscordBotTemplate](https://github.com/EdouardCourty/DiscordBotTemplate) repository.

### Features list

This bot is mainly a monitor and a 

I'm constantly adding new features, but here is a list of the ones that are actually stables.
 - Getting the skin of a player: `!getskin <PlayerName>`
 - Getting a screenshot of my claimed zone from the DynMap `!screenshot`
 - `!monitor` Starts a monitoring loop that scrapes the server's DynMap API and process the data to compute data about any foreigner being in my claims (without the ones in the `safelist.json` file)
 - `!stopMonitor` stops the monitoring service
 - `!addCheck <PlayerName>` & `!addSafe <PlayerName>` respectively adds the provided Player Name in the corresponding list
 - `!removeCheck <PlayerName>` & `!removeSafe <PlayerName>` respectively removes the provided Player Name in the corresponding list
 - `!checlkist` & `!safelist` respectively logs the users that are registered in the corresponding list
 - `!delete <1-99>` deletes the given amount of messages, up to 100.
 -  `!ping` returns in milliseconds the bot's ping, and the API latency ping

If you have any suggestions, feel ree to submit a pull request or message me on Discord: Edouard#4838

© Edouard Courty - 2020