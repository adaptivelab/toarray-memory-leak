#!/usr/bin/env python

import os
import random
import pymongo

def initialise_database():
    mongodb_port = int(os.getenv('BOXEN_MONGODB_PORT', 27017))
    connection   = pymongo.Connection('localhost', mongodb_port)
    connection.drop_database('leak_demo')

    db           = connection.leak_demo
    questions    = db.questions

    # questions.ensure_index("topic")
    questions.ensure_index("id")
    # questions.ensure_index("creationDate")
    # questions.ensure_index("views")
    # questions.ensure_index("completes")
    # questions.ensure_index("status")
    # questions.ensure_index("question")
    # questions.ensure_index("random1")
    # questions.ensure_index("random2")
    # questions.ensure_index("random3")

    questions.insert({'id':1, 'topic':'news',       'views':203,    'completes':95,     'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':2, 'topic':'sport',      'views':48,     'completes':37,     'status':'Never Started',     'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':3, 'topic':'sport',      'views':481,    'completes':331,    'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':4, 'topic':'politics',   'views':212,    'completes':179,    'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':5, 'topic':'politics',   'views':45,     'completes':10,     'status':'Inactive',     'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':6, 'topic':'news',       'views':145,    'completes':95,     'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':7, 'topic':'sport',      'views':76,     'completes':35,     'status':'Never Started',     'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':8, 'topic':'sport',      'views':215,    'completes':183,    'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':9, 'topic':'politics',   'views':179,    'completes':104,    'status':'Active', 'random1':random.random(), 'random2':random.random(), 'random3':random.random()})
    questions.insert({'id':10, 'topic':'politics',  'views':19,     'completes':10,     'status':'Never Started',     'random1':random.random(), 'random2':random.random(), 'random3':random.random()})


if __name__ == "__main__":
    initialise_database()
