import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import s from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
      if (localStorageContacts) {
        setContacts(localStorageContacts);
      }
      isFirstRender.current = false;
      return;
    }

    return localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitHandler = ({ name, number }) => {
    const nameSearch = contacts.find(user => user.name === name);
    const numberSearch = contacts.find(user => user.number === number);

    nameSearch || numberSearch
      ? alert('Номер или имя уже есть в базе')
      : setContacts(prevState => {
          const userId = nanoid();
          const newArray = [
            ...prevState,
            { id: userId, name: name, number: number },
          ];
          return newArray;
        });
  };

  const changeFilter = e => {
    const value = e.target.value;
    setFilter(value);
  };

  const visibleFilter = () => {
    const normalizedFilter = filter.toLowerCase();

    if (contacts !== []) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const onDeleteUser = id => {
    setContacts(prevState => {
      const afterDeleteArray = prevState.filter(user => user.id !== id);
      return afterDeleteArray;
    });
  };

  return (
    <div className={s.container}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={onSubmitHandler} />
      {contacts.length !== 0 && (
        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChangeFilter={changeFilter} />

          <ContactList
            onVisibleFilter={visibleFilter}
            onDeleteUser={onDeleteUser}
          />
        </div>
      )}
    </div>
  );
}

export default App;
