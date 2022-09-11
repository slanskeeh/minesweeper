import './cell.sass'
import bomb from '../../resources/icons/bomb.png'

import { Component } from 'react'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.value = props.value
        this.isEmpty = props.value === 0
    }

    state = {
        isChecked: false
    }

    handleClick = () => {
        this.setState({
            isChecked: true
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

    render() {
        return(
            <div className='cell'>
                {!this.state.isChecked && <div className="mask" onClick={() => this.handleClick()}/>}
                {this.whatContent(this.value)}
            </div>
        )
    }
}

export default Cell