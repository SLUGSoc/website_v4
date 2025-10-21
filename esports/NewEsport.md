> Note: if you rename this file you MUST change the name of the file to ignore within the src/pages/esports.astro

In order to add an esport, follow the steps below:

1. Create a new folder in the format of: `<esport_name>` (i.e minecraft/) - ensuring that the text is lowercase, and that any spaces (i.e overwatch 2) are replaced with underscores _ (overwatch_2)
2. Within this folder add a new markdown (.md) files, with the __*name*__ of the esport (i.e minecraft.md),<br/> 
and an accompanying photo (logo, title, etc) in __png__ format (i.e minecraft.png)
3. Within this markdown file, copy and paste the following:
```
---
discord: https://discord.com/<link>
colour: ""
---
```
4. Fill in the fields that you just copied in. Ensure that the discord link contains the *full* link (i.e needs the https://discord.com part).
> Note: the colour should be custom hex code '#ffeeff' (Don't forget the hashtag)

Congratulations! You have successfully added a new esport!<br/>
Don't forget to save your files, rerun the dev server (as explained in the overall README) and make sure everything looks good before pushing!
