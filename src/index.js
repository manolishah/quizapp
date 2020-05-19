import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import quizService from "./quizService";
import  QuestionBox from "./components/QuestionBox";
import Result  from "./components/Result";
class QuizBee extends Component{
    
    state={
        questionBank:[],
        score:0,
        responses:0
    };
    
//get question details in Quizservices
    getQuesion = () => {
        quizService().then(question => {
            this.setState({
                questionBank:question
            });
        });
    };
    //check selected ans is correct or not 
    comuteAnswer = (answers,corretanswer) => {
        if(answers === corretanswer){
            this.setState({
                //if anser is correct add 1 in score
                score:this.state.score+1
            });
        }
        this.setState({
            //check response is more than 5 than add else add 1
            responses:this.state.responses< 5 ? this.state.responses + 1 : 5
        });
    };
    // after completing game user wants paly agin 
    playAgain = () => {
        this.getQuesion();
        this.setState({
            score:0,
            responses:0
        });
    };
    componentDidMount(){
        this.getQuesion();
    }
    render(){
        return(
            <div className="container">
                <div className="title">QuizeBee</div>
                {this.state.questionBank.length>0 &&
                this.state.responses < 5 &&
                 this.state.questionBank.map
                 (({question,answers, correct,questionId}) => (
                    <QuestionBox 
                    question={question}
                     options={answers} 
                     key={questionId} 
                     selected={answers => this.comuteAnswer(answers,correct)}
                     />
                    )
                )}
                {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>):null }
            </div>
        );
    }
}
ReactDOM.render(<QuizBee />,document.getElementById("root"));