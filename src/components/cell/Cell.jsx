import './cell.sass'
import bomb from '../../resources/icons/bomb.svg'
import flag from '../../resources/icons/flag.svg'

import { Component } from 'react'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.value = props.value
        this.id = props.id
        this.onOpening = props.onOpening
        this.isOpened = props.isOpened
        this.ifBomb = props.ifBomb
    }

    state = {
        isChecked: false,
        flag: false,
        isEnded: false
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
                <img src={bomb} alt="bomb" style={{width: 25}} />
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
        this.ifBomb(this.value)
    }

    render() {
        return(
            <div className='cell' onContextMenu={e => this.handleRightClick(e)} onClick={this.clickOrNot} style={{backgroundColor: this.value === 'bomb' ? '#A3293D' : '#5C5C5C'}}>
                {this.cellStatus()}
                {this.whatContent(this.value)}
            </div>
        )
    }
}

export default Cell