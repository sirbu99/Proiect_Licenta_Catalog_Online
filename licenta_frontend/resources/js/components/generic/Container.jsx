import React, { Children } from 'react';

const Container = (props) => {
    return (
        <div className="container">
            <div>
                {Children.only(props.children)}
            </div>
        </div>
    );
};

export default Container;