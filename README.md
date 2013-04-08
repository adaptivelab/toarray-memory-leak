These load tests are a bit complicated, sorry!

Getting started
===============

## Requirements

- node.js with npm
- python with pip
- foreman (gem)
- vagrant

## Install dependencies

    # install node modules
    $ npm install

    # install components for visualiser (requires bower)
    $ bower install

    # install python dependencies
    $ pip install -r requirements.txt

    # setup vagrant (requires vagrant)
    $ vagrant up

## Initialise the database

    # load the database with some data, you might want to read it first
    $ python utils/initialise_database.py

## Run the tests

    # run leaky or non-leaky code, and visualise memory usage:
    $ foreman start -f leaky.Procfile       # leaky
    $ foreman start -f non_leaky.Procfile   # non_leaky

    # run the load tests
    $ fab vagrant load_test
