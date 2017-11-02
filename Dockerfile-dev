FROM node:boron
LABEL MAINTAINER "Subash SN"

WORKDIR /app

COPY . .

RUN apt update \
	&& apt install dnsutils python2.7 python-dev python-pip -y \
	&& pip install requests bs4 lxml \
	&& npm install

CMD ["bash","run.sh"]
