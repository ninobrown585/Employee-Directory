import React, { Component } from "react";
import CurrentEmployees from "./CurrentEmployees.js";
import SearchArea from "./SearchArea.js";
import API from "../utils/API";

class UserDirectory extends Component {
    state = {
        currentemployees: [],
        searchArea: "",
        sortEmployees: [],
        sorted: false,
    };

    //receive data and renders once or more than once
    componentDidMount = () => {
        API.getUsers().then((results) => {
            this.setState({
                currentemployees: results.data.results,
            });
        });
    };

    handleChange = (event) => {

        let name = event.target.value

        this.setState({ searchArea: name })

        console.log(name)
    }

    //Sort through employees and render to screen matched search
    sortingEmps = () => {
        let { currentemployees, searchArea } = this.state;
        let sortEmployees = currentemployees.filter((sorted) => {
            return (
                sorted.name.firstName.toLowerCase().includes(searchArea.toLowerCase())
                || sorted.name.lastName.toLowerCase().includes(searchArea.toLowerCase())
                || sorted.email.toLowerCase().includes(searchArea.toLowerCase())
            );
        });
        this.setState({ sortEmployees });
    };

    sorting = (event) => {
        this.setState({ searchArea: event.target.value }, () => {
            this.sortingEmps();
            this.setState({ sorted: true });
        });
    };

    render = () => {
        return (
            //Header section
            <div className="header-background">
                <div>
                    <h3>Employee Directory</h3>
                    <h2>Enter an employee name into the search area that your seeking.</h2>
                    <SearchArea name="searchArea" sorting={this.sortingEmps} label="SearchArea" onChange={this.handleChange} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Email</th>
                            {/* <th>D.O.B.</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //state before user enters a search
                            !this.state.sorted ? this.state.currentemployees.map((employee) => (
                                <CurrentEmployees key={employee.id.value} firstName={employee.name.first}

                                    lastName={employee.name.last} phone={employee.phone} email={employee.email}

                                    icon={employee.picture.medium} //dob={employee.dob.date}

                                    address={employee.location.street.number + " " + employee.location.street.name + " ," +
                                        employee.location.city + " ," + employee.location.state + " " + employee.location.postcode} />

                            ))
                                : //Sorts when user enters search
                                this.state.sortEmployees.map((employee) => {
                                    <CurrentEmployees key={employee.id.value} firstName={employee.name.first} lastName={employee.name.last}
                                        phone={employee.phone} email={employee.email} icon={employee.picture.medium} //dob={employee.dob.date}
                                        address={employee.location.street.number + " " + employee.location.street.name} />
                                })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserDirectory;