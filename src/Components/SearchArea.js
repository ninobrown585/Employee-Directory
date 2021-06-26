import React from 'react';

const SearchArea = (props) => {
    return(
        <div className = "d-flex justify-content-center mx-auto">
            <form>
                <input placeholder= "Search by Name" name= "SearchArea" type= "text" 
                  className= "form-control-lg search-font mx-auto" onChange={props.onChange} />
            </form>
        </div>
    );
};

export default SearchArea;