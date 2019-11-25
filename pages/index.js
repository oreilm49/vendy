import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithVendys from '../components/ResourceList';
import axios from 'axios';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = {
    open: false,
    assistants: null
  };
  componentDidMount(){
    axios.get('/api/v1/assistants')
    .then(res => {
      this.setState(()=>{
        return {
          assistants: res.data
        }
      })
    })
    .catch(err => {
      console.log(err)
    });
  }
  render() {
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Create Vendy',
            onAction: () => this.setState({ open: true }),
          }}
        />
          {
            !this.state.assistants?
            <EmptyState
            heading="Create a new digital assistant"
            action={{
              content: 'Create Vendy',
              onAction: () => this.setState({ open: true }),
            }}
            image={img}
          >
            <p>Create a digital assistant to help your customers find products faster!</p>
          </EmptyState>:
          <ResourceListWithVendys data={this.state.assistants} />
          }
      </Page >
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}

export default Index;
