# Hello!
Congratulations - you are (probably) a new committee member of SLUGSOC (and/or a tech officer)!

If this is your first time reading this please start below:
# First Time
## Running the server locally (for development / testing)
Ensure you have [NodeJS/NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [AstroJS](https://astro.build/) installed. <br/>
Once you have installed AstroJS, navigate to the root of the project in your terminal (i.e <folder>/slugsoc) and run:
```
npm i
```
to install the necessary packages<br />
Once that is done run:
```
npx astro dev
```
(optionally add --host to make it available on your local network for testing across devices)

## Updating the live site
Once you have made the changes you need, run the necessary git commands to add and then stage your commits. If you do not know git commands you can run the two below (but be careful as you will be committing every file!)
```
git add . 
```
```
git commit -m <your message here>
```
Once that is done, and you are happy with your commits, you can type 
```git push```
This will send your changes to the github repository (remote code storage), and cloudflare (who host our site) will automatically pick up on this and start building the new site.<br/>
Wait a couple minutes then visit the live site [here](https://slugsoc.co.uk) and check out your changes.<br/> Any problems please consult the troubleshooting guide in the google drive.

# Guides
## Committee / Committee Members
Please read the guide (NewCommittee.md) on adding committee members in the committees/ folder
## Esports
Please read the guide (NewEsport.md) on adding esports in the esports/ folder
## Events
Events are pulled from the 'SLUGSoc Website' calendar. It will automatically pull the title, timings, location and description of a set event. It will give separate entries for repeating events (This is a good thing!).<br/>
In order to pull events from the calendar, there exists a Google App Script on the SLUGS Google account that pulls all associated data from the calendar and allows it to be accessed remotely. This data is safe to be revealed to the public, as it is information we will likely advertise anyway (and you shouldn't be putting private events on the SLUGSoc Website calendar anyway). 
<br/><br/>
If you *really* need to edit the code (hopefully you don't need to unless Google changes something) you can access the script via the SLUGS Google account (You must log in via MUSE for this) and then navigate to [here](https://developers.google.com/apps-script). The script is written in Javascript, and makes use of the Google 'Calendar' module.

## Social Media
To update social media, first navigate to socialLinks.js in the src/ file<br/>
Now, to update links simply replace the value for the relevant social media (i.e "instagram": "LINK HERE")
