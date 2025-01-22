import React, { useCallback } from 'react';
import { useEditorStore } from '../stores/editor';

export function Selectable(props) {
    const { children, onSelect } = props || {};
    const { setSelected } = useEditorStore();

    const onClick = useCallback((e) => {
        e.stopPropagation();
        const { object: targetObject } = e || {};
        setSelected(targetObject);
        if (onSelect) onSelect(targetObject);
    }, [setSelected]);

    return (
        <group onClick={onClick}>
            {children}
        </group>
    );
}
