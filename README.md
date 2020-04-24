# mySelfbot
The best selfbot for Discord. Enhancing the user experience thanks to commands and smart behaviours.

### Features list

I'm constantly adding new features, nut here is a list of the ones that are actually stables.
 - Getting the avatar of a user: ``

### Environment variables
The `.env` file is not committed in git since it contains my private token.
Its structure is the following:
```dotenv
APPLICATION_TOKEN: "Your UserToken",
COMMAND_PREFIX: "!",
APPLICATION_LOG_LEVEL: "all"
```
To get your token, open Discord and enter the developer tools. <br>
If you are connected on the Discord App, press Control + Shift + I (Windows), or Option + Command + I (Macintosh). <br><br>
Then navigate to the "Application" tab, and to "Local Storage" and refresh (Control + R (Windows) or Command + R (Macintosh)). <br><br>
You should see your token appearing at the bottom of all the entries, just copy and paste it in the JSON file !

The `APPLICATION_LOG_LEVEL` entry of the `.env` file entry can be set to three different values:
 - `"all"`
 - `"messagesOnly"`
 - `"commandsOnly"`
 - `"none"`