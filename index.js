//This is the initialization, DO NOT CHANGE ANY OF THIS OR IT WILL NOT WORK!
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedBuilder } = require('discord.js');
const mysql = require('mysql');
const depository = new Set(); //A user will get added here when they perform the command !deposit
const withdrawlery = new Set(); //A user will get added here when they perform the command !withdraw
const bettery = new Set(); //A user will get added here when they perform the command !bet
const jailed = new Set(); //A user will get added here when they get the bad part of the crime command
const blackjack = new Set(); //A user will get added here when they enter the blackjack command
const horserace = new Set();
const bjmap = new Map();
const horsenames = ["Scarlette", "Bambi", "Eclipse", "Winky", "Barbado","Lavarson","Exterminator","Foxy","Risky Business", "Tabby Cat", "Dont Bother", "Lost Cause", "Minecraft", "Why should I", "Clinton","Firefly","Murder","Twinkle Eyes","Munich","Berlin","Coppenhagen","Your Worst Nightmare","Hay Bale","War Crimes"];
//This is the database configuration, if your confused at this point, please refer to the readme if I bothered to create it

const BlackJackSet = ["A","A","A",2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,"J","J","J","Q","Q","Q","K","K","K"]
var horse1name = null;
var horse2name = null;
var horse3name = null;
var horse4name = null;
var horse5name = null;
var horse6name = null;
var horse1odds = null;
var horse2odds = null;
var horse3odds = null;
var horse4odds = null;
var horse5odds = null;
var horse6odds = null;

function ShuffleNames(){
    horse1Name = horsenames[Math.floor(Math.random() * horsenames.length)];
    horse2Name = horsenames[Math.floor(Math.random() * horsenames.length)];
    horse3Name = horsenames[Math.floor(Math.random() * horsenames.length)];
    horse4Name = horsenames[Math.floor(Math.random() * horsenames.length)];
    horse5Name = horsenames[Math.floor(Math.random() * horsenames.length)];
    horse6Name = horsenames[Math.floor(Math.random() * horsenames.length)];
}

function shuffleOdds(){
    horse1odds = Math.floor(Math.random() * 100)
    horse2odds = Math.floor(Math.random() * 100)
    horse3odds = Math.floor(Math.random() * 100)
    horse4odds = Math.floor(Math.random() * 100)
    horse5odds = Math.floor(Math.random() * 100)
    horse6odds = Math.floor(Math.random() * 100)
}

shuffleOdds();
ShuffleNames();



var horseRaceActive = false;
function createRand(number){
    return(Math.floor(Math.random()* number))
}

const db_config = require('./database.json');
//This function creates a embed so that each message that is sent can look pretty. I didnt feel like creating a unique name so you get exampleEmbed.
function createEmbed(color, user, message, result) {

if (message != 'null'){
    let exampleEmbed = new EmbedBuilder()
	.setColor(color)
	.setTitle('Project Chariot')
	.setAuthor({ name: user.username })
	.setDescription(message)
	.setThumbnail(user.displayAvatarURL())
	.setTimestamp()
    return({ embeds: [exampleEmbed] });
} else {
    let fuckery1 = JSON.stringify(result.balance);
    let fuckery2 = JSON.stringify(result.bank);
    let fuckery3 = JSON.stringify(result.betAmount);
    console.log(fuckery1);
    console.log(fuckery2);
        let exampleEmbed2 = new EmbedBuilder()
        .setColor(color)
        .setTitle('Project Chariot')
        .setAuthor({ name: user.username })
        
        .addFields(
            { name: ':dollar: Cash', value: fuckery1, inline: true },
            { name: ':bank: Bank', value: fuckery2, inline: true },
            { name: ':coin: Bet', value: fuckery3, inline: true }
                )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        return({ embeds: [exampleEmbed2] });
        }


}
//These are the arrays of text for the crime commands
const crimeWinArray = ["You mug a stranger walking down a suspicious and he hands you his wallet, you proceed to get away with his money.", "You find a wallet on the street and take it.", "You kidnap a stranger and send a ransom note to the family stating to bring a disclosed amount to the old abandoned warehouse. They of course bring it, and you run off with the money.","You Rob a bank with your crew dressed as the scooby doo gang and make off with the money from the giant safe."]
const crimeLoseArray = ["You attempt to mug a stranger in a dark alley, but they pull out a gun and they proceed to mug you instead.","You attempt to rob a bank with your crew dressed as United States presidents, however, they managed to track the order of president masks and take you. You are fined a disclosed amount of money.","You try to break in a house and steal their belongings when a large fellow starts running towards you. In a panic, you flee while also dropping your wallet."]
function startRace(message) {
    let randHorse = createRand(6);
    switch(randHorse) {
        case 0:
            Object.keys(horserace).forEach(key => {
                console.log("FUCK" + key, obj[key]);
              });
              break;
        case 1:
            Object.keys(horserace).forEach(key => {
                console.log("FUCK" + key, obj[key]);
              });
              break;
        case 2:
            Object.keys(horserace).forEach(key => {
                console.log("FUCK" + key, obj[key]);
              });
        break;
        case 3: 
        Object.keys(horserace).forEach(key => {
            console.log("FUCK" + key, obj[key]);
          });
          break;
          case 4:
            Object.keys(horserace).forEach(key => {
                console.log("FUCK" + key, obj[key]);
              });
              break;
        case 5: 
        Object.keys(horserace).forEach(key => {
            console.log("FUCK" + key, obj[key]);
          });
          break;
    }
}
//this is the function that give out the odds of winning/losing the crime balance
function setLuck(){
    let luck = Math.floor(Math.random() * 100);
    if (luck > 80) {
        return true;
    } else if (luck <= 80 && luck > 10) {
        return false;
    } else if (luck <= 10) {
        return 'ha'
    }
}
//This is the function that creates the slot machine, I find that this is much more efficient and easier to understand than whatever the mess I had earlier was
function slotMachine(){
    let slot1 = Math.floor(Math.random() * 6);
    let slot2 = Math.floor(Math.random() * 6);
    let slot3 = Math.floor(Math.random() * 6);
    let slot4 = Math.floor(Math.random() * 6);
    let slot5 = Math.floor(Math.random() * 6);
    let slot6 = Math.floor(Math.random() * 6);
    let slot7 = Math.floor(Math.random() * 6);
    let slot8 = Math.floor(Math.random() * 6);
    let slot9 = Math.floor(Math.random() * 6);
    let obj = {
        slot1: slot1,
        slot2: slot2,
        slot3: slot3,
        slot4: slot4,
        slot5: slot5,
        slot6: slot6,
        slot7: slot7,
        slot8: slot8,
        slot9: slot9
    }
    return obj;

}

function parseSlots(str) {
    if (str == 0){
        return 3
    }
    if (str == 1) {
        return 3
    }
    if (str == 2){
        return 3
    }
    if (str == 3) {
        return 4
    }
    if (str == 4){
        return 10
    }
    if (str = 5){
        return 17
    }
}

function getSlots(a,b,c,d,e,f,g,h,i){
    let am = null;
    let bm = null;
    let cm = null;
    let dm = null;
    let em = null;
    let fm = null;
    let gm = null;
    let hm = null;
    let im = null;

    switch(a){
        case 0:
            am = ':apple:'
            break;
        case 1:
            am = ':orange_circle:'
            break;
        case 2:
            am = ':watermelon:'
            break;
        case 3:
            am = ':cherries:'
            break;
        case 4:
            am = ':coin:';
            break;
        case 5: 
            am = ':bell:'
    }
    switch(b){
        case 0:
            bm = ':apple:'
            break;
        case 1:
            bm = ':orange_circle:'
            break;
        case 2:
            bm = ':watermelon:'
            break;
        case 3:
            bm = ':cherries:'
            break;
        case 4:
            bm = ':coin:';
            break;
        case 5: 
            bm = ':bell:'
    }
    switch(c){
        case 0:
            cm = ':apple:'
            break;
        case 1:
            cm = ':orange_circle:'
            break;
        case 2:
            cm = ':watermelon:'
            break;
        case 3:
            cm = ':cherries:'
            break;
        case 4:
            cm = ':coin:';
            break;
        case 5: 
            cm = ':bell:'
    }
    switch(d){
        case 0:
            dm = ':apple:'
            break;
        case 1:
            dm = ':orange_circle:'
            break;
        case 2:
            dm = ':watermelon:'
            break;
        case 3:
            dm = ':cherries:'
            break;
        case 4:
            dm = ':coin:';
            break;
        case 5: 
            dm = ':bell:'
    }
    switch(e){
        case 0:
            em = ':apple:'
            break;
        case 1:
            em = ':orange_circle:'
            break;
        case 2:
            em = ':watermelon:'
            break;
        case 3:
            em = ':cherries:'
            break;
        case 4:
            em = ':coin:';
            break;
        case 5: 
            em = ':bell:'
    }
    switch(f){
        case 0:
            fm = ':apple:'
            break;
        case 1:
            fm = ':orange_circle:'
            break;
        case 2:
            fm = ':watermelon:'
            break;
        case 3:
            fm = ':cherries:'
            break;
        case 4:
            fm = ':coin:';
            break;
        case 5: 
            fm = ':bell:'
    }
    switch(g){
        case 0:
            gm = ':apple:'
            break;
        case 1:
            gm = ':orange_circle:'
            break;
        case 2:
            gm = ':watermelon:'
            break;
        case 3:
            gm = ':cherries:'
            break;
        case 4:
            gm = ':coin:';
            break;
        case 5: 
            gm = ':bell:'
    }
    switch(h){
        case 0:
            hm = ':apple:'
            break;
        case 1:
            hm = ':orange_circle:'
            break;
        case 2:
            hm = ':watermelon:'
            break;
        case 3:
            hm = ':cherries:'
            break;
        case 4:
            hm = ':coin:';
            break;
        case 5: 
            hm = ':bell:'
    }
    switch(i){
        case 0:
            im = ':apple:'
            break;
        case 1:
            im = ':orange_circle:'
            break;
        case 2:
            im = ':watermelon:'
            break;
        case 3:
            im = ':cherries:'
            break;
        case 4:
            im = ':coin:';
            break;
        case 5: 
            im = ':bell:'
    }
return (am + bm + cm + "\n" + dm + em + fm + "\n" + gm + hm + im)
}
//Assuming that this actually works, this will update the database and properly add OR subtract a users balance/bank amount
function updateDatabase (type,amount, account, action){
    if (!Number.isNaN(amount)){
    if (!amount.includes('`')){
    let connection = mysql.createConnection(db_config);
    connection.connect();
    switch(type){
        case 'user':
            switch(action) {
            case 'add':
                connection.query(`UPDATE users SET balance = balance +${amount} WHERE usid ="${account}"`)
                break;
            case 'sub':
                connection.query(`UPDATE users SET balance = balance -${amount} WHERE usid ="${account}"`)
                break;
            case 'change':
                connection.query(`UPDATE users SET betAmount = ${amount} WHERE usid = "${account}"`);
            }
   
    break;
    case 'bank':
        switch(action) {
            case 'add':
                connection.query(`UPDATE users SET bank = bank +${amount} WHERE usid = "${account}"`)
                break;
            case 'sub':
                connection.query(`UPDATE users SET bank = bank -${amount} WHERE usid = "${account}"`)
        }
    }
    connection.end();
} else {
    return "An error has occured [Symbol ` is not supported!]";
}
} else {
    return "An error has occured [You have supplied a string instead of an integer, which is not supported!]";
}
}
//Phrases that are used in the !work command
const workArray = ["You work at a grocery store.", "You work at a petrol station.", "You work for at an amusement park.", "You work at a prison.", "You work at a restaurant.", "You work at a hospital.", "You work as a bus driver.","You sell pictures online to strangers."];
//I have no idea how any of these are used, but it works so DO NOT CHANGE IT!
const client = new Client({ partials: ["CHANNEL"],intents: [GatewayIntentBits.Guilds,    GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers] });

//take a guess
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setActivity("!help");
});
//I assume that this is some kind of error handler that will MOST LIKELY NOT EVEN WORK!
client.once(Events.Error, c => {
    console.log("An error has occured, this bot has gathered this information: " + c + ".")
})

//Creates the user when the function is called (mostly during the intital phase of every single command that I have)
function createUser(token) {
    let connection = mysql.createConnection(db_config);
    connection.connect(function(err){
        if (err) {
            console.log("An error has occured, this bot cannot reach the database listed and has gather this information: " + err.message);
        }
    })
    //let query is not required, I just put it there because its what I'm used to.
let query = connection.query("INSERT INTO users (`usid`) VALUES ('" + token + "')", function (err) {
if (err) {
    console.log("An error has occurred while inserting user into the database: " + err.message)
} else {
    connection.end();
}
})
}



//Above is all of the essentials

//here is where the user can check their balance
client.on("messageCreate", (message) => {
if (message.content.includes("!bal")) {
let connection = mysql.createConnection(db_config);
connection.connect();
//Again, let query is not required
let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
    //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
    //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
    //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
    switch(Object.keys(result).length){
        case 0:
            createUser(message.author.id);
            message.reply("You do not currently have an account, one has been created for you!");
            connection.end();
            break;
        case 1:
            connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
let cardy = createEmbed(0x0099FF, message.author, 'null', result[0]);
 message.channel.send(cardy);
                connection.end();
            })
    }
})
}
    if (message.content.includes("!help")) {
    let connection = mysql.createConnection(db_config);
    connection.connect();
    //Again, let query is not required
    let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
        //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
        //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
                connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
    let cardy = createEmbed(0x0099FF, message.author, 'Welcome to Project Chariot! Our current commands include ```!deposit, !withdraw, !bal, !slots, !work, !crime, !bet, !blackjack```To use the !bet, !withdraw, and !deposit commands, type the command, then say in the chat without any symbols or even the prefix the amount you want. To play blackjack, type the command !blackjack and if you meet the prerequisites, you will be given to cards. All you have to do is type hit to get another card and type stand to stop');
     message.channel.send(cardy);
                    connection.end();
                })
        }
    })
    }
//Simple enough, it allows users to be able to make a small amount of money and also grabs a random array of phrases that I've listed above in the const workArray. After that, it grabs a random amount (from 1-1000) and then inserts that into their balance.
    if (message.content.includes("!work")){
        if(!jailed.has(message.author.id)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
                let getLength = workArray.length;
                let workRand = Math.floor(Math.random() * (getLength - 0)) + 0;
                let receiveAmount = Math.floor(Math.random() * 1000);
                let maggy = createEmbed("#06A401", message.author, `${workArray[workRand]} You have reveived $${receiveAmount}`)
                updateDatabase('user',receiveAmount,message.author.id,'add');
                message.channel.send(maggy);
                break;
        }
        connection.end();
    });
    } else {
        message.reply("You have been jailed! Please wait 1 minute after the jailing.")
    }
}

// This contains the code for the crime command. I swear, I am close to just writing a dummy function that just lets me search for it to get each block. As of version 1 there are 2 possibilities. Winning a certain amount or losing a certain amount. To increase the odds, lower the luck number in the setLuck() function.
if (message.content.includes("!crime")){
    if (!jailed.has(message.author.id)){
    let connection = mysql.createConnection(db_config);
    connection.connect();
    let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
    switch(Object.keys(result).length){
        case 0:
            createUser(message.author.id);
            message.reply("You do not currently have an account, one has been created for you!");
            connection.end();
            break;
        case 1:
            let lucky = setLuck();
            if (result[0].balance >= 1){
                //for anyone wondering why I have a switch here, it's just to shorten the block. I put a function called setLuck() so I dont have to have this entire mess that I can barely read.
            switch (lucky) {
                case true:
                    let getLength = crimeWinArray.length;
                    let crimeWinRand = Math.floor(Math.random() * (getLength - 0)) + 0;
                    let receiveAmount = Math.floor(Math.random() * 7000);
                    let maggy = createEmbed("#06A401", message.author, `${crimeWinArray[crimeWinRand]} You have received ${receiveAmount}`)
                    message.channel.send(maggy);
                    updateDatabase('user',receiveAmount,message.author.id,'add');

                    break;
                case false: 
                    let getLength2 = crimeLoseArray.length;
                    let crimeLoseRand = Math.floor(Math.random() * (getLength2 - 0)) + 0;
                    let loseAmount = Math.floor(Math.random() * 7000);
                    let maggy2 = createEmbed("FF0000", message.author, `${crimeLoseArray[crimeLoseRand]} You have lost ${ loseAmount} and have been jailed for 1 minute`)
                    message.channel.send(maggy2);
                    updateDatabase('user',loseAmount,message.author.id,'sub');
                    jailed.add(message.author.id);
                        setTimeout(() => {
                          // Removes the user from the set after a minute
                          jailed.delete(message.author.id);
                        }, 60000);
                    break;
                case 'ha':
                    let getLength3 = crimeLoseArray.length;
                    let crimeLoseRand2 = Math.floor(Math.random() * (getLength3 - 0)) + 0;
                    let maggy3 = createEmbed("FF0000", message.author, `${crimeLoseArray[crimeLoseRand2]} You have been jailed for 1 minute`)
                    message.channel.send(maggy3);
                    jailed.add(message.author.id);
                        setTimeout(() => {
                          // Removes the user from the set after a minute
                          jailed.delete(message.author.id);
                        }, 60000);
            }
        } else {
            message.reply("LMAO You broke asf")
        }
    }
    connection.end();
});
} else {
    message.reply("You have been jailed! Please wait 1 minute after the jailing.")
}
    }

//This is for the bank system, the syntax for it is just !deposit.moneyamount. Im too lazy to write actual command arguments, plus theres a change that Ill completely change all of this to be able to use commands
    if (message.content.startsWith('!deposit')) {
        if (!jailed.has(message.author.id)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        //Again, let query is not required
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
            //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
            //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
            //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
            switch(Object.keys(result).length){
                case 0:
                    createUser(message.author.id);
                    message.reply("You do not currently have an account, one has been created for you!");
                    connection.end();
                    break;
                case 1:
                    if (result[0].balance >= 1 && result[0].balance >= 1 && !withdrawlery.has(message.author.id)){
                        depository.add(message.author.id);
                        message.reply("Please enter the amount you wish to deposit without any symbols!")
                    } else {
                        let fuckery = createEmbed("FF0000", message.author, `You either mistyped, or you do not have enough money in your account. Current Balance: ${result[0].balance}`)
                        message.channel.send(fuckery);
                    }
            }
            connection.end();
        })

    } else {
        message.reply("You have been jailed! Please wait 1 minute after the jailing.")
    }
}
})

//Yeah.... this is just the part for depositing I have no idea how this is even functioning properly, but it works so for the love of fuck, DO NOT CHANGE
client.on("messageCreate", (message) => {
    console.log(depository);
    if (depository.has(message.author.id) && !withdrawlery.has(message.author.id)) {
        console.log("User is there!")
     if (!Number.isNaN(message.content)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
                if (result[0].balance >= 1){
                    console.log("This test passed")
           if (message.content <= result[0].balance && message.content >= 1) {
            console.log("Well then")
            updateDatabase('user', message.content, message.author.id, 'sub');
            updateDatabase('bank', message.content, message.author.id, 'add');
            message.reply("Deposited " + message.content)
            depository.delete(message.author.id);
           }
            } else {
                message.reply("LMAO You broke asf")
            }
        }
        connection.end();
    });
     }   else {
        switch(message.content) {
            case 'all':
                updateDatabase('user', result[0], message.author.id, 'sub');
            updateDatabase('bank', result[0], message.author.id, 'add');
            depository.delete(message.author.id);
            break;
            case 'cancel':
                depository.delete(message.author.id);
                break;
        }
     }
    }
})
//gain the withdraw stuff
client.on("messageCreate", (message) => {
    if (message.content.startsWith('!withdraw')) {
        if (!jailed.has(message.author.id)) {
        let connection = mysql.createConnection(db_config);
        connection.connect();
        //Again, let query is not required
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
            //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
            //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
            //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
            switch(Object.keys(result).length){
                case 0:
                    createUser(message.author.id);
                    message.reply("You do not currently have an account, one has been created for you!");
                    connection.end();
                    break;
                case 1:
                    if (result[0].bank >= 1 && !depository.has(message.author.id)){
                        withdrawlery.add(message.author.id);
                        message.reply("Please enter the amount you wish to deposit without any symbols!")
                    } else {
                        let fuckery = createEmbed("FF0000", message.author, `You either mistyped, or you do not have enough money in your account. Current Balance: ${result[0].bank}`)
                        message.channel.send(fuckery);
                    }
                    connection.end();
            }
        })

    } else {
        message.reply("You have been jailed! Please wait 1 minute after the jailing.")
    }
}
})
//The withdraw part
client.on("messageCreate", (message) => {
    console.log(withdrawlery);
    if (withdrawlery.has(message.author.id) && !depository.has(message.author.id)) {
        console.log("User is there!")
     if (!Number.isNaN(message.content)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
                if (result[0].bank >= 1){
                    console.log("This test passed")
           if (message.content <= result[0].bank && message.content >= 1) {
            console.log("Well then")
            updateDatabase('user', message.content, message.author.id, 'add');
            updateDatabase('bank', message.content, message.author.id, 'sub');
            message.reply("Withdrew " + message.content)
            withdrawlery.delete(message.author.id);
           } else {
            message.reply("Insufficient funds")
           }
            } else {
                message.reply("LMAO You broke asf")
            }
            connection.end();
        }
    });
     }   else {
        switch(message.content) {
            case 'all':
                updateDatabase('user', result[0], message.author.id, 'add');
            updateDatabase('bank', result[0], message.author.id, 'sub');
            withdrawlery.delete(message.author.id);
            connectio.end();
            break;
            case 'cancel':
                withdrawlery.delete(message.author.id);
                connection.end();
                break;
        }
     }
    }
})
//Here is the part where the users can set what they want their bet to be
client.on("messageCreate", (message) => {
    if (message.content.startsWith('!bet')) {
        if(!jailed.has(message.author.id)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        //Again, let query is not required
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
            //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
            //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
            //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
            switch(Object.keys(result).length){
                case 0:
                    createUser(message.author.id);
                    message.reply("You do not currently have an account, one has been created for you!");
                    connection.end();
                    break;
                case 1:
                    if (result[0].balance >= 1 && result[0].bank >= 1 && !depository.has(message.author.id) && !withdrawlery.has(message.author.id)){
                        bettery.add(message.author.id);
                        message.reply("Please enter the amount you wish to deposit without any symbols!")
                        connection.end();
                    } else {
                        let fuckery = createEmbed("FF0000", message.author, `You either mistyped, or you do not have enough money in your account. Current Balance: ${result[0].balance}`)
                        message.channel.send(fuckery);
                        connection.end();
                    }
            }
        })

    } else {
        message.reply("You have been jailed! Please wait 1 minute after the jailing.")
    }
}
})
//The chat sniffer that gets a user IF AND ONLY IF they are in the bettery.
client.on("messageCreate", (message) => {
    if (!withdrawlery.has(message.author.id) && !depository.has(message.author.id) && bettery.has(message.author.id)) {
     if (!Number.isNaN(message.content)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
            updateDatabase('user', message.content, message.author.id, 'change');
            message.reply("Set your bet to " + message.content)
            bettery.delete(message.author.id);
            connection.end();
        }
    });
     }   else {
        //ignore this, I just...reaaaaaly dont feel like changing it
        switch(message.content) {
            case 'cancel':
                bettery.delete(message.author.id);
                connection.end();
                break;
        }
     }
    }
})
//An here is the command you all know and love, the slot machine
client.on("messageCreate", (message) => {
    if (message.content.includes("!slots")){
        if(!jailed.has(message.author.id)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
        switch(Object.keys(result).length){
            case 0:
                createUser(message.author.id);
                message.reply("You do not currently have an account, one has been created for you!");
                connection.end();
                break;
            case 1:
if (result[0].betAmount <=0){
message.reply("Invalid bet amount")
connection.end();
} else {
    if (result[0].balance >= 1 && result[0].balance >= result[0].betAmount){
    let amount = 0;
    let slot = slotMachine()
    if (slot.slot1 == slot.slot2 && slot.slot2 == slot.slot3){
amount = amount + parseSlots(slot.slot1)
    }
    if (slot.slot4 == slot.slot5 && slot.slot5 == slot.slot6){
        amount = amount + parseSlots(slot.slot4)
    }
    if (slot.slot7 == slot.slot8 && slot.slot8 == slot.slot9){
        amount = amount + parseSlots(slot.slot7)
    }
    if (slot.slot1 == slot.slot5 && slot.slot5 == slot.slot9){
     amount = amount + parseSlots(slot.slot1);   
    }
    if (slot.slot3 == slot.slot5 && slot.slot5 == slot.slot7){
        amount = amount + parseSlots(slot.slot3);
    }
    if (slot.slot1 == slot.slot3 && slot.slot1 == slot.slot7 && slot.slot7 == slot.slot9){
        amount = amount + 50 + parseSlots(slot.slot1);
    }
    console.log(slot);
    console.log(slot[0])
    updateDatabase('user',result[0].betAmount,message.author.id,'sub');
if (amount != 0){
    let receiveAmount = amount * result[0].betAmount + result[0].betAmount
    let slotty = getSlots(slot.slot1,slot.slot2,slot.slot3,slot.slot4,slot.slot5,slot.slot6,slot.slot7,slot.slot8,slot.slot9)
    let maggy = createEmbed("#06A401", message.author, `${slotty} You have reveived $${receiveAmount}`)
    updateDatabase('user',receiveAmount,message.author.id,'add');
    message.channel.send(maggy);
    connection.end();
} else {
    let receiveAmount = amount
    let slotty = getSlots(slot.slot1,slot.slot2,slot.slot3,slot.slot4,slot.slot5,slot.slot6,slot.slot7,slot.slot8,slot.slot9)
    let maggy = createEmbed("#06A401", message.author, `${slotty} You lose!`)
    message.channel.send(maggy);
    connection.end();
}
} else {
    message.reply("Nah you broke frfr")
    connection.end();
}
}

                break;
        }
    });
    } else {
        message.reply("You have been jailed! Please wait 1 minute after the jailing.")
    }
}
});
//You'd think that considering my ADHD I wouldn't be THIS motivated to create an entire bot without any stopping
// This is the blackjack area, and here is where shit will hit the fan, if I can barely understand it, then I highly doubt that anyone reading this code will be able to understand it
client.on("messageCreate", (message) => {
    if (message.content.startsWith('!blackjack')) {
        if (!jailed.has(message.author.id)){
        let connection = mysql.createConnection(db_config);
        connection.connect();
        //Again, let query is not required
        let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
            //Simple to understand, assuming that it actually even works, it checks if there are any users using that id and if there isnt, then it will use the createUser function, and if there is a user, it will actually show the balance in their account.
            //You will absolutely see this across the entire code as it is a necessity for basic authentication because if it didn't work, then the entire bot would crash due to my incompetence to add ERROR HANDLING.
            //You can see that I even added a handler for the error handling, yet I'm too lazy to actually go through the entire process of editing every little bit that uses this snippet
            switch(Object.keys(result).length){
                case 0:
                    createUser(message.author.id);
                    message.reply("You do not currently have an account, one has been created for you!");
                    connection.end();
                    break;
                case 1:
                    if (result[0].balance >= 1 && result[0].balance >= 1 && !withdrawlery.has(message.author.id) && !depository.has(message.author.id) && !bettery.has(message.author.id) && !jailed.has(message.author.id) && !blackjack.has(message.author.id)){
                        blackjack.add(message.author.id);
                        let hand1 = createRand(BlackJackSet.length);
                        let hand1N = BlackJackSet[hand1]
                        let hand1NO = null
                        if (hand1N == 'A') {
                            hand1NO = 11
                        } else 
                        if (hand1N == 'K' || hand1N == 'Q' || hand1N == 'J'){
                            hand1NO = 10
                        } else {
                            hand1NO = hand1N
                        }
let hand2 = createRand(BlackJackSet.length);
let hand2N = BlackJackSet[hand2];
let hand2NO = null
if (hand2N == 'A') {
    hand1NO = 11;
} else if(hand2N == 'K' || hand2N == 'Q' || hand2N == 'J'){
hand2NO = 10;
} else {
    hand2NO = hand2N
}
let sert = "Your cards are " + hand1N + " and " + hand2N + " with a total of " + (hand1NO + hand2NO);
let fuckery2 = createEmbed("#06A401",message.author,sert);
message.channel.send(fuckery2)
blackjack.add(message.author.id);
bjmap.set(message.author.id,hand1NO + hand2NO);
updateDatabase('user',result[0].betAmount,message.author.id,'sub');
console.log(bjmap);


                    } else {
                        let fuckery = createEmbed("FF0000", message.author, `You either mistyped, are already in a game, or you do not have enough money in your account. Current Balance: ${result[0].balance}`)
                        message.channel.send(fuckery);
                    }
            }
            connection.end();
        })
    }
}
    });

    client.on("messageCreate", (message) => {
        if (!withdrawlery.has(message.author.id) && !depository.has(message.author.id) && !bettery.has(message.author.id) && blackjack.has(message.author.id) && !horserace.has(message.author.id)) {
            let connection = mysql.createConnection(db_config);
            connection.connect();
            //Again, let query is not required
            let query = connection.query('SELECT * FROM users WHERE usid = "' + message.author.id + '"', function (err, result) {
                
if (message.content.toLowerCase() == "hit"){
        let mappery = bjmap.get(message.author.id);
        let fuckery = createRand(BlackJackSet.length);
        let getFuckd = BlackJackSet[fuckery]
        let IFuckur = null;
        let mat = null
        if (getFuckd == 'A') {
            if (mappery + 11 > 21){
                IFuckur = 1
            } else {
                IFuckur = 11;
            }
        } else if (getFuckd == 'K' || getFuckd == 'Q' || getFuckd == 'J'){
            IFuckur = 10;
        } else {
            IFuckur = getFuckd;
        }
        console.log(getFuckd);
        bjmap.set(message.author.id,mappery + IFuckur);
        if (IFuckur + mappery < 22){
            mat = "What will you do next?";
        } else {
            mat = "BUST!"
            blackjack.delete(message.author.id);
        }
        let mon = createEmbed("06A401", message.author, `Your card is ${IFuckur}. You now have ${IFuckur + mappery}. ${mat}`)
        console.log(IFuckur + "," + mappery)
        message.channel.send(mon)
            } else if (message.content.toLowerCase() == "stand"){

            if (bjmap.get(message.author.id) == 21) { 
                let receiveAmount = result[0].betAmount * 2 +result[0].betAmount;
                updateDatabase('user',receiveAmount,message.author.id,'add');
                let apple = createEmbed("06A401", message.author, `You win $${result[0].betAmount * 2 + result[0].betAmount}.`)
                message.channel.send(apple);
                blackjack.delete(message.author.id);
            } else {
                let dealer = 0;
                while (dealer != 40){
                    let mappery = bjmap.get(message.author.id);
        let fuckery = createRand(BlackJackSet.length);
        let getFuckd = BlackJackSet[fuckery]
        let IFuckur = null;
        if (getFuckd == 'A') {
            if (mappery + 11 > 21){
                IFuckur = 1
            } else {
                IFuckur = 11;
            }
        } else if (getFuckd == 'K' || getFuckd == 'Q' || getFuckd == 'J'){
            IFuckur = 10;
        } else {
            IFuckur = getFuckd;
        }
        dealer = dealer + IFuckur
if (dealer > bjmap.get(message.author.id) && dealer <= 21){
    console.log("doing actions")
    let apple = createEmbed("06A401", message.author, `You lose, dealer has ${dealer}.`)
    message.channel.send(apple);
    blackjack.delete(message.author.id);
    console.log(dealer)
    
    break;
} else if (dealer === 21) {
    let apple = createEmbed("06A401", message.author, `You lose, dealer has ${dealer}.`)
    message.channel.send(apple);
    blackjack.delete(message.author.id);
    console.log(message.author)
    console.log(dealer)
    break;
} else if (dealer >= 22){
    let apple = createEmbed("06A401", message.author, `You win $${result[0].betAmount * 2 + result[0].betAmount}, dealer busts on ${dealer}.`)
    message.channel.send(apple);
    let receiveAmount = result[0].betAmount * 2 + result[0].betAmount;
    updateDatabase('user',receiveAmount,message.author.id,'add');
    blackjack.delete(message.author.id);
    console.log(message.author);

    break;
}
blackjack.delete(message.author.id);
}
                }
            }
            connection.end();
        });

        }
    })



    
// Log in to Discord with your client's token
client.login(token);