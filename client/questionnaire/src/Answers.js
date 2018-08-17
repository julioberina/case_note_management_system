import React, { Component } from 'react';
import { Container, Header, Form, Radio, Button } from 'semantic-ui-react';

class Question extends Component {
  render() {
    return (
      <Form.Field>
        <Header as='h4'>{this.props.text}</Header>
      </Form.Field>
    );
  }
}

class JobFoundRadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = (e, { value }) => this.setState({ value });
  }

  render() {
    return (
      <div>
        <Form.Field>
          <Radio name="jobgroup" label='Yes'
            value='yes' checked={this.state.value === 'yes'}
            onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Radio name="jobgroup" label='No'
            value='no' checked={this.state.value === 'no'}
            onChange={this.handleChange} />
        </Form.Field>
        <br />
      </div>
    );
  }
}

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Container text className='questionnaire-style'>
        <Form>
          <Header as='h1'>Questionnaire</Header><br />

          <Question text='When did you complete training?' />
          <Form.Field>
            <input type="date" name="training" />
          </Form.Field><br />

          <Question text='Did you find a job?' />
          <JobFoundRadioGroup />

          <Button primary type='submit'>Submit</Button><br /><br /><br />
        </Form>
      </Container>
    );
  }
}

export default Answers;