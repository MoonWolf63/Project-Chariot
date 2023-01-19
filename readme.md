# Project Chariot
Project Chariot is a complete rewrite of my old project Project Alpha. The commands that are in this are !bal, !deposit, !withdraw, !bet, !work, !crime, and !blackjack. To use the !bet, !deposit, and !withdraw commands, you need to type the command without any arguments, then type the amount you want to input without any symbols. To use the !blackjack command, you need to type !blackjack without any arguments, then once you get your cards, you can type hit to get another card, or type stand to stop. To play slots, all you need to do is run the command, and it will run. DO NOT FORGET TO SET YOUR !bet.

## Installation
Note: I may add options for more database types here

To install this you must have NODEJS installed for it to properly work. You must also have a MYSQL server for user data, I suggest using xampp or ubuntu mysql.
First, you must open config.json and enter in your bot token.
Second, you must set up the database and then input the details into database.json, if you are using xampp or at least phpmyadmin create the database. You can name the database what ever you want. After creating the database import the sql file in the sql folder. If you are using command line log in through mysql -u root(INSERT YOUR USERNAME IF ITS NOT ROOT). After that enter your password and type CREATE DATABASE DBNAME(Name it what ever you like); You must end it with a ; or it wont work. After doing that type exit; and type mysql -u root -p DBNAME(The name of the database that was created) < pc.sql;.
Third, you must open index.js and add your MYSQL data to the list (I plan on later making the MYSQL data into a .json file)

## Usage

Firstly, before anything, go to the bot directory and type npm install then type node index.js to start the bot
To see your balance type the command !bal
To try an gain some money type !crime (Careful! You can also lose money!)
To deposit and withdraw your money type !deposit and !withdraw without any arguments, then type the amount.
To set your bet amount type !bet without any arguments then type the amount.
To play blackjack, type !blackjack then type hit or stand depending on which you want
To play slots just type !slots

TO KEEP IT CONSTANTLY RUNNING DO npm install forever THEN TYPE forever index.js

## Updates (V.1.0) 19.1.23

Bot Created

Command Added: !bal

Command Added !work

Command Added !crime

Command Added !deposit

Command added !withdraw

Command added !bet

Command added !blackjack

Command added !slots


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Info

You may not claim this bot as your own. This is for everyone but you must give credit to the creator.

This is still in development and may not be stable
