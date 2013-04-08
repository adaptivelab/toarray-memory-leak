#!/usr/bin/env python

import subprocess
import time
import logging
import time
import shutil
import atexit


def get_usage(program):
    return subprocess.check_output(
        "ps auxw | grep " + program + " | grep -v grep | awk '{printf $5 \"\t\" $6 \"\t\" $3}'",
        shell=True
    )


def savelog():
    shutil.copy('./utils/results/memory.log','./utils/results/memory.log.'+str(int(time.time())))


if __name__ == "__main__":
    savelog()
    logging.basicConfig(
        filename='./utils/results/memory.log',
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
