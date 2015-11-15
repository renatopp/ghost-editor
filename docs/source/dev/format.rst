=================
Ghost JSON format
=================

Ghost editor can export and import data using `JSON <https://en.wikipedia.org/wiki/JSON>`_. This session describes the format used by Ghost to represent projects and trees. As reference, see the examples of a serialized project and tree below.


--------------------
Format specification
--------------------

There are two main documents that can be used in Ghost. A tree document represents a single Behavior Tree and aggregates multiple nodes, while a project document represents a whole project in Ghost, including multiple behavior trees.

A project document is represented as `<project>` while a tree document is represented as `<tree>`:


~~~~~~~~~
<project>
~~~~~~~~~

A project have the following attributes:

- **version**: the Ghost editor version in which this document where created.
- **selectedTree**: the id of the selected tree. Only useful for the editor.
- **trees**: a list of `<tree>` instances.


~~~~~~
<tree>
~~~~~~

A tree have the following info:

- **version**: the editor version in which this document where created. Only present if you are exporting a single tree.
- **id**: the tree unique identifier, generated automatically by Ghost.
- **root**: the id of the root node in this tree.
- **nodes**: a list of `<node>` instances.
- **display**: an object used for controlling the visual of the tree. Only useful for the editor. It contains:

  - **x**: position of the camera in the axis X.
  - **y**: position of the camera in the axis Y.
  - **z**: the zoom of the camera.


~~~~~~
<node>
~~~~~~

- **id**: the node unique identifier, generated automatically by Ghost.
- **name**: the name of the node. This attribute identifies the type of the node and can be used to identify the proper class or method that represents this node in code.
- **category**: the category of the node. May assume `'composite'`, `'modulator'`, `'input'`, `'output'` or `'root'`. 
- **title**: the title of the node. This is a user friendly string used in the editor to provide a better identification of the node for the user.
- **description**: a helper description of what that node does. 
- **properties**: *this will be changed in the next release*.
- **children**: a list of strings with the ID of children nodes.
- **display**: an object used for controlling the visual of the node. Only useful for the editor. It contains:

  - **x**: position of the node in the axis X.
  - **y**: position of the node in the axis Y.


---------------
Example project
---------------

Example::

    {
      "version": "0.3.0-dev",
      "selectedTree": "wj93t6okt9ct",
      "trees": [
        {
          "id": "lp8z9m3yf2ks",
          "root": "younlhpaud07",
          "nodes": [
            {
              "id": "younlhpaud07",
              "name": "Root",
              "category": "root",
              "title": null,
              "description": null,
              "properties": {},
              "children": [],
              "display": {
                "x": 0,
                "y": 0
              }
            }
          ],
          "display": {
            "x": 622.5,
            "y": 494.5,
            "z": 1
          }
        },
        {
          "id": "wj93t6okt9ct",
          "root": "fb9vz1sjp5ez",
          "nodes": [
            {
              "id": "fb9vz1sjp5ez",
              "name": "Root",
              "category": "root",
              "title": null,
              "description": null,
              "properties": {},
              "children": [
                "9jhup8t6xndp"
              ],
              "display": {
                "x": 0,
                "y": 0
              }
            },
            {
              "id": "9jhup8t6xndp",
              "name": "Selector",
              "category": "composite",
              "title": null,
              "description": null,
              "properties": {},
              "children": [],
              "display": {
                "x": 300,
                "y": 0
              }
            }
          ],
          "display": {
            "x": 548.5,
            "y": 481.5,
            "z": 1
          }
        }
      ]
    }


------------
Example tree
------------

Example::

    {
      "id": "wj93t6okt9ct",
      "root": "fb9vz1sjp5ez",
      "nodes": [
        {
          "id": "fb9vz1sjp5ez",
          "name": "Root",
          "category": "root",
          "title": null,
          "description": null,
          "properties": {},
          "children": [
            "9jhup8t6xndp"
          ],
          "display": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": "9jhup8t6xndp",
          "name": "Selector",
          "category": "composite",
          "title": null,
          "description": null,
          "properties": {},
          "children": [],
          "display": {
            "x": 300,
            "y": 0
          }
        }
      ],
      "display": {
        "x": 548.5,
        "y": 481.5,
        "z": 1
      },
      "version": "0.3.0-dev"
    }