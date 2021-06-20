import React from 'react';
const Filter = (props) => {
    return (
        <form onSubmit={props.fetchInfo}>
            <label>
                <p className="filter-title">Sort by {props.name}: </p>
                <select value={props.selectedId} onChange={props.clickHandler} className="filter-options ">
                    <option value=''>None</option>
                    {props.list.map(item => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )

                    })}
                </select>
            </label>
            <input type="submit" value="Apply" className="btn btn-primary mx-2" />
        </form>
    );
};

export default Filter;