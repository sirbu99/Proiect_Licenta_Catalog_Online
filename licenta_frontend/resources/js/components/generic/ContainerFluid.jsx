import React, { Children } from 'react';
import MenuSecondary from '../pages/menu/MenuSecondary';

const ContainerFluid = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <MenuSecondary/>
                </div>
                <div className="col-9">
                    {Children.only(props.children)}
                </div>
            </div>
        </div>
    );
};

export default ContainerFluid;