import React from "react";

const CurrentEmployees = (props) => {
    return(
        <tr className= "Emp-style">
            <td>
                <img alt={props.firstName} src={props.icon} />
            </td>
            <td>
                {props.firstName} {props.lastName}
            </td>
            {/* <td>
                {props.dob}
            </td> */}
            <td>
                {props.phone}
            </td>
            <td>
              {props.address}
            </td>
            <td>
              {props.email}  
            </td>
        </tr>
    );
};

export default CurrentEmployees;