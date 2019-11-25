import { Card, ResourceItem, TextStyle } from '@shopify/polaris';


class ResourceListWithVendys extends React.Component {
  render() {
    if (!this.props.data) return <div>loading..</div>
    return (
     <Card title="Your digital assistants">
        {
          this.props.data.map((d, i) => {
            return (
              <ResourceItem
                id={d._id}
                url={`assistants/${d._id}`}
                accessibilityLabel={`edit assistant for ${d.name}`}
                key={i}
              >
              <h3>
                <TextStyle variation="strong">{d.name}</TextStyle>
              </h3>
              <div>{d.questions.length} Questions</div>
            </ResourceItem>
            );
          })
        }
      </Card>
    );
  }
}

 export default ResourceListWithVendys;
