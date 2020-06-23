import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.module.css'

const Home = ({ className }) => {
  return <div className={classNames(style.home, className)}>Hey Man!</div>
}

console.log(PropTypes)

Home.propTypes = {
  className: PropTypes.string,
}

Home.defaultProps = {
  className: null,
}

export default Home
