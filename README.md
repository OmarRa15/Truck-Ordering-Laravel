# Welcome to Truck_Ordering_app!

Hi! This repository contains the backend and the frontend code for the truck ordering app

## The Backend

The backend is written in Laravel.

### To Run the Backend Server:
* Ensure you have **php** and **composer** installed.
* run `composer install` to install all the required packages.
* Ensure  you have a .env file that contains the configurations needed for the app, including the database configuration.
* Create a database with the same name that is mentioned in your .env file.
* Run `php artisan migrate` to run all the migrations and create the needed tables.
* Run `php artisan serve` to start your application

#### To Create an Admin User
* Use the endpoint: /api/register with the following Post parameters  to create a normal user.
![register endpoint](https://raw.githubusercontent.com/OmarRa15/Truck-Ordering-Laravel/main/assets/register_endpoint.png)
* Login to your MySQL shell (or whatever your DBMS is) and mark the user as admin
![mark the user as admin](https://raw.githubusercontent.com/OmarRa15/Truck-Ordering-Laravel/main/assets/mark_as_admin.png)

## The Frontend

The frontend is written in React Native with Expo.
### To Run the Frontend in an Android Emulator:
* Install Node.js and npm
* Install Expo CLI `npm install -g expo-cli`
* Install project dependencies `npm install`
* Start the Server `expo start` or `npm start`
* Press a to open in an Android Emulator or scan the QR code from Expo go app on your phone.
