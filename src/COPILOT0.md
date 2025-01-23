[]: # Title: COPILOT
[]: # Date: 2021-07-01
[]: # Tags: copilot, ai, code, completion, github, openai, vscode
For ThreeJS / @react-three-fiber / @react-three/drei

> Hey Copilot, parse this and act on it when prompted:

A Data structure, rigid enough, typed
Minimal, sensible defaults
Lots of different types / entities / components
    Scene
    Player
    Light
    Model
    Transform
    ...
    Physics

    Camera
    Audio
        AudioMixer
            AudioListener
            AudioSource
            AudioTrack
            AudioTrackList

    
    KeyboardControls
```json
{
    "enabled": "boolean",
    "keyBindings": {
        "action": "key"
    }
}
```

    MouseControls
```json
{
    "enabled": "boolean",
    "sensitivity": "number",
    "invertYAxis": "boolean"
}
```

    GamepadControls
```json
{
    "enabled": "boolean",
    "buttonBindings": {
        "action": "button"
    },
    "axisBindings": {
        "action": "axis"
    }
}
```

    TouchControls
```json
{
    "enabled": "boolean",
    "gestureBindings": {
        "action": "gesture"
    }
}
```

    XRControls
```json
{
    "enabled": "boolean",
    "controllerBindings": {
        "action": "controllerButton"
    },
    "handTracking": "boolean"
}
```

    PlayerControls
    EditModeControls
    VehicleControls
    CameraControls
    AudioControls

Undo / Redo
    State
        - CurrentState
            ```json
            {
                "id": "string",
                "data": "object",
                "timestamp": "string"
            }
            ```
        - PreviousState
            ```json
            {
                "id": "string",
                "data": "object",
                "timestamp": "string"
            }
            ```
        - InitialState
            ```json
            {
                "id": "string",
                "data": "object",
                "timestamp": "string"
            }
            ```
        - StateHistory
            ```json
            [
                {
                    "id": "string",
                    "data": "object",
                    "timestamp": "string"
                }
            ]
            ```
        - StateManager
            ```json
            {
                "currentState": "CurrentState",
                "previousState": "PreviousState",
                "initialState": "InitialState",
                "stateHistory": "StateHistory"
            }
            ```

    Actions
        - AddAction
            ```json
            {
                "type": "string",
                "payload": "object",
                "timestamp": "string"
            }
            ```
        - RemoveAction
            ```json
            {
                "type": "string",
                "payload": "object",
                "timestamp": "string"
            }
            ```
        - UpdateAction
            ```json
            {
                "type": "string",
                "payload": "object",
                "timestamp": "string"
            }
            ```
        - UndoAction
            ```json
            {
                "type": "string",
                "timestamp": "string"
            }
            ```
        - RedoAction
            ```json
            {
                "type": "string",
                "timestamp": "string"
            }
            ```

    History
        ```json
        {
            "actions": [
                "AddAction",
                "RemoveAction",
                "UpdateAction",
                "UndoAction",
                "RedoAction"
            ]
        }
        ```

    Middleware
        ```json
        {
            "middlewares": [
                "function"
            ]
        }
        ```

    DevTools
        ```json
        {
            "enabled": "boolean",
            "tools": [
                "string"
            ]
        }
        ```

    Undo
        ```json
        {
            "enabled": "boolean",
            "maxSteps": "number"
        }
        ```








Vehicles
Steps / Stairs + physics

























