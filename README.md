# Petra

Petra is an app that connects all travellers around the world together. It allows people to discover and plan trips through the app. It also allows people to publish the activities offered by their businesses.

## 💣 Running the app

- Download [xampp](https://www.apachefriends.org/download.html).
- Run Apache & MySQL
- Clone this repository in the ```xampp/htdocs``` folder. 
- Create the database using ```server/config/petradb.sql```.
- Inside the server folder, create a .env file and check .env.example to see the needed environment variables.
- For the SECRET_KEY, you can write any random string or get your own by running this command in your node terminal
```
 console.log(require('crypto').randomBytes(256).toString('base64'));
```
- Run the client using ```ionic serve``` & start using the app 🙂

## 📱 Demo

<img style = "display: block; margin: auto" src="demo/petra.gif">