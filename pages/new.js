import { Page, Heading } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import QuestionCard from '../components/QuestionCard'
import axios from 'axios';
import { formState } from '../helpers/parserFunctions'

class New extends React.Component {
  	state = {
		form: {
			id: null,
			title: null,
			questions:[]
		},
		submitted: false,
		products: null,
		attributes: null
	};
  	componentDidMount(){
		axios.post('/api/v1/assistants',{ name: " " })
		.then(res => {
		this.setState(()=>{
			return {
				form: res.data
			}
		})
		})
		.catch(err => {
			console.log(err)
		});
	}
  	handleChange = (e) =>{
		this.setState((state)=>{
			return {
				form: formState(e, state)
			}
		})
	}
	handleSubmit = () =>{
		axios.put(`/api/v1/assistants/${id}`,this.state.form)
		.then(res => {
			this.setState(()=>{
				return {
					form: res.data
				}
			})
		})
		.catch(err => {
			console.log(err)
		});
	}
	updateState = (data) =>{
		this.setState(()=>{
			return {
				form: data
			}
		})
	}
	render() {
		return (
		<Page>
			<TitleBar primaryAction={{
					content: 'Create Vendy'
				}}
			/>
			<Heading>New Assistant</Heading>
			{
				this.state.form.questions.map((val, id)=>{
					return <QuestionCard
								responseData={this.updateState}
								assistant={this.state.form}
								question={val}/>
				})
			}
			<QuestionCard
				responseData={this.updateState}
				assistant={this.state.form}/>
		</Page >
		);
	}
}

export default New;
