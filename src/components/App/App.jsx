import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { FaRegAddressBook, FaSearch } from 'react-icons/fa';
import {
  ContactList,
  ContactForm,
  Section,
  Container,
  HeaderSection,
  Header1,
  Header2,
  Input,
  Search,
  Notification,
} from './reexport';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      setContacts([...contactsLS]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in your contacts! Try to find in search.`);
      return;
    }

    setContacts(prev => [...prev, { ...data, id: nanoid() }]);
  };

  const handleClickDelete = contactId =>
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const filtered =
      filter && contacts.length
        ? contacts.filter(({ name }) =>
            name.trim().toLowerCase().includes(filter.trim().toLowerCase())
          )
        : contacts;
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <>
      <HeaderSection>
        <Container>
          <Header1>
            <FaRegAddressBook /> Phonebook
          </Header1>
        </Container>
      </HeaderSection>

      <Section>
        <Container>
          <ContactForm submitFn={handleSubmit} />
          <Header2>Contacts</Header2>
          <Search htmlFor="filter">
            <FaSearch />
          </Search>
          <Input
            type="text"
            name="filter"
            id="filter"
            onChange={handleChangeFilter}
            disabled={!contacts.length}
          />
          {!contacts.length ? (
            <Notification>
              You don't have contacts yet, add somebody!
            </Notification>
          ) : (
            <ContactList
              deleteContact={handleClickDelete}
              filter={getFilteredContacts()}
            />
          )}
        </Container>
      </Section>
    </>
  );
}
