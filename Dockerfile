###
### MongoDB
###
###
### VERSION 0.0.1
###
### Use the base ubuntu image from dotCloud
###

FROM ubuntu:latest

###
MAINTAINER Russell Pitre, <rpitre@gmail.com>

###
### Install latest packages.
###

RUN apt-get -y update && apt-get -y upgrade

###
### Import the MongoDB public GPG key.
###

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

###
### Create new source.list.
###

RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list

###
### Hack for initctl not being available in Ubuntu.
###

RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -s /bin/true /sbin/initctl

###
### Update latest apt packages.
###

RUN apt-get -y update

###
### Install MongoDB.
###

RUN apt-get -y install mongodb-10gen

###
### Create the MongoDB data directory.
###

RUN mkdir -p /data/db

###
### Expose the port MongoDB is listening on.
###

EXPOSE 27017

###
### Entrypoint into the container, allows us to pass arguments
### to the MongoDB daemon.
###

ENTRYPOINT ["usr/bin/mongod"]
