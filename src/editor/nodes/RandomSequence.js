(function() {
  'use strict';

  b3e.nodes.RandomSequence = b3e.node.create('RandomSequence', b3e.COMPOSITE, {
    description: 'Similar to the sequence task, the random sequence task '+
                 'will return success as soon as every child task returns '+
                 'success. The difference is that the random sequence class '+
                 'will run its children in a random order. The sequence task '+
                 'is deterministic in that it will always run the tasks from '+
                 'left to right within the tree. The random sequence task '+
                 'shuffles the child tasks up and then begins execution in a '+
                 'random order. Other than that the random sequence class is '+
                 'the same as the sequence class. It will stop running tasks '+
                 'as soon as a single task ends in failure. On a task '+
                 'failure it will stop executing all of the child tasks and '+
                 'return failure. If no child returns failure then it will '+
                 'return success.',
  });
})();