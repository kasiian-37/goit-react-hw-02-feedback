import  { Component } from 'react';
import Section from './components/Section/Section';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

export default class App extends Component {
  state = { good: 0, neutral: 0, bad: 0 };

  feedbackHandler = e => {
    this.setState(prevState => {
      const buttonId = e.target.id;
      return {
        [buttonId]: prevState[buttonId] + 1,
      };
    });
  };

  countTotalFeedback = () =>
    Object.values(this.state).reduce((acc, value) => acc + value, 0);

  countPositiveFeedbackPercentage = () => {
    return Math.round((100 / this.countTotalFeedback()) * this.state.good);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const feedbacksTotalAmount = this.countTotalFeedback();
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.feedbackHandler}
          />
        </Section>
        <Section title="Statistics">
          {feedbacksTotalAmount === 0 && (
            <Notification message="No feedback given" />
          )}

          {feedbacksTotalAmount > 0 && (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={feedbacksTotalAmount}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </>
    );
  }
}
