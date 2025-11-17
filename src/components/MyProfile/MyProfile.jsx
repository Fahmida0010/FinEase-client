import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';


const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    const handleUpdate = async() => {
        try {
            await user.updateProfile({
                displayName,
                photoURL
            });
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2 className='text-blue-700 font-semibold'>My Profile</h2>
            <img src={photoURL} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />
            <div>
       <label>Name:</label>
                <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>
            <div>
                <label>Photo URL:</label>
                <input className='text-blue-700' type="text" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input className='text-blue-700' type="text" value={user.email} readOnly />
            </div>
            <button className='bg-green-300 font-bold rounded p-3 ' onClick={handleUpdate}>Update Profile</button>
        </div>
    );
};

export default MyProfile;
