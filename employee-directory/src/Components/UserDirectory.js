import React,{Component} from "react";
import CurrentEmployees from "./CurrentEmployees.js";
import SearchArea from "./SearchArea.js";
import API from "../utils/API";

class UserDirectory extends Component {
    state={
        currentemployees: [],
        searchArea: "",
        sortEmployees: [],
        sorted: false
    };

    //receive data and renders once or more than once
    componentDidMount = () => {
        API.getUsers().then((answer) => {
            this.setState({
                currentemployees: answer.data.answer,
            });
        });
    };

    //Sort through employees and render to screen matched search
    sortingEmps = () => {
        let {CurrentEmployees, searchArea} = this.state;
        let sortEmployees = CurrentEmployees.filter((sorted)=>{
            return(
                sorted.name.firstName.toLowerCase().includes(searchArea.toLowerCase()) 
                || sorted.name.lastName.toLowerCase().includes(searchArea.toLowerCase())
                || sorted.email.toLowerCase().includes(searchArea.toLowerCase())
            );
        });
        this.setState({ sortEmployees});
    };

    sorting = (event) => {
        this.setState({ searchArea: event.target.value}, () =>{
            this.sortingEmps();
            this.setState({sorted:true});
        });
    };

    render = () =>{
        return(
            <div className="header-background">
                <div>
                    <h3>Employee Directory</h3>
                    <h2>Enter an employee name into the search area that your seeking.</h2>
                    <SearchArea name="searchArea" sorting={this.sorting} label="SearchArea" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>D.O.B.</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                </table>


            </div>
        )
    }


}