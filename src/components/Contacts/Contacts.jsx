import PropTypes from 'prop-types';
import s from './Contacts.module.css';

function Contacts({ contacts, deleteContact }) {
  return (
    <>
      <ul>
        {contacts.map(contact => (
          <li className={s.item} id={contact.id} key={contact.id}>
            <span className={s.contact}>
              {contact.name} {contact.number}
            </span>
            <button
              className={s.btn}
              type="button"
              onClick={() => {
                deleteContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contacts;
