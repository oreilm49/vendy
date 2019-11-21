import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Create Vendy',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <Layout>
          <EmptyState
            heading="Create a new digital assistant"
            action={{
              content: 'Create Vendy',
              onAction: () => this.setState({ open: true }),
            }}
            image={img}
          >
            <p>Create a digital assistant to help your customers find products faster!</p>
          </EmptyState>
        </Layout>
        <ResourceListWithProducts />
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
