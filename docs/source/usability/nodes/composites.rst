===============
Composite nodes
===============


--------
Selector
--------

The selector task is similar to an "or" operation. It will return success as soon as one of its child tasks return success. If a child task returns failure then it will sequentially run the next task. If no child task returns success then it will return failure.



--------
Sequence
--------

The sequence task is similar to an "and" operation. It will return failure as soon as one of its child tasks return failure. If a child task returns success then it will sequentially run the next task. If all child tasks return success then it will return success.



--------
Parallel
--------

Similar to the sequence task, the parallel task will run each child task until a child task returns failure. The difference is that the parallel task will run all of its children tasks simultaneously versus running each task one at a time. Like the sequence class, the paralllel task will return success once all of its children tasks have return success. If one task returns failure the paralllel task will end all of the child tasks and return failure.



-----------------
Parallel Selector
-----------------

Similar to the selector task, the paralllel selector task will return success as soon as a child task returns success. The difference is that the parallel task will run all of its children tasks simultaneously versus running each task one at a time. If one task returns success the parallel selector task will end all of the child tasks and return success. If every child task returns failure then the paralllel selector task will return failure.



-----------------
Priority Selector
-----------------

Similar to the selector task, the priority selector task will return success as soon as a child task returns success. Instead of running tasks sequentially from left to right within the tree, the priority selector will ask the task what its priority is to determine the order. The higher priority tasks have a higher chance at beign run first.



---------------
Random Sequence
---------------

Similar to the sequence task, the random sequence task will return success as soon as every child task returns success. The difference is that the random sequence class will run its children in a random order. The sequence task is deterministic in that it will always run the tasks from left to right within the tree. The random sequence task shuffles the child tasks up and then begins execution in a random order. Other than that the random sequence class is the same as the sequence class. It will stop running tasks as soon as a single task ends in failure. On a task failure it will stop executing all of the child tasks and return failure. If no child returns failure then it will return success.



------------------
Selector Evaluator
------------------

The selector evaluator is a selector task which reevaluates its children every tick. It will run the lowest priority child which returns a task status of running. This is done each tick. If a higherpriority child is running and the next frame a lower priority child wants to run it will interrupt the higher priority child. The selector evaluator will return success as soon as the first child returns success other wise it will keep trying higher priority children. This task mimics the conditional abort functionality except the child taskss don\'t always have to be conditional tasks.



-------------
Step Iterator
-------------

Executes and immediately returns children node status, one-by-one. Step iterator always moves forward by one and loops it's index.


------
Switch
------

Executes ONE child based on the provided INT or ENUM and return it's status. If "case" change while a child is running, that child will be interrupted before the new child is executed.