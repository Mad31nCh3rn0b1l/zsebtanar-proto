import React, { Component } from 'react'
import ReactGa from 'react-ga'

export const trackPage = (page, options = {}) => {
  ReactGa.set({
    page,
    ...options
  })
  ReactGa.pageview(page)
}

export const withTracker = (WrappedComponent, options = {}) => {
  return class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname
      trackPage(page, options)
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}