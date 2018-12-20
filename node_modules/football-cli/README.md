# ⚽️ football-cli

This is a simple command line application written in node to show football results in the command line. It uses my [very simple wrapper ](https://github.com/c0dr/node-football-data) around the football-data.org API.

The current alpha version supports todays euro matches, but the goal is obviously to add more features.


## Installation

`````
npm install football-cli --g
`````


## Example usage

````bash
$ football-cli

┌────────┬───────┬───────┬─────────┬──────────┐
│ Home   │ Goals │ Goals │ Away    │ Kick-off │
├────────┼───────┼───────┼─────────┼──────────┤
│ France │ 0     │ 0     │ Romania │ 21:00:00 │
└────────┴───────┴───────┴─────────┴──────────┘

````

## License

MIT
