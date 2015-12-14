===============
Modulator nodes
===============


---
And
---

A logical AND.


-----
Noise
-----

A general noise function.


--
Or
--

A logical OR.


-----
Remap
-----


-------------
ReturnFailure
-------------

The return failure task will always return failure except when the child task is running.


-------------
ReturnSuccess
-------------

The return success task will always return success except when the child task is running.


-----
Timer
-----


------------
UntilFailure
------------

The until failure task, will keep executing its child task until the child task returns failure.


------------
UntilSuccess
------------

The until success task, will keep executing its child task until the child task returns success.',


----
Wait
----

Wait a specified amount of time. The task will return running until the task is done waiting. It will return until the task is done waiting. It will return success after the wait time has elapsed.