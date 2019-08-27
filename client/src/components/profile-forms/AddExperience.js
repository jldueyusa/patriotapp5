import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import longFlag from './longflag.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <div>
                <img style={{ height: 150, width: 1050 }} src={longFlag} alt='alongFlag' />;
           <h1 className='large text-primary'>Add A Deployment</h1>
                <p className='lead'>
                    <i className='fa fa-globe' /> Enter deployment information
      </p>
            </div>
            <small>* = required field</small>
            <form
                className='form'
                onSubmit={e => {
                    e.preventDefault();
                    addExperience(formData, history);
                }}
            >
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Role During Deployment'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Unit/Regiment/Command (can be different than current)'
                        name='company'
                        value={company}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Deployment Location'
                        name='location'
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <h4>From Date</h4>
                    <input
                        type='date'
                        name='from'
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <p>
                        <input
                            type='checkbox'
                            name='current'
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        Currently Deployed
          </p>
                </div>
                <div className='form-group'>
                    <h4>To Date</h4>
                    <input
                        type='date'
                        name='to'
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        name='description'
                        cols='30'
                        rows='5'
                        placeholder='Any outstanding experiences while on deployment you would like to highlight'
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
        </Link>
            </form>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(
    null,
    { addExperience }
)(withRouter(AddExperience));