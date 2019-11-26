import { Card,
         TextField,
         TextContainer } from '@shopify/polaris';
import OptionModal from '../components/OptionModal'
import axios from 'axios';
import { formState } from '../helpers/parserFunctions'

class QuestionCard extends React.Component {
    state = {
        modal: false,
        form: {
            id: null,
            title: null,
            options: []
        }
    }
    componentDidMount(){
        if(this.props.question && this.props.question !== this.state.form){
            this.setState(()=>{
                return {
                    id: this.props.question._id,
                    title: this.props.question.title,
                    options: this.props.question.options
                }
            })
        }
    }
	handleSubmit = () =>{
        const {assistant} = this.props
        const {id} = this.state.form
        if(!id){
            axios.post(`/api/v1/assistants/${assistant._id}/questions`,this.state.form)
            .then(res => {
                this.props.responseData(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        } else {
            axios.put(`/api/v1/assistants/${assistant._id}/questions/${id}`,this.state.form)
            .then(res => {
                this.props.responseData(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        }
    }
    toggle = () =>{
        this.setState((prevState)=>{
            return {
                modal: !prevState.modal
            }
        })
    }
    handleChange = (val, id) =>{
        this.setState((state)=>{
            return {
                form: formState(val, id, state)
            }
        })
    }
    render() {
    return (
        <Card
            secondaryFooterActions={[{
                content: 'New option',
                onAction: ()=> this.toggle()
            }]}
            primaryFooterAction={{
                content: 'Save Question',
                onAction: ()=> this.handleSubmit()
            }}>
            <Card.Section title="Question title">
                <TextContainer>
                    <TextField
                        id="title"
                        value={this.state.form.title}
                        onChange={this.handleChange}
                        placeholder="Enter your question text here."
                    />
                </TextContainer>
            </Card.Section>
            <Card.Section title="Question options">
            {
                this.state.form.options.map((val,i)=>{
                <TextContainer key={i}>
                    {val.name}
                </TextContainer>
                })
            }
            </Card.Section>
            <OptionModal
                open={this.state.modal}
                closeModal={this.toggle}
                assistant={this.props.assistant}
                updateOptions={this.updateOptions}
                responseData={this.props.responseData}
            />
        </Card>
        );
    }
}

export default QuestionCard;
