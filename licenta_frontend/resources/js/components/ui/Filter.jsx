import React from 'react';
const Filter = (props) => {
    return (
        <div className="d-flex">
            <label>
                <p className="filter-title">{props.name}: </p>
                <select value={props.selectedId} onChange={props.clickHandler} className="filter-options ">
                    <option value=''>None</option>
                    {props.list.map(item => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )

                    })}
                </select>
            </label>

        </div>

    );
};

export default Filter;