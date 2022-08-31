import { PropTypes } from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import s from './ContactList.module.css';

function ContactList({ onVisibleFilter, onDeleteUser }) {
  const visibleContactsss = onVisibleFilter();
  return (
    <ul className={s.list}>
      {visibleContactsss.map(contactsItem => (
        <ContactListItem
          key={contactsItem.id}
          id={contactsItem.id}
          name={contactsItem.name}
          number={contactsItem.number}
          onDeleteUser={onDeleteUser}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onVisibleFilter: PropTypes.func,
  onDeleteUser: PropTypes.func,
};

export default ContactList;
