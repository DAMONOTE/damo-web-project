import React, {Component, PropTypes,useState, useEffect} from 'react';
import RichTextEditor from 'react-rte';

function Editor () {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    var onChange = (value) => {
        setValue(value)
    };

    return (
        <RichTextEditor
          value={value}
          onChange={onChange}
        />
    );
}

export default Editor