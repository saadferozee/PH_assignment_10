import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const ReactTooltip = ({ id, content, place, children }) => {
    return (
        <div className=''>
            <span data-tooltip-id={id} data-tooltip-content={content}>
                {children}
            </span>
            <Tooltip id={id} place={place} effect="solid" className='text-xs!' />
        </div>
    );
};

export default ReactTooltip;