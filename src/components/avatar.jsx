import PropTypes from 'prop-types';

const Avatar = ({ initial }) => {
    return (
        <div className="circular-avatar">
            <p>{initial}</p>
        </div>
    );
}

Avatar.propTypes = {
    initial: PropTypes.string.isRequired
};

export default Avatar;