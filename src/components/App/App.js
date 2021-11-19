import { Component } from 'react';
import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts.jsx';
import Filter from '../Filter/Filter.jsx';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  checkUser = contact => {
    return this.state.contacts.some(person => person.name.toLowerCase() === contact.name.toLowerCase());
  };

  handleSubmit = contact => {
    const { contacts } = this.state;

    this.setState(
      {
        contacts: [
          ...contacts,
          {
            id: uuidv4(),
            ...contact,
          },
        ],
      },
      () => console.log(this.state),
    );
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  filter() {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

  deleteContact = id => {
    this.setState(prevState => ({ contacts: prevState.contacts.filter(contact => contact.id !== id) }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <Form handleSubmit={this.handleSubmit} checkUser={this.checkUser} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} value={filter} />

        <Contacts contacts={filter ? this.filter() : contacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
