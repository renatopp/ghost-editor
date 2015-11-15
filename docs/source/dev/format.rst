=================
Ghost JSON format
=================

Uses JSON internally and to export the tree.

Project

- version
- selectedTree
- trees

Tree

- version
- id
- root
- nodes
- display

  - camera_x
  - camera_y
  - camera_z
  - x
  - y

Node

- id
- name
- category
- title
- description
- properties
- children
- display

  - x
  - y


---------------
Example project
---------------

Example::

    {
      "version": "0.3.0-dev",
      "selectedTree": "0mm2750j333j",
      "trees": [
        {
          "id": "0mm2750j333j",
          "root": "6m1i1xbw1ihb",
          "nodes": [
            {
              "id": "6m1i1xbw1ihb",
              "name": "Root",
              "category": "root",
              "title": null,
              "description": null,
              "properties": {},
              "children": [
                "cqr89rp2zgpv",
                "tqgspx96v61a"
              ],
              "display": {
                "x": 0,
                "y": 0
              }
            },
            {
              "id": "tqgspx96v61a",
              "name": "Selector",
              "category": "composite",
              "title": null,
              "description": null,
              "properties": {},
              "children": [
                "4teqlzy30ecu",
                "lk0x9uzzwvvg"
              ],
              "display": {
                "x": 312,
                "y": -84
              }
            },
            {
              "id": "cqr89rp2zgpv",
              "name": "Sequence",
              "category": "composite",
              "title": null,
              "description": null,
              "properties": {},
              "children": [
                "4teqlzy30ecu",
                "xup2wgz0bj1n"
              ],
              "display": {
                "x": 312,
                "y": 72
              }
            },
            {
              "id": "4teqlzy30ecu",
              "name": "Selector",
              "category": "composite",
              "title": null,
              "description": null,
              "properties": {},
              "children": [],
              "display": {
                "x": 648,
                "y": -84
              }
            },
            {
              "id": "xup2wgz0bj1n",
              "name": "Sequence",
              "category": "composite",
              "title": null,
              "description": null,
              "properties": {},
              "children": [],
              "display": {
                "x": 660,
                "y": 72
              }
            },
            {
              "id": "fxoye8eb6p28",
              "name": "SingleOutput",
              "category": "input",
              "title": null,
              "description": null,
              "properties": {},
              "children": [
                "cqr89rp2zgpv"
              ],
              "display": {
                "x": -24,
                "y": 192
              }
            },
            {
              "id": "lk0x9uzzwvvg",
              "name": "SingleInput",
              "category": "output",
              "title": null,
              "description": null,
              "properties": {},
              "children": [],
              "display": {
                "x": 660,
                "y": -216
              }
            }
          ],
          "display": {
            "camera_x": 499.5,
            "camera_y": 363.5,
            "camera_z": 1,
            "x": 0,
            "y": 0
          }
        }
      ]
    }


------------
Example tree
------------

Example::

    {
      "id": "0mm2750j333j",
      "root": "6m1i1xbw1ihb",
      "nodes": [
        {
          "id": "6m1i1xbw1ihb",
          "name": "Root",
          "category": "root",
          "title": null,
          "description": null,
          "properties": {},
          "children": [
            "cqr89rp2zgpv",
            "tqgspx96v61a"
          ],
          "display": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": "tqgspx96v61a",
          "name": "Selector",
          "category": "composite",
          "title": null,
          "description": null,
          "properties": {},
          "children": [
            "4teqlzy30ecu",
            "lk0x9uzzwvvg"
          ],
          "display": {
            "x": 312,
            "y": -84
          }
        },
        {
          "id": "cqr89rp2zgpv",
          "name": "Sequence",
          "category": "composite",
          "title": null,
          "description": null,
          "properties": {},
          "children": [
            "4teqlzy30ecu",
            "xup2wgz0bj1n"
          ],
          "display": {
            "x": 312,
            "y": 72
          }
        },
        {
          "id": "4teqlzy30ecu",
          "name": "Selector",
          "category": "composite",
          "title": null,
          "description": null,
          "properties": {},
          "children": [],
          "display": {
            "x": 648,
            "y": -84
          }
        },
        {
          "id": "xup2wgz0bj1n",
          "name": "Sequence",
          "category": "composite",
          "title": null,
          "description": null,
          "properties": {},
          "children": [],
          "display": {
            "x": 660,
            "y": 72
          }
        },
        {
          "id": "fxoye8eb6p28",
          "name": "SingleOutput",
          "category": "input",
          "title": null,
          "description": null,
          "properties": {},
          "children": [
            "cqr89rp2zgpv"
          ],
          "display": {
            "x": -24,
            "y": 192
          }
        },
        {
          "id": "lk0x9uzzwvvg",
          "name": "SingleInput",
          "category": "output",
          "title": null,
          "description": null,
          "properties": {},
          "children": [],
          "display": {
            "x": 660,
            "y": -216
          }
        }
      ],
      "display": {
        "camera_x": 499.5,
        "camera_y": 363.5,
        "camera_z": 1,
        "x": 0,
        "y": 0
      },
      "version": "0.3.0-dev"
    }