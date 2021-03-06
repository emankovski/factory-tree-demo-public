## Challenge description:

Demonstrate​ ​your​ ​knowledge​ ​of​ ​several​ ​technologies,​ ​including​ ​databases,​ ​backend​ ​design,​ ​and​ ​UI/UX​ ​by creating​ ​a​ ​live-updating​ ​tree​ ​view​ ​as​ ​a​ ​web​ ​application.

The​ ​tree​ ​should​ ​contain​ ​a​ ​group​ ​of​ ​nodes,​ ​with​ ​a main​ ​(root)​ ​node​ ​that​ ​can​ ​have​ ​any​ ​number​ ​of ‘factories’.

These​ ​factory​ ​nodes​ ​can​ ​in​ ​turn​ ​generate​ ​a​ ​set amount​ ​of​ ​random​ ​numbers​ ​(up​ ​to​ ​15), represented​ ​as​ ​child​ ​nodes​ ​of​ ​their​ ​respective factories.

Factories​ ​and​ ​children​ ​should​ ​be​ ​created through​ ​some​ ​means​ ​of​ ​user​ ​input​ ​(right​ ​click, button​ ​press,​ ​etc)​ ​specifying​ ​the​ ​number​ ​of children​ ​to​ ​generate​ ​(up​ ​to​ ​15)​ ​and​ ​the​ ​ranges​ ​of those​ ​children.

Factories​ ​should​ ​have​ ​an​ ​adjustable​ ​name assigned​ ​to​ ​them,​ ​be​ ​removable,​ ​and​ ​have​ ​an adjustable​ ​lower​ ​and​ ​upper​ ​bound​ ​for​ ​the random​ ​number​ ​generation.

All​ ​users​ ​should​ ​see​ ​any​ ​changes​ ​made​ ​to the​ ​tree​ ​immediately​ ​across​ ​browsers without​ ​refreshing​ ​or​ ​polling.

The​ ​state​ ​of​ ​the​ ​tree​ ​should​ ​remain persistent;​ ​reloading​ ​should​ ​not​ ​undo​ ​any state.

All​ ​of​ ​a​ ​factory’s​ ​existing​ ​child​ ​nodes​ ​should be​ ​removed​ ​upon​ ​each​ ​new​ ​generation.

Your​ ​project​ ​should​ ​be​ ​secure,​ ​validate inputs,​ ​and​ ​protect​ ​against​ ​injections.

Your​ ​project​ ​should​ ​be​ ​hosted​ ​on​ ​the​ ​web using​ ​a​ ​service​ ​such​ ​as​ ​Amazon​ ​AWS​ ​or Heroku​ ​to​ ​run​ ​your​ ​submission.

## Implementation notes

* To start local development environment open client and server folders in your code editors. Run `npm i` and then `npm run start-docker`
UI container will start on 127.0.0.1:8080, and API container on 127.0.0.1:3001. It is better to run UI via `npm start`
(it will start on localhost:3000 in this case). Running dev UI server without container is faster.
* Application does not use Redux. Using context and hoc is better for small applications like this.
* There are only a couple of unit tests for UI app written due to lack of time.
* Service uses In-Memory cache for simplicity but that would have to be changed to Redis when autoscaling is set. Also, so-called socket io.redis client should be used to properly handle sticky socket.io connections.
* Mongo client is async for speed, but in the real app it should be sync, with redis cache invalidation after saving to DB. I ran Mongo in EC2 instance of amazon linux box.
* React is fine with XSS, in addition I added server JSON schema validator, as an example of how to keep DB integral and free from rubbish.
* Dumping all data via socket.io is ok for small apps with a few users. But in case of thousands users, server should only send barebone messages with client application pulling payload data via additional http request. This would work well with ELB/ECS scaling having multiple tasks. Basically broadcasting data via socket to thousands client is not the best option. I just used it here due to the lack of time and free tier account restrictions.
* Everything is synced quite fast so there are no any spinners for UI operations. In real app I would make everything spinner / progress based.
