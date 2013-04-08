These load tests are a bit complicated, sorry!

Getting started
===============

There are essentially three components to the load tester, the
__memory monitor__, the __load testers__ and the __visualiser__.

    # Run the web server first (unless you want to capture the 'boot up' usage)
    $ cd ../../ && foreman start poll

    # Then run the memory monitor:
    $ ./memory_monitor.py

    # Then run one of the tests*:
    $ ./tests/getquestionfrompool3.sh

The test is now running, it'll take about 5 minutes to complete.

Getting the results
===================

Once the test is complete you should shutdown the memory monitor (Ctrl-c).

The memory logs are stored at `/test/load/results/memory.log`.

To visualise the results:

    # Run a local webserver on port 8888:
    $ ./webserver.sh

And then go to `http://localhost:8888/visualiser/`

If you want to keep the results, rename the `memory.log` file, as
`memory_monitor.py`, will wipe it the next time it runs.