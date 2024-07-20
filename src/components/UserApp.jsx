import React, { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

function UserApp() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleSearch = () => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm addUser={addUser} />
      <div>
        <input 
          type="text" 
          placeholder="Search users" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <UserList users={searchResults.length > 0 ? searchResults : users} deleteUser={deleteUser} updateUser={updateUser} />
      <p>Total Users: {users.length}</p>
    </div>
  );
}

export default UserApp;

