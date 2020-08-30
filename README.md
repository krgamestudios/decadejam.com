# decadejam.com

This is the unofficial website for decade jam! If you see any eggs, please report them.

## To Build The Site Locally

* Clone the repo to your machine
* Run `npm install`
* Copy `.envdev` to `.env` and configure it for your dev environment
* Run `npm run dev`, this will initialize developer mode
* Open your browser to http://localhost:8081/

Alternatively, you can run `npm run build` to test the release build.

## Structure

There are two main parts to this project - the server and the client. The server runs on nodejs, while the client uses webpack to build a react app into the `public/` directory.

## Contributing

Open a pull request, and I'll get to it as soon as I can!

Also remember to add your name to `/client/markdown/credits.md` and "Designed and Developed By".
