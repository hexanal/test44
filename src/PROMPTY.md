---
title: "PROMPTY"
author: "Fred Mercy"
date: "2023-10-05"
description: "Documentation for the PROMPTY project"
tags: ["documentation", "project", "PROMPTY"]
---

Trying to come with a way to store my data structure in a way that's efficient.
Something lightweight, sturdy, universal, import/exportable.
Can export to JSON (and others)

For a web-based game; I want to use a state manager that can update on every frame. I want an ability to do "snapshots" of the current state,  perhaps the snapshots are for different aspects of the game engine.

Since I am currently using @react-three/fiber and @react-three/drei, it will be powered by ThreeJS via React. I aim for best performances for this engine, and to implement as many features as possible (listed below)

I'm thinking maybe leverage an Entity Component System for something like that:

Those are examples and need to be refined, but it's my current vision of what I need:

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