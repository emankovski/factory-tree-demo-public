Implementation notes:
* To start local development environment open client and server folders in your code editors. Run `npm i` and then `npm run start-docker`
UI container will start on 127.0.0.1:8080, and API container on 127.0.0.1:3001. It is better to run UI via `npm start`
(it will start on localhost:3000 in this case). Running dev UI server without container is faster.
* Application does not use Redux. Using context and hoc is better for small applications like this.
* There are only a couple of unit tests for UI app written due to lack of time.
* Application is deployed to https://demo.mankovski.net which is a small ECS cluster with app and api services running as Fargate tasks. Two separate ELBs are used.
* Service uses In-Memory cache for simplicity but that would have to be changed to Redis when autoscaling is set. Also, so-called socket io.redis client should be used to properly handle sticky socket.io connections.
* Mongo client is async for speed, but in the real app it should be sync, with redis cache invalidation after saving to DB. I ran Mongo in EC2 instance of amazon linux box.
* React is fine with XSS, in addition I added server JSON schema validator, as an example of how to keep DB integral and free from rubbish.
* Dumping all data via socket.io is ok for small apps with a few users. But in case of thousands users, server should only send barebone messages with client application pulling payload data via additional http request. This would work well with ELB/ECS scaling having multiple tasks. Basically broadcasting data via socket to thousands client is not the best option. I just used it here due to the lack of time and free tier account restrictions.
* Everything is synced quite fast so there are no any spinners for UI operations. In real app I would make everything spinner / progress based.
