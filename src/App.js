import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dashboard from './Dashboard.js';
import { API_ROOT } from './api-config';

import {
    JsonTree,
    ADD_DELTA_TYPE,
    REMOVE_DELTA_TYPE,
    UPDATE_DELTA_TYPE,
    DATA_TYPES,
    INPUT_USAGE_TYPES,
} from 'react-editable-json-tree';

let readOnlyProperties = [];
$.get(API_ROOT+"getReadOnlyProperties", function(data) {
  if(data.property === 'readOnly') {
    readOnlyProperties = data.keys;
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {jsonData:{}, showAddButton: true, isUpdated: true, hoverRowId: ''};
  }

  addConfigJson() {
      this.setState({jsonData: {}, showAddButton: true, isUpdated: false, hoverRowId: ''});
  }

  viewConfigJson(id) {
    var thisComponent = this;
    $.get(API_ROOT+"find/"+id, function(data) {
      thisComponent.setState({jsonData: data, showAddButton: false, isUpdated: false, hoverRowId: id});
      //console.log(thisComponent.state.jsonData);
    });
  }

  sendDataToServer(action, promptMessage) {
    var thisComponent = this;
    $.ajax({
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: 'POST',
      url: API_ROOT+action,
      data: JSON.stringify(this.state.jsonData),
      error: function(data) {
        alert(data.responseText);
      },
      success: function () {
        alert(promptMessage);
        thisComponent.setState({jsonData: {}, showAddButton: true, isUpdated: true, hoverRowId: ''});
      }
    });
  }

  saveConfigJsonToDb() {
    this.sendDataToServer('save', 'Saved successfully!');
  }

  updateConfigJsonToDb() {
    this.sendDataToServer('update', 'Updated successfully!');
  }

  deleteConfigJson(id, name) {
    var thisComponent = this;
    $.get(API_ROOT+"delete/"+id, function(data) {
      alert(name + ": Deleted successfully!");
      thisComponent.setState({jsonData: {}, showAddButton: true, isUpdated: true, hoverRowId: ''});
    });
  }

  validateReadOnlyProperties(keyPath) {
    //console.log(keyPath.toString());
    if(this.state.showAddButton)
      return false;

    var keyPathString = keyPath.toString();
    var regex = /,\d+,/;
    var keyPathString = keyPathString.replace(regex, ",#,");

    return readOnlyProperties.includes(keyPathString);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Dashboard timeStampForUniqueCheck={new Date().getTime()}
                     isUpdated={this.state.isUpdated}
                     addConfigJson={this.addConfigJson.bind(this)}
                     viewConfigJson={this.viewConfigJson.bind(this)}
                     deleteConfigJson={this.deleteConfigJson.bind(this)}
                     hoverRowId={this.state.hoverRowId}/>
        </div>
        <div className="col-md-6">
          <div className="row">
            {this.state.showAddButton ?
            (
              <input type="button" onClick={() => this.saveConfigJsonToDb()} className="btn btn-outline-primary" value="Add"/>
            ) :
            (
              <input type="button" onClick={() => this.updateConfigJsonToDb()} className="btn btn-outline-primary" value="Update"/>
            )}
          </div>

          <div className="row mt-4 mb-4">
            <JsonTree
                rootName="configuration"
                editButtonElement={<button>Edit</button>}
                cancelButtonElement={<button>Cancel</button>}
                addButtonElement={<button>Add</button>}
                readOnly={(keyName, data, keyPath, deep, dataType) => this.validateReadOnlyProperties(keyPath)}
                data={this.state.jsonData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
