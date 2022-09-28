import './cell.sass'
import bomb from '../../resources/icons/bomb.png'
import flag from '../../resources/icons/finish.png'

import { Component } from 'react'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.value = props.value
        this.id = props.id
        this.onOpening = props.onOpening
        this.isOpened = props.isOpened
    }

    state = {
        isChecked: false,
        flag: false
    }   

    handleLeftClick = () => {
        this.setState({
            isChecked: true
        })
    }

    handleRightClick = (e) => {
        e.preventDefault()
        this.setState({
            flag: !this.state.flag
        })
    }

    whatContent = (value) => {
        if (value === 'bomb') {
            return (
                <img src={bomb} alt="bomb" />
            )
        } else if (value === 0) {
            return ''
        } else {
            return value
        }
    }

    cellStatus = () => {
        if (!this.state.isChecked) {
            if (this.state.flag) {
                return (
                    <div className="mask flagged">
                        <img src={flag} alt="flag" className="flag" />
                    </div>
                )
            } else {
                return (
                    <div className="mask" onClick={this.handleLeftClick}/>
                )
            }
        } else {
            return;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isOpened !== prevProps.isOpened) {
            this.setState({isChecked: true})
            this.clickOrNot()
        }
    }

    clickOrNot = () => {
        if (this.value === 0) this.onOpening(this.id)
    }

    render() {
        return(
            <div className='cell' onContextMenu={e => this.handleRightClick(e)} onClick={this.clickOrNot}>
                {this.cellStatus()}
                {this.whatContent(this.value)}
            </div>
        )
    }
}

export default Cell