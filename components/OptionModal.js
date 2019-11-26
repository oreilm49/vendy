import { TextContainer,
         OptionList,
         Modal } from '@shopify/polaris';
import { formState } from '../helpers/parserFunctions'
import axios from 'axios';

class OptionModal extends React.Component {
    state = {
        products:[],
        option: {
            id: null,
            title: null,
            products:[]
        },
        assistant:null,
        question:null,
        submitted: false,
        modal: false,
        products: null,
        attributes: null
    };
    componentDidMount(){
        if(this.props.option && this.props.option !== this.state.form){
            this.setState(()=>{
                return {
                    id: this.props.option._id,
                    title: this.props.option.title,
                    options: this.props.option.products
                }
            })
        }
    }
    handleChange = (e) =>{
      this.setState((state)=>{
          return {
              form: formState(e, state)
          }
      })
    }
	handleSubmit = () =>{
        const {assistant, question} = this.props
        const {id} = this.state.form
        if(!id){
            axios.post(`/api/v1/assistants/${assistant._id}/questions/${question._id}/options`,this.state.form)
            .then(res => {
                this.props.responseData(res.data)
                this.props.closeModal()
            })
            .catch(err => {
                console.log(err)
            });
        } else {
            axios.put(`/api/v1/assistants/${assistant._id}/questions/${question._id}/options/${id}`,this.state.form)
            .then(res => {
                this.props.responseData(res.data)
                this.props.closeModal()
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.closeModal}
                title="Add option to question"
                primaryAction={{
                    content: 'Submit Option',
                    onAction: ()=> this.handleSubmit(),
                }}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                        Add an option for the user to select when using the assistant.
                        Select what products should be linked to this option.
                        </p>
                    </TextContainer>
                    <OptionList
                        title="Select Products"
                        onChange={this.handleChange}
                        options={this.state.products}
                        selected={this.state.option.products}
                        allowMultiple
                    />
                </Modal.Section>
            </Modal>
        );
    }
}

export default OptionModal;
