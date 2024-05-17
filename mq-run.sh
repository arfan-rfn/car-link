#!/bin/bash

npm install -g amqp-cli

data='{"name": "CLI User", "email":"q2@q.com","password":"tester", "role": "ADMIN"}'

echo $data | amqp-publish \
	-H localhost \
	-p 5672 \
	-u guest \
	-P guest \
	-V "/" \
	--exchange-name topicExchange \
	--exchange-type topic \
	-r user.registration.queue
