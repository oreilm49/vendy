import { Card,
         Page,
         Layout,
         TextField,
         TextContainer,
         Icon } from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';

class New extends React.Component {
  state = {
    assistant: {
        title: null,
        questions:[]
    },
    submitted: false
  };
  handleChange = () =>{

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
            <Card  primaryFooterAction={{content: 'New option'}}>
                <Card.Section title="Question title">
                    <TextContainer>
                        <TextField
                            onChange={this.handleChange}
                            placeholder="Enter your question text here."
                        />
                    </TextContainer>
                </Card.Section>
                <Card.Section title="Question options">
                    <TextContainer>
                        Option 1
                    </TextContainer>
                </Card.Section>
            </Card>
      </Page >
    );
  }
}

export default New;
