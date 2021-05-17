import React from 'react';
const Card = (props) => {
    return (
        <div className="col-12 col-sm-6 col-lg-3">
            <div className="card">
                <div className="card-img" onClick={props.clickHandler}>
                    <img src={props.imageSrc} alt={props.imageAlt} />
                </div>
                <div className="card-details">
                    <h3 className="card-title" onClick={props.clickHandler} >
                        {props.cardTitle}
                    </h3>
                    <div className="description">
                        {props.description}
                    </div>
                    {props.additional}
                </div>
            </div>
        </div>
    );
};

export default Card;