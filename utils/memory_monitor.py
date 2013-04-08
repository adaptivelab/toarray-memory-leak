#!/usr/bin/env python

import subprocess
import time
import logging
import time
import shutil
import atexit
import os


log_filename='./utils/results/memory.log'


def get_usage(program):
    return subprocess.check_output(
        "ps auxw | grep " + program + " | grep -v grep | awk '{printf $5 \"\t\" $6 \"\t\" $3}'",
        shell=True
    )


def savelog():
    if os.path.exists(log_filename):
        shutil.copy(log_filename,log_filename+str(int(time.time())))


if __name__ == "__main__":
    savelog()
    logging.basicConfig(
        filename=log_filename,
        format='%(message)s',
        filemode='w',
        level=logging.DEBUG
    )
    logging.debug("vsz\trss\tcpu")
    while True:
        time.sleep(0.33)
        usage = get_usage('leaky_node')
        if usage != '':
            logging.debug(usage)
        if usage == '':
            logging.debug("0\t0\t0");
