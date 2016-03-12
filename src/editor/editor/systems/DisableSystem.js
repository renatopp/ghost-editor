b3e.editor.DisableSystem = function(editor) {
  "use strict";

  this.update = function(delta) {
  };

  key('e', function() {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    tree.edit.enable();
  });

  key('d', function() {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    tree.edit.disable();
  });

  key('w', function() {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    tree.edit.invertEnabled();
  });
};
