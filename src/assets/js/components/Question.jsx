import React, { Component } from 'react'

const questionStyle = {
    width: "15%",
    margin: "5px"
}

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.question.id,
            description: props.question.description,
            allowMultiple: props.question.allowMultiple,
            questionType: props.question.questionType,
            position: props.question.position || null,
            selected: null
        }

        this.vote = this.vote.bind(this);
    }


    vote(event) {
        let nValue = event.target.value;
        if (nValue == 'true') {
            nValue = true;
        } else {
            nValue = false;
        }
        this.props.onVote(nValue);
        this.setState({
            selected: nValue
        });

    }
    
    componentDidUpdate() {
        if (this.props.defaultValue != undefined && this.props.defaultValue != this.state.selected) {
            this.setState({
                selected: this.props.defaultValue,
            });
        }
    }

    render () {
        const { id, description, questionType, selected, position} = this.state;
        let selectDiv = '';
        if (questionType == 'true-false') {
            selectDiv = <p style={questionStyle} className="columns">
                <label className="column"><input id={"option-1-" + id} onClick={this.vote} type="checkbox" value={true} checked={selected == true}/><span>&nbsp;&nbsp;Sí</span></label>
                <label className="column"><input id={"option-2-" + id} onClick={this.vote} type="checkbox" value={false} checked={selected == false} /><span>&nbsp;&nbsp;No</span></label>
            </p>
        }
        return (
            <div className='question'>
                <p>{this.props.defaultValue}{position} - {description}</p>
                <div>
                    {selectDiv}
                </div>
            </div>
        )
    }

}