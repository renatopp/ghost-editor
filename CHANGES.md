# CHANGES

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