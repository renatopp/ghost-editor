/** @module b3e */

(function() {
  'use strict';

  /**
   * Represents a command for the history manager. Each command must have an 
   * undo and a redo specification. The specification must have the following
   * format:
   *
   *     var spec = [thisarg, methodOrFunction, params]
   *
   * For example:
   *
   *     var undo = [this, this.add, [block]];
   *     var redo = [this, this.remove, [block]];
   *     var command = new b3e.Command(undo, redo);
   *
   * @class Command
   * @param {Array} undo The undo specification.
   * @param {Array} redo The redo specification.
   * @constructor
   */
  b3e.Command = function(undo, redo, description) {

    if (undo.length !== 3) throw 'Invalid undo command, must have [target, method, args]';
    if (redo.length !== 3) throw 'Invalid redo command, must have [target, method, args]';

    function execute(target, method, args) {
      method.apply(target, args);
    }

    /**
     * The raw undo information (for debugging);
     */
    this._rawUndo = undo;

    /**
     * The raw redo information (for debugging);
     */
    this._rawRedo = redo;

    /**
     * Command description
     */
    this.description = description || '<no description>';
    
    /**
     * The tree that is selected in the moment of command is added to the 
     * history manager. This is set by the manager.
     * 
     * @property {b3e.tree.Tree} context;
     */
    this.context = null;

    /**
     * Execute the redo command.
     *
     * @method redo
     */
    this.redo = function() {
      execute(redo[0], redo[1], redo[2]);
    };

    /**
     * Execute the undo command.
     *
     * @method undo
     */
    this.undo = function() {
      execute(undo[0], undo[1], undo[2]);
    };

    /**
     * @method print
     */
    this.print = function(n) {
      var ident = (new Array(n||0)).join(' ');
      console.log(ident + this.description);
    };
  };

  /**
   * A list of commands created by the history manager.
   *
   * @class Command
   * @param {Array} undo The undo specification.
   * @param {Array} redo The redo specification.
   * @constructor
   */
  b3e.Commands = function(commands) {

    /**
     * List of commands
     */
    this.commands = commands;

    /**
     * The tree that is selected in the moment of command is added to the 
     * history manager. This is set by the manager.
     * 
     * @property {b3e.tree.Tree} context;
     */
    this.context = null;

    /**
     * Execute the redo command.
     *
     * @method redo
     */
    this.redo = function() {
      for (var i=0; i<this.commands.length; i++) {
        this.commands[i].redo();
      }
    };
    
    /**
     * Execute the undo command.
     *
     * @method undo
     */
    this.undo = function() {
      for (var i=this.commands.length-1; i>=0; i--) {
        this.commands[i].undo();
      }
    };

    /**
     * @method print
     */
    this.print = function(n) {
      var ident = (new Array(n||0)).join(' ');
      console.log(ident + 'Command pack:');
      for (var i=0; i<this.commands.length; i++) {
        this.commands[i].print(n+2);
      }
    };
  };
})();