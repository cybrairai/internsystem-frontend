import React from 'react'
import { Link } from 'react-router'

import List from './List'

import MemberService from '../services/MemberService'

import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import * as actions from '../actions'

import { isLoggedIn } from '../../auth/getters'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

@connect(props => ({
  isLoggedIn
}))
export default class Add extends React.Component {
  constructor(props) {
    super(props)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.initState()
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleLifetimeChange(e) {
    this.setState({lifetime: e.target.checked})
  }

  initState() {
    this.state = {name: '', email: '', lifetime: false}
    actions.getMemberList(1, 10, '-date_joined')
  }

  handleSubmit(e) {
    e.preventDefault()
    const name = this.state.name
    const email = this.state.email
    const lifetime = this.state.lifetime
    MemberService.registerMember(name, email, lifetime).then(result => {
      actions.getMemberList(1, 10, '-date_joined')
      this.setState({
        isSending: false,
        name: '',
        email: '',
        lifetime: false
      })
    }, error => {
      alert(error.responseText)
    })
  }


  renderAddForm() {
    return (
      <div className="panel-body">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">

            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} placeholder="John Doe"
                   onChange={this.handleNameChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" value={this.state.email} placeholder="user@example.com"
                   onChange={this.handleEmailChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="lifetime">
              <input type="checkbox" name="lifetime" value={this.state.lifetime}
                     onChange={this.handleLifetimeChange}/>Lifetime</label>
          </div>
          <div className="form-group">
            <input type="submit" className="form-control btn-success" value="Add member"/>
          </div>

        </form>
      </div >
    )

  }

  renderNewlyMembers() {

    return (
      <List />
    )
  }


  render() {
    console.debug(this.props.isLoggedIn)
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add member</div>
        {this.renderAddForm()}
        <h2>Recent members:</h2>
        {this.renderNewlyMembers()}
      </div>
    )

  }

}
