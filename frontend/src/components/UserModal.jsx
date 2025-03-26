import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserModal({ onClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">User List</h2>

        {users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="mb-6 p-4 border rounded-lg shadow-md bg-gray-50">
              <p className="text-lg font-semibold text-gray-700">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-600"><strong>Mobile:</strong> {user.mobileNumber}</p>
              <p className="text-sm text-gray-600"><strong>Gender:</strong> {user.gender}</p>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-700">Documents:</h3>
                <ul className="mt-2 space-y-2">
                  {user.documents.map(doc => (
                    <li key={doc._id} className="text-sm">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default UserModal;
