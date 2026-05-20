this repo is being worked on from [codeberg.org/linkplay-space/maintainum](https://codeberg.org/linkplay-space/maintainum).

# maintainum

a foss-first recurring task list web app.

create and share lists with tasks that recur after a set number of days after you mark them as done. lists are ordered by how long (till) a task is due (again).

~~**realtime updates** means the lists are always in sync and up to date for each user and device, granted that javascript works.~~ (while building, we're focusing on a solid web-primitive (i.e. no-js dependant) base first, that will get realtime data enhancements later.)

you can create a list for your shared home chores and one for your daily habits!

## TODO

- [ ] import from doTogether option
- [ ] delete account option
- [ ] change email option [(pb)](https://pocketbase.io/docs/api-records/#email-change)
- [ ] real time updates

## development

1. setup pocketbase
   1. get v0.37.3 version of pocketbase for your os from https://pocketbase.io/docs/
   1. unzip and put `pocketbase` binary inside the repo root
1. run `cp .env.example .env`
1. run `pnpm dev` to start pocketbase and sveltekit
1. init pocketbase
   1. either pocketbase opens it's admin dashboard to prompt superuser creation, or you can find a link in the logs on first launch. complete the setup
   1. setup a smtp server for sending emails (e.g. forgot password)
