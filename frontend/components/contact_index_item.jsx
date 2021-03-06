import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchContact, deleteContact } from '../actions/contact_actions'
import NavBar from './navbar';

class ContactIndexItem extends React.Component {
    componentDidMount() {
        this.props.fetchContact(this.props.match.params.contactId);
    }

    render() {
        const { contact } = this.props;
        return (
            <>
                <NavBar/>
                <div className="contact">
                    <div>
                        <img src={contact.image_url} alt="contact photo" />
                        <ul>
                            <li>{contact.name}</li>
                            <li>Mobile {contact.mobile}</li>
                            <li>Home {contact.home}</li>
                            <li>Work {contact.work}</li>
                            <li>Email {contact.email}</li>
                            <li>Address {contact.address}</li>
                        </ul>
                    </div>
                    <span>
                        <Link to={`/editcontact/${contact.id}`}><i className="fas fa-edit"></i></Link>
                        <a onClick={() => this.props.deleteContact(contact.id).then(() => this.props.history.push('/'))}><i className="far fa-trash-alt"></i></a>
                    </span>
                </div>
            </>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.contactId;
    const defaultContact = { name: "", mobile: "", home: "", work: "", email: "", address: "", image_url: "https://www.ichs.com/wp-content/uploads/2016/11/generic-headshot-Copy.png"};
    const contact = state.contacts[id] || defaultContact;
    return { contact };
}

const mapDispatchToProps = dispatch => ({
    fetchContact: id => dispatch(fetchContact(id)),
    deleteContact: id => dispatch(deleteContact(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactIndexItem));