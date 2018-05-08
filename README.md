### Initial setup

Create a [TrueLayer account](https://console.truelayer.com/?auto=signup) and take note of ``client_id``, ``client_secret`` and ``redirect_uri``.

Before running the app, create a ``config.js`` file in the ``src/`` folder.
Paste the content below into it

```js
const CLIENT_ID = "replace with the TrueLayer clientID";
const CLIENT_SECRET = "replace with secret";
const REDIRECT_URI = "replace with URI";

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
}
```

### Run the app

To start the app, run ``npm start`` and ``node server/index.js`` in two different tabs.  
Go to [http://localhost:3000/](http://localhost:3000/)

