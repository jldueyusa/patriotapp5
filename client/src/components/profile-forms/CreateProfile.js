import React, { useEffect, useState, Fragment } from "react";
import { BrowserRouter, Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import longFlag from './longflag.png';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";



const Createprofile = ({
    createProfile,
    getCurrentProfile,
    profile: { profile, loading },
    history,
}) => {
    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        profilePhotoURL: "",
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
        profilePhotoURL,
    } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };
    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentProfile]);

    const checkUploadResult = result => {
        if (result.event === "success") {

            const file = result.info.url;
            console.log("URL: ", file);
            setFormData({ ...formData, "profilePhotoURL": file });
        }
    };

    const showWidget = (e) => {
        let widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "juvia",
                uploadPreset: "w67g1hja",
                sources: ["local", "camera"]
            },
            (error, result) => {
                console.log("inside showWidget: ", result.info.url)
                checkUploadResult(result);
            }
        );
        widget.open();
    };

    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
            <Fragment>
                <div>
                    <img style={{ height: 150, width: 1050 }} src={longFlag} alt='alongFlag' />;
                <h1 className='large text-primary'>Create Your Profile</h1>
                    <p className='lead'>
                        <i className='fas fa-user' /> Enter your information below and connect
            with other families in the military community
      </p>
                </div>

                <small>* = required field</small>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <select name='status' value={status} onChange={e => onChange(e)}>
                            <option value="0">* What best describes your relationship</option>
                            <option value="Dependent Spouse">Dependent Spouse</option>
                            <option value="Dependent child">Dependent child</option>
                            <option value="Parent">Parent</option>
                            <option value="Brother/Sister">Brother/Sister</option>
                            <option value="Grandparent">Grandparent</option>
                            <option value="Aunt/Uncle">Aunt/Uncle</option>
                            <option value="Neice/Nephew">Neice/Nephew</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className='form-text'>
                            Describe your relationship
          </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Branch'
                            name='company'
                            value={company}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            Enter the branch of service
          </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Unit/Regiment/Command'
                            name='website'
                            value={website}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            Enter the current Unit/Regiment/Command i.e. 3rd Infantry Division, 11th Marine Regiment etc.
          </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Your Location'
                            name='location'
                            value={location}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            City & state suggested (eg. Boston, MA)
          </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='* Interests'
                            name='skills'
                            value={skills}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            Please use comma separated values (eg.
                Running, Watching movies, Swimming etc.)
          </small>
                    </div>
                
                    <div className='form-group'>
                        <textarea
                            placeholder='A short bio of yourself'
                            name='bio'
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>Tell us a little about yourself</small>
                    </div>
                    <div className='my-2'>
                        <button
                            onClick={() => toggleSocialInputs(!displaySocialInputs)}
                            type='button'
                            className='btn btn-light'
                        >
                            Add Social Network Links
          </button>
                        <span>Optional</span>
                    </div>
                    {displaySocialInputs && (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i className='fab fa-twitter fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='form-group social-input'>
                                <i className='fab fa-facebook fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='form-group social-input'>
                                <i className='fab fa-youtube fa-2x' />
                                <input
                                    type='text'
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='form-group social-input'>
                                <i className='fab fa-linkedin fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Linkedin URL'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='form-group social-input'>
                                <i className='fab fa-instagram fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )}
                    <input type='submit' className='btn btn-primary my-1' />
                    <Link className='btn btn-light my-1' to='/dashboard'>
                        Go Back
        </Link>

                    <button onClick={e => showWidget(e)} 
                    type='button'
                    className='btn btn-primary'>
                    <i className='fas fa-upload' />
                     Upload picture
                    
                    
                    </button>

                </form>
            </Fragment>
        );
};
Createprofile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile,
});
export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile },
)(withRouter(Createprofile));
