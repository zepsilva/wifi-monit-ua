import React from "react"
import Header from "../components/Header";
import {DepartmentGeneric} from "../components/DepartmentGeneric";

/*
const DepartmentPage = () => {

    return (
        <div>
            <Header />
            <DepartmentGeneric />
        </div>
    );
};
*/

export class DepartmentPage extends React.Component{
    render() {
        return (
            <div>
                <Header />
                <DepartmentGeneric id={this.props.location.state.depNum} />
            </div>
        );
    }
}

export default DepartmentPage;
