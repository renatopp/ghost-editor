=======================
Creating new properties
=======================

**Summary**:

- Properties are located physically in the `editor/properties` folder.
- Properties are located logically in the `b3e.properties` namespace.
- All properties must inherit from `b3e.property.Property`.
- You can use the function `b3e.property.create` as shortcut to create custom properties.
- You must define a custom AngularJS directive for each Property, directives are located in `app/properties` folder.


-----------------------
The Property base class
-----------------------

The Property base class `b3e.property.Property` has the following attributes and methods:

- **name**: the name of the property, this is defined by each node and used to identify the property on JSON.
- **title**: the optional title of the property. Editor visual purpose only.
- **category**: the class name of the property, e.g., *String*, *Integer*, etc.
- **description**: optional helper description of property. Editor visual purpose only.

The following methods must be override for each new property to work properly:

- **fromJson**: export the value(s) of this property to JSON format, in order to be copied or exported. It receives a parameter *data*.
- **toJson**: import the value(s) of this property from a JSON format.
- **toValue**: returns a single string value to be shown on the node visualization and title template.

The following methods have a default behavior, take a look at the code before
overriding them.

- **getTitle**: a helper function that returns the parameter title to be displayed at the editor.
- **html**: returns the name of the directive to be used on the properties panel. Defaults to `prop-PROPERTYNAME`.


--------------------
Creating sub classes
--------------------

The editor provides a shortcut function to create a new Property, the `b3e.property.create` function::

    [propertyclass] = b3e.property.create(name, kwargs)

The `create` function receives the property name as obligatory argument, and an optional object with attributes and methods. The example below shows how to use it::

    var Vector2 = b3e.property.create('Property', {
      title: 'A fancy property name',
      description: 'This property represents this and that.',
      x: 0, // default value
      y: 0, // default value

      toJson: function() {
        return {x:this.x, y:this.y};
      },

      fromJson: function(data) {
        this.x = data.x;
        this.y = data.y;
      },

      toValue: function() {
        return '['+this.x,', '+this.y+']';
      }
    });


----------------------------
Creating property directives
----------------------------

Unfortunately, creating a custom property depends on AngularJS because it what the editor uses to render the DOM elements. Please put all directives on the `app/properties` folder. Use the following template::

    (function() {
      'use strict';

      angular
        .module('app')
        .directive('propString', StringDirective);

      StringDirective.$inject = [
        '$parse'
      ];

      function StringDirective($parse) {
        var directive = {
          require     : 'ngModel',
          restrict    : 'E',
          template    : templateFunction,
          link        : linkFunction,
        };
        return directive;

        function templateFunction($element, $attrs) {
          /* jshint -W043 */
          // Change this
          return '<input class="form-control" \
                         ng-change="doChange()" \
                         ng-model="value" \
                         ng-keydown="onKeydown($event)"\
                         type="text">';
        }

        function linkFunction($scope, $element, $attrs, $ctrl) {
          var model = $parse($attrs.ngModel)($scope);
          var change = $parse($attrs.ngChange)($scope);
          
          // Change this
          $scope.value = model.value;

          $scope.doChange = function() {
            // Change this
            model.value = $scope.value;

            change();
          };
          $scope.onKeydown = function(e) {
            if (e.ctrlKey && e.keyCode == 90) {
              e.preventDefault();
            }
            return false;
          };
        }
      }

    })();
