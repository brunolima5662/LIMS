import { connect } from 'react-redux'
import AppUI from './ui'

export const mapStateToProps = state => {
    return {
    }
}

export const mapDispatchToProps = ( dispatch, ownProps ) => {
    return {
    }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)( AppUI )

//export const AppTheme = theme
export default App