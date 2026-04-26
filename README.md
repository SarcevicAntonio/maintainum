# maintainum

a foss-first doTogether successor that helps you keep track of stuff you have get done via **a List of recurring Tasks**.

Each **Task** has a certain number of days it takes to recur. When you mark a Task as done, it will recur after that set amount of days. **Lists** contain Tasks and can be shared with other people, so you can work on Tasks together. The List is ordered by the remaining / overdue days of each Task.

The app is build to be as **simple as possible**, so you can focus on getting stuff done instead of figuring out all the features. It's also build to be used with multiple people. **Realtime data** means the Lists are always in sync and up to date, but you can of course also use the app by yourself. You can create a List for your shared home chores and one for your daily habits!

## Development

1. get v0.37.3 version of pocketbase for your os from https://pocketbase.io/docs/
1. unzip and put `pocketbase` binary inside the repo root
1. run `cp .env.example .env`
1. run `pnpm dev` to start pocketbase and sveltekit
