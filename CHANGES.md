# CHANGES

## 0.12-1-dev

- Fixing bug where the tree panel wasn't updating the tree name.


## 0.12.0-dev

- Added enable/disable feature.
- Added organization features.
- Added parameters export/import feature.


## 0.11.0-dev

- Massive number of icons.
- Using SHIFT+drag to create a single connection (similar to dragging an out 
  anchor).
- Using SHIFT+CTRL+drag to create multiple connections (from all selected 
  nodes).
- Removing old connections when adding more connections than the node limit.
- Showing a visual feedback (red connection) when the old connections will be
  removed.
- Changing cursor for each action.
- Using C to use the CUT tool (to remove connections).
- Fixing bug on "Remove All Connections" and "Remove All In Connections".


## 0.10.0-dev

- New node style showing title, name, icon, and properties.
- Using category-based colors on nodes.
- General color adjusts.
- Fixing a bug that was allowing nodes to connect on inputs.
- Adding icon image for Root.
- Settings now uses version to reload itself.


## 0.9.2-dev

- Curve editor now has Bell curves.


## 0.9.1-dev

- Integrating curve editor into the editor as property.
- New curve property.
- New Fuzz and Curve nodes.


## 0.9.0-dev

- Adding curve editor.


## 0.8.0-dev

- New input nodes: People, Objects, SoundEvent, SalienceEvent, GestureEvent, SalienceEvent, ArrivalEvent, DepartureEvent, Emotion, BlenderControl, WebUiControl, RawPerception, NLP, ROSInput and ROSSignal.
- New output nodes: ROSOutput, PlayAnimation, PlayQueuedAnimation, BlendAnimation, CrossFadeAnimation, CrossFadeQueuedAnimation, LookAtAnimation, StopAnimation, PlayAudio and TTSPlay.
- Nodes panel have collapsable groups (beyond node category). The group can be defined in node specification.


## 0.7.1-dev

- New images for Vector2 and Vector3 nodes.
- New nodes: Vector2ClampMagnitude, Vector2Distance, Vector2Dot, Vector2GetMagnitude, Vector2GetRightVector, Vector2GetSquaredMagnitude, Vector2GetUpVector, Vector2GetVector3, Vector2GetXY, Vector2Lerp, Vector2MoveTowards, Vector2Multiply, Vector2Normalize, Vector2Operator, Vector2SetValue, Vector2SetXY, Vector3Angle, Vector3ClampMagnitude, Vector3Distance, Vector3Dot, Vector3ForwardVector, Vector3GetMagnitude, Vector3GetRightVector, Vector3GetSquaredMagnitude, Vector3GetUpVector, Vector3GetVector2, Vector3GetXYZ, Vector3Lerp, Vector3MoveTowards, Vector3Multiply, Vector3Normalize, Vector3Operator, Vector3RotateTowards, Vector3SetValue, and Vector3SetXYZ.


## 0.7.0-dev

- New images for the following nodes: Action, And, Filter, Fuzz, HasReceivedMessage, Idle, Noise, Or, remap, Repeater, RestartBehaviorTree, ReturnFailure, ReturnSuccess, StartBehaviorTree, StopBehaviorTree, TaskGuard, Timer, Timeout, Timer, UntilFailure, UntilSuccess, and Wait.
- New nodes: GetFieldValue, GetPropertyValue, InvokeMethod, SetFieldValue, SetPropertyValue, Idle, HasReceivedEvent, StopBehaviorTree, StartBehaviorTree, RestartBehaviorTree, SetSharedBool, SetSharedColor, SetSharedFloat, SetSharedInt, SetSharedObject, SetSharedRect, SetSharedString, SetSharedVector2, SetSharedVector3, SetSharedVector4, BoolFlip, BoolOperator, FloatAbsolute, FloatClamp, FloatOperator, IntegerAbsolute, IntegerClamp, IntegerOperator, Lerp, LerpAngle, RandomBool, RandomFloat, and RandomInteger.
- New properties: Vector2, Vector3, and Vector4.
- Hiding properties fieldset if selected node does not have any property.


## 0.6.0-dev

- New properties: IntegerSlider, FloatSlider, IntegerRange and FloatRange.
- New nodes: And, Or, Noise, Remap, ReturnFailure, ReturnSuccess, Timer, UntilFailure, UntilSuccess, and Wait.


## 0.5.0-dev

- Property now have node reference.
- Properties implemented: Float, Integer, String, Text, Boolean and Choice.
- Nodes implemented: Sequence, Parallel, Prallel Selector, Priority Selector,
  Random Sequence, Selector, Selector Evaluator, Step Iterator and Switch.


## 0.4.0-dev

- Improvements to the building tasks.
- Property base class implemented.
- Simple String property implemented.
- Sample node "Property" to demonstrate properties.
- Exporting/Importing considers properties json serialization.
- Node getTitle templates considers the property value.
- Property documentations.

## 0.3.0-dev


- New JSON format and documentation.
- Export and import use the new JSON format.

## 0.2.2-dev

- Changing subtree selection to use SHIFT (SHIFT-CLICK to select subtree).
- Nodes now accepts multiple input and output connections.
- Classes now uses `b3e.createID` instead of `b3.createUUID`.
- Connection callbacks added.
- Selection callbacks added.


## 0.2.1-dev

- New node structure finished (new Node and Connection classes).
- Node panel fixed.


## 0.2.0-dev

- New node structure (not fully working, needs connection).
  - No need of Behavior3JS nodes.
  - New base node class.
  - New division of node representation (display/graph/attributes).
  - Display simplified (ready for new visual changes).
- New build version control (updates automatically with building).
- Small visual changes to the loading screen.
- General restructure and improved building system.


## 0.1.0 (Initial Release)

- First release with the correct building structure and some simplifications.