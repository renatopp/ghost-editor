==========
Properties
==========


------
String
------

Simple string property using the default `input` HTML element.

**Parameters**:
  
- *value (string)*: the property value. Default to '``'.

Usage example::

    ['my-string', b3e.properties.String, {value:'default value'}]

**Json format**: <string>

Json example::

    "my-string": "default value"


----
Text
----

This property represents a multi-line string, and uses the `textarea` HTML element.

**Parameters**:

- *value (string)*: the property value. Default to `''`.

Usage example::

    ['my-text', b3e.properties.Text, {value:'default value'}]

**Json format**: <string>

Json example::

    "my-text": "default value"




-------
Integer
-------

Represents an integer value. This property uses the `number input` HTML element.

**Parameters**:

- *value (integer)*: the property value. Default to `0`.
- *minValue (integer)*: the minimum allowed value. Default to `null`.
- *maxValue (integer)*: the maximum allowed value. Default to `null`.

Usage example::

    ['my-integer', b3e.properties.Integer, {
      value: 0,
      minValue: -5,
      maxValue: 10,
    }]

**Json format**: <integer>

Json example::

    "my-integer": 0




-----
Float
-----

Represents a floating point value. This property uses the `number input` HTML element.

**Parameters**:

- *value (float)*: the property value. Default to `0.0`.
- *minValue (float)*: the minimum allowed value. Default to `null`.
- *maxValue (float)*: the maximum allowed value. Default to `null`.

Usage example::

    ['my-float', b3e.properties.Float, {
      value: 0.0,
      minValue: -0.5,
      maxValue: 0.5,
    }]

**Json format**: <float>

Json example::

    "my-float": 0.0


-------------
IntegerSlider
-------------

This property represents an integer value but uses a slider picker as widget.

**Parameters**:

- *value (integer)*: the property value. Default to `0`.
- *minValue (integer)*: the minimum allowed value. Default to `0`.
- *maxValue (integer)*: the maximum allowed value. Default to `10`.
- *step (integer)*: the step value of the slider control. Default to `1`.
- *enforceStep (boolean)*: wheter if the widget must enforce the value to be a multiple of the step. Default to `true`.

Usage example::

    ['my-integer-slider', b3e.properties.IntegerSlider, {
      value: 0,
      minValue: 0,
      maxValue: 10,
      step: 1,
      enforceStep: true
    }]

**Json format**: <integer>

Json example::

    "my-integer-slider": 0


-----------
FloatSlider
-----------

This property represents an float value but uses a slider picker as widget.

**Parameters**:

- *value (float)*: the property value. Default to `0.0`.
- *minValue (float)*: the minimum allowed value. Default to `0.0`.
- *maxValue (float)*: the maximum allowed value. Default to `1.0`.
- *step (float)*: the step value of the slider control. Default to `0.1`.
- *enforceStep (boolean)*: wheter if the widget must enforce the value to be a multiple of the step. Default to `true`.

Usage example::

    ['my-float-slider', b3e.properties.FloatSlider, {
      value: 0.0,
      minValue: 0.0,
      maxValue: 1.0,
      step: 0.1,
      enforceStep: true
    }]

**Json format**: <float>

Json example::

    "my-float-range": 0.0


------------
IntegerRange
------------

This property is used to represent a range `[start, end]` of integers.

**Parameters**:

- *startValue (integer)*: initial value of the range. Default to `0`.
- *endValue (integer)*: final value of the range. Default to `1`.
- *minStartValue (integer)*: minimum of the initial range value. Default to `null`.
- *maxStartValue (integer)*: maximum of the initial range value. Default to `null`.
- *minEndValue (integer)*: minimum of the final range value. Default to `null`.
- *maxEndValue (integer)*: maximum of the final range value. Default to `null`.

Usage example::

    ['my-integer-range', b3e.properties.IntegerRange, {
      startValue    : -100,
      endValue      : 100,
      minStartValue : -1000,
      maxStartValue : 0,
      minEndValue   : 0,
      maxEndValue   : 1000
    }]

**Json format**: [<start:integer>, <start:integer>]

Json example::

  'my-integer-range': [-100, 100]


----------
FloatRange
----------

This property is used to represent a range `[start, end]` of floats.

**Parameters**:

- *startValue (float)*: initial value of the range. Default to `0`.
- *endValue (float)*: final value of the range. Default to `1`.
- *minStartValue (float)*: minimum of the initial range value. Default to `null`.
- *maxStartValue (float)*: maximum of the initial range value. Default to `null`.
- *minEndValue (float)*: minimum of the final range value. Default to `null`.
- *maxEndValue (float)*: maximum of the final range value. Default to `null`.

Usage example::

    ['my-float-range', b3e.properties.FloatRange, {
      startValue    : -100,
      endValue      : 100,
      minStartValue : -1000,
      maxStartValue : 0,
      minEndValue   : 0,
      maxEndValue   : 1000
    }]

**Json format**: [<start:float>, <start:float>]

Json example::

  'my-float-range': [-100, 100]


-------
Boolean
-------

Represents a boolean value. It uses a custom checkbox element.

**Parameters**:

- *value (bool)*: the property value. Default to `false`.

Usage example::

    ['my-boolean', b3e.properties.Boolean, {value: true}]

**Json format**: <boolean>

Json example::

    "my-boolean": true





------
Choice
------

This property allows the user to choose a value from a predefined list. It uses the default select HTML element.

**Parameters**:

- *value (ANY)*: the selected value. Default to `null`.
- *allowNull (bool)*: if the HTML element should accept null or not. Default to `true`.
- *options (list)*: the possible values that user can choose. You may use it in two different ways:

  - *list of values*::

      ['option1', 'option2', 'option3']

  - *list of lists*::

      [
        ['option1', 'Label for option1'],
        ['option2', 'Label for option2'],
        ['option3', 'Label for option3']
      ]


Usage example::

    ['my-list', b3e.properties.Choice, {
      value: 'n',
      allowNull: false,
      options: [
        ['n', 'North'],
        ['s', 'South'],
      ],
    }]

**Json format**: <ANY> (depends on the options values)

Json example::

    "my-list": 'n'

