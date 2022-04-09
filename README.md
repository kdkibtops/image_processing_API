# Imsge processing API Project
* [json scripts](##json_Scripts)
* [Instructions](##instructions)
* [Extras](##listening_port)
* [Author](***Mustafa Heidar***)
* [Version](1.3)



## json_Scripts

- build: ```npm run build```
- lint: ```npm run lint```
- prettier: ```npm run prettier```
- jasmine: ```npm run jasmine```
- test: ```npx tsc && jasmine```
- nodemon: ```npm run start```


## instructions
**main URL:**
http://localhost:3000/ ==> will instruct the user to go to /resizeImg route
**resize route**
resize Image url:
http://localhost:3000/resizeImg ==> if no input was entered, will instruct the user to enter input

**functionality route**
to get your processed image:
http://localhost:3000/resizeImg?filename=fjord.jpg&width=ds&height=300
enter the following url, but change filename, wwidth and height according to your prefernces.

### listening_port
The server will listen on port 3000:
