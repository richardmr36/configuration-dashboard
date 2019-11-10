import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { API_ROOT } from './api-config';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {"configList":[]};
  }

  findAllConfigList() {
    var thisComponent = this;
    $.get(API_ROOT+"findAll", function(data) {
      if(data.message) {
        console.log(data);
        alert(data.message);
        thisComponent.setState({configList: []});
        return;
      }

      thisComponent.setState({configList: data});
    });
  }

  componentDidMount() {
    this.findAllConfigList();
  }

  componentDidUpdate(prevProps) {
    if(this.props.isUpdated && this.props.timeStampForUniqueCheck !== prevProps.timeStampForUniqueCheck) {
      this.findAllConfigList();
    }
  }

  addConfigJson() {
    this.props.addConfigJson();
  }

  viewConfigJson(id) {
    this.props.viewConfigJson(id);
  }

  deleteConfigJson(id, name) {
    this.props.deleteConfigJson(id, name);
  }

  render() {
    var index = 0;
    var configList = this.state.configList;

    //console.log(configList);
    var thisComponent = this;
    return(
      <div>
        <h2>List of Configuration</h2>
        <p>Below are the json available for different configurations.&nbsp;
          <a href="javascript:void(0);" onClick={() => this.addConfigJson()}>Click here to add.</a>
        </p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Configuration Name</th>
              <th>View JSON</th>
              <th>Delete JSON</th>
            </tr>
          </thead>
          <tbody>

            {configList.map(function (data) {
              return (
                <tr key={++index} className={data.configId === thisComponent.props.hoverRowId ? 'selectedRow' : ''}>
                  <td>{index}</td>
                  <td>{data.configName}</td>
                  <td>
                    <a href="javascript:void(0);" onClick={() => this.viewConfigJson(data.configId)}>View</a>
                  </td>
                  <td>
                    <a href="javascript:void(0);" onClick={() => this.deleteConfigJson(data.configId, data.configName)}>Delete</a>
                  </td>
                </tr>
              )
            }.bind(this))}
          </tbody>
        </table>
      </div>

    )
  }
}

export default Dashboard;