# Fader

An interactive, multi-input visual "Fader"
    to tweak values
        increment up to
        decrement down to
        min/max
    on first tap and drag
        lock in

    value
    
        
    onMouseDown:
        lock cursor strategy for mouse users
        -> onActivate
    onTouchStart -> onActivate
    onPointerDown -> onActivate

    # onTweak:
        from
    # onActivate:
        listen on document
            onMouseMove
            onPointerMove
                onTweak
            moves
            onMouseUp
            onPointerUp
                onEnd

    # onEnd

    _onDrag
    [x] can listen to x-axis drag
    [ ] can listen to angle theta from start position [x,y]

        
    

