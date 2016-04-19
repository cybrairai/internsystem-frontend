import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import * as actions from '../actions'

import getters from '../getters'
import { isLoggedIn } from '../../auth/getters'
import InternService from '../services/InternService'

import Loader from '../../../components/Loader'

@connect(props => ({
  isLoggedIn,
  levels: getters.accesslevels
}))
export default class Levels extends React.Component {
  constructor(props){
    super(props)
    actions.getAccessLevels()
  }

  renderLevels() {
    if(!this.props.levels.get('data')){
      return
    }
    return (
      <div>
        <h1>Access levels</h1>
        <table className="table-responsive table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UiO name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {this.props.levels.get('data').toList().toJS().map((level) => (
            <tr key={level.id}>
              <td>{level.name}</td>
              <td>{level.uio_name}</td>
              <td>{level.description}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Loader
          isLoading={this.props.levels.get('isLoading')}
          error={this.props.levels.get('error')}
          isEmpty={!this.props.levels.get('data')}
        >
          Loading..
        </Loader>
        {this.renderLevels()}

      </div>
    )
  }
}