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

