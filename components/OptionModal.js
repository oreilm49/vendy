import { TextContainer,
         OptionList,
         Modal,
         TextField } from '@shopify/polaris';
import { formState } from '../helpers/parserFunctions'
import axios from 'axios';

class OptionModal extends React.Component {
    state = {
        products:[{id:"test",label:"test"},{id:"test2",label:"test2"}],
        form: {
            id: null,
            title: null,
            products:[]
        },
        assistant:null,
        question:null,
        submitted: false,
        modal: false,
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
    handleChange = (val, id) =>{
        this.setState((state)=>{
            return {
                form: formState(val, id, state)
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
    handleSelected = (e) => {
        console.log(e)
        this.setState((prevState)=>{
            if(prevState.form.products.includes(e)){
                return {
                    form:{
                        ...prevState.form,
                        products: prevState.form.products.filter((val,i)=>{
                            return val !== e
                        })
                    }
                }
            } else {
                return {
                    form:{
                        ...prevState.form,
                        products: prevState.form.products.concat(e)
                    }
                }
            }
        },()=>{console.log(this.state.form)})
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={()=> this.props.closeModal()}
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
                    <TextContainer>
                        <TextField
                            id="title"
                            value={this.state.form.title}
                            onChange={this.handleChange}
                            placeholder="Enter your option text here."
                        />
                    </TextContainer>
                    <OptionList
                        title="Select Products"
                        onChange={this.handleSelected}
                        options={this.state.products}
                        selected={this.state.form.products}
                        allowMultiple
                    />
                </Modal.Section>
            </Modal>
        );
    }
}

export default OptionModal;
