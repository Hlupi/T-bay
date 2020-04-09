import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Header, Container, Wrapper, Toolbar } from '../../fragments/Layout'
import { Search, Pagination, Pager } from '../../fragments/Events'
import { Arrow } from '../../fragments/Arrows'
import CrossButton from '../../fragments/Button'
import EventForm from './EventForm'
import Events from './Events'



class EventsList extends PureComponent {
  state = {
    adding: false,
    editing: false,
    eventToEdit: null,
    searchValue: '',
    start: 0,
    end: 9
  }

  toggleEditing = (event) => {
    this.setState((prevState, props) => ({ 
      editing: !prevState.editing,
      eventToEdit: event
    }))
  }

  toggleAdding = () => {
    this.setState((prevState, props) => ({ 
      adding: !prevState.adding 
    }))
  }

  handleSearch = (e) => {
    this.setState({searchValue: e.target.value})
  }

  handleNextPage = () => {
    if(this.props.events.length > 9 && this.state.end < this.props.events.length) {
      this.setState({
        start: this.state.start + 9,
        end: this.state.end + 9
      })
      document.querySelector('#page-top').scrollIntoView()
    }
  }

  handlePrevPage = () => {
    if(this.state.start >= 9) {
      this.setState({
        start: this.state.start - 9,
        end: this.state.end - 9
      })
    }
  }

  render() {
    const { isAdmin, events } = this.props
    const { adding, editing, eventToEdit, searchValue, start, end } = this.state

    const searchedEvents = events.sort((a, b) => a.starts - b.starts).filter(event => !!~`${event.name} ${event.description} ${event.starts} ${event.ends}`.toLowerCase().indexOf(searchValue.toLowerCase()))

    const renderEvents = searchedEvents.length > 10 ? searchedEvents.slice(start, end) : searchedEvents

    return (
      <React.Fragment>
        <Header main style={{ backgroundImage: "url('/img/shapes.svg')" }} />
        <Container relative as="section">
          <Wrapper id="page-top">
            <Toolbar events flex>
              <Search type="text" value={searchValue}  onChange={this.handleSearch} aria-label="Search events" placeholder="Search events" withAdmin={isAdmin} />
              { isAdmin && <CrossButton onClick={this.toggleAdding} ariaLabel="Add event" /> }
            </Toolbar>
            <Events onEdit={this.toggleEditing} searchValue={searchValue} events={renderEvents} />
            {searchedEvents.length > 9 &&
              <Pagination>
              <Pager disabled={start <= 0} onClick={this.handlePrevPage} aria-label="Previous page"><Arrow left disabled={start <= 0} /></Pager>
              <Pager disabled={end>= searchedEvents.length} onClick={this.handleNextPage} aria-label="Next page"><Arrow disabled={end>= searchedEvents.length} /></Pager>
              </Pagination>
              }
            { isAdmin && adding && 
              <EventForm close={this.toggleAdding} open={adding} /> }
            { isAdmin && editing && 
              <EventForm editing initialValues={eventToEdit} close={this.toggleEditing} open={editing} /> }
          </Wrapper>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    isAdmin: state.isAdmin,
    events: state.events
  }
}

export default connect(mapStateToProps)(EventsList)