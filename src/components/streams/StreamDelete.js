
import React from 'react'
import Modal from '../Modal'
import { Link } from 'react-router-dom'

import history from '../../history'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'
class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }
  delete = (id) => {
    this.props.deleteStream(id)
  }
  renderActions() {
    const id = this.props.match.params.id
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id) } className="ui negative button">Delete</button>
        <Link  to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream'
    }
    return `Are you sure you want to delete the stream with the title: ${this.props.stream.title}`
  }

  render () {

    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)