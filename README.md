# Foundation Email Preview via Storybook

This repo is a accomplishes a way to preview [Foundation Emails](https://get.foundation/emails.html) inside of [Storybook](https://storybook.js.org/).

Like the standard foundation email project, you can use the handlebars syntax, provided by [Handlebars.js](https://handlebarsjs.com/) to insert dynamic data into the templates as well as inject partials and run expressions.

Check out an example [here](https://foundation-storybook.web.app/)!

## Getting Started

1. Clone the project.
1. Open the root of the project in your terminal of choice.
1. Run `yarn` to install all the dependencies.
1. Run `yarn storybook` to begin storybook and have a the window opened in your browser.

## Building your emails

1. Ensure all the dependencies are installed.
1. Run `yarn build` and the files will be built to the `/build` directory.
   - When build, all expressions will remain in the template so they can be replaced later on the server by only running the template through handlebars. All partials will be added and the html will be converted via Inky.
