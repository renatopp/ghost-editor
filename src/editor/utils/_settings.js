/**
 * Default settings of the editor.
 *
 * @constant {Object} DEFAULT_SETTINGS
 * @memberOf b3e
 */

(function () {
  "use strict";

  var DEFAULT_SETTINGS = {
    version      : '[BUILD_VERSION]',

    // CAMERA
    zoom_initial : 1.0,
    zoom_min     : 0.25,
    zoom_max     : 2.0,
    zoom_step    : 0.25,
    
    // EDITOR
    snap_x        : 12,
    snap_y        : 12,
    snap_offset_x : 0,
    snap_offset_y : 0,
    layout        : 'horizontal', // vertical
    max_history   : 100,

    // COLORS
    background_color        : '#171717',
    selection_color         : '#FFD800',
    block_border_color      : '#C1C1C1',
    block_symbol_color      : '#333333',
    anchor_background_color : '#EFEFEF',

    connection_color        : '#FFFFFF',
    root_color              : '#332A36',
    composite_color         : '#5A6BB8',
    modulator_color         : '#AB9749',
    output_color            : '#AB4949',
    input_color             : '#6AAB49',

    // CONNECTION
    connection_width       : 2,
    
    // ANCHOR
    anchor_border_width    : 2,
    anchor_radius          : 10,
    anchor_offset_x        : 4,
    anchor_offset_y        : 0,
    
    // BLOCK
    block_border_width     : 2,
    block_root_width       : 40,
    block_root_height      : 40,
    block_tree_width       : 160,
    block_tree_height      : 40,
    block_composite_width  : 40,
    block_composite_height : 40,
    block_decorator_width  : 60,
    block_decorator_height : 60,
    block_action_width     : 160,
    block_action_height    : 40,
    block_condition_width  : 160,
    block_condition_height : 40,
  };

  b3e.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
})();