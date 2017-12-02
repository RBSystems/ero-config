import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Rooms from './room-components/Rooms';
import Sources from './source-components/Sources';
import Devices from './device-components/Devices';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tabId: 0,
      rooms: [],
      sources: [],
      devices: [],
    };

    this.setTabId = (id) => {
      this.setState({ tabId: id });
    };

    this.getAll = (route) => {
      axios.get('api/' + route).then(res => {
        this.setState({ [route]: res.data });
      });
    };
    
    this.add = (route, name) => {
      axios.post('api/' + route, {
        name: name,
      })
      .then(() => {
        this.getAll(route);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    this.delete = (route, name) => {
      axios.delete('api/' + route, {
        params: { name: name },
      })
      .then(() => {
        this.getAll(route);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    this.subscribe = (type, roomName, itemName) => {
      axios.put('api/roomSubscribe', {
        type: type,
        roomName: roomName,
        itemName: itemName,
      })
      .then(() => {
        console.log(`${roomName} subscribed to ${type} => ${itemName}`)
      })
      .catch((err) => {
        console.error(err);
      })
    };
  }

  componentDidMount() {
    this.getAll('rooms');
    this.getAll('sources');
    this.getAll('devices');
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header setTabId={this.setTabId} tabId={this.state.tabId} />
          <div className="main">
            <Route path="/" exact 
              render={() => (
                <Rooms
                  rooms={this.state.rooms}
                  sources={this.state.sources}
                  devices={this.state.devices}
                  add={this.add} 
                  delete={this.delete}
                  subscribe={this.subscribe}
                />
              )} 
            />
            <Route path="/sources" exact
              render={() => (
                <Sources
                  sources={this.state.sources}
                  add={this.add}
                  delete={this.delete}
                />
              )}
            />
            <Route path="/devices" exact
              render={() => (
                <Devices
                  devices={this.state.devices}
                  add={this.add}
                  delete={this.delete}
                />
              )}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;