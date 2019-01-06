import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

import { getTasks } from '../lib/fetch';

const styles = {
  container: {
  },
  listTitle: {
    color: '#284257',
    fontSize: '2em',
    textAlign: 'left',
    marginBottom: 7,
  },
  taskText: {
    color: '#284257',
    fontSize: '1.3em',
    textAlign: 'left',
    paddingLeft: 15,
  },
  icon: {
    color: '#284257',
    marginLeft: 15,
    fontSize: '0.9em',
  },
};

export default class Tasks extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.handleNewTasks = this.handleNewTasks.bind(this);
  }

  componentDidMount() {
    this.refreshTimer = setInterval(() => this.refreshTasks(), 1000 * 10);
    this.refreshTasks();
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  refreshTasks() {
    getTasks()
      .then(this.handleNewTasks)
      .catch(err => console.log(err));
  }

  handleNewTasks(tasks) {
    this.setState({
      tasks: tasks,
    });
  }

  renderTaskList() {
    if (this.state.tasks.length < 1) return null;
    return (
      <div>
        <div style={styles.listTitle}>
          {"Handlelista"}
          <FontAwesomeIcon icon={faShoppingBasket} style={styles.icon} />
        </div>
        {this.renderTopTasksItems()}
      </div>
    );
  }

  renderTopTasksItems() {
    return this.state.tasks.map((task, i) => {
      return (
        <div key={task.id}>
          <div style={styles.taskText}> <span role="img" aria-label="dot"> &#x26AB; </span> {task.title} </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={styles.container}>
        {this.renderTaskList()}
      </div>
    );
  }
}
