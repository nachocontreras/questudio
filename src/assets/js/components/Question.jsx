import React, { Component } from 'react'

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.question.description,
            allowMultiple: props.question.allowMultiple,
            questionType: props.question.questionType,
            selected: null
        }
    }

    vote(event) {
        this.setState({
            selected: event.target.value
        });
        this.props.onVote(this.selected);
    }

    render () {
        const { description, questionType } = this.state
        let selectDiv = '';
        if (questionType == 'true-false') {
            selectDiv = <select onChange={vote} value={selected}>
                <option value={true}>Sí</option>
                <option value={false}>No</option>
            </select>
        }
        console.log(selectDiv);
        return (
            <div className='question'>
                <p>{description}</p>
                {selectDiv}
            </div>
        )
    }

}