# ResumeManager

To start the application, run the following

`git pull`

(ctrl + shift + 5) or open a split terminal


to configure backblaze
1. Create a backblaze account.
2. Go to Account->App Keys.
3. Either use the master key or create a new one depending on your choice. Just make sure the key has both read and write access.
4. Open the Server directory in the project and in the directory create a file called `.env`.
5. in the .env file, enter the following keys
    APPLICATION_KEY_ID='Your KeyID of the key'
    APPLICATION_KEY='Your Application Key'

Now to run the project:


on the left terminal

`npm i`

`cd Server`

`npm run dev`


on the right terminal

`npm i`

`cd client`

`npm start`


NOTE: frontend might be broken for a while, either me or the frontend team will fix it.

29/1/23 19:01

Entire client side ported to React.


30/09/23 9:03

updated database

30/09/23

added backblaze and optimized routes.