import React from 'react';

import { Col, Row, Form, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlus, faListUl } from '@fortawesome/free-solid-svg-icons'


import { getTasks, createTask } from '../lib/fetch';

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
  taskInput: {
    fontSize: '1.5em',
    marginBottom: 20
  },
  addTaskButton: {
  },
  addTaskButtonIcon: {
    color: 'white',
    fontSize: '1.8em',
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
      newItemText: '',
    };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.handleNewTasks = this.handleNewTasks.bind(this);
    this.renderAddTask = this.renderAddTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.newTaskNameChange = this.newTaskNameChange.bind(this);
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

  addNewTask() {
    if (this.state.newItemText.length > 0) {
      createTask(this.state.newItemText)
      .then(() => {
        this.setState({ newItemText: '' });
        toast.success('Tillagd!');
        this.refreshTasks();
      })
      .catch(err => { 
        this.setState({ newItemText: 'Failed to create task'});
        toast.error('Misslyckades att lägga till')
      });
    }
  }

  newTaskNameChange(input) {
    this.setState({
      newItemText: input.target.value,
    })
  }

  renderAddTask() {
    return (
      <div>
        <div style={styles.listTitle}>
          {"Lägg till"}
          <FontAwesomeIcon icon={faListUl} style={styles.icon} />
        </div>
        <Form>
          <FormControl
            bsSize='large'
            style={styles.taskInput}
            placeholder="Att handla"
            onChange={this.newTaskNameChange}
            value={this.state.newItemText}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.addNewTask();
                event.preventDefault();
              }
            }}
          />
          <Button block style={styles.addTaskButton} bsStyle="primary" onClick={this.addNewTask}>
            <FontAwesomeIcon icon={faPlus} style={styles.addTaskButtonIcon} />
          </Button>
        </Form>
      </div>
      );
  }

  render() {
    return (
      <Row style={styles.container}>
        <Col md={4}>
          {this.renderTaskList()}
        </Col>
        <Col md={4}>
          {this.renderAddTask()}
        </Col>
      </Row>
    );
  }
}
