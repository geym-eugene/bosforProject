import { useAppDispatch, useAppSelector } from '@/shared/library/hooks';
import React from 'react'

import { useState, useEffect } from 'react';
import { getAllUsersThunk, giveAdminRoleThunk } from '../model/userThunks';
import { UserType } from '../model/userType';

export default function UserAdmin() {
  const [search, setSearch] = useState('');

  const users = useAppSelector(store => store.user.users)
  const dispatch = useAppDispatch()

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const giveAdmin = (obj) => {
    void dispatch(giveAdminRoleThunk(obj))
  };

  useEffect(() => {
    // Обычно здесь будет axios.get(...) к API
   void dispatch(getAllUsersThunk())
  }, [dispatch]);


  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Список пользователей</h1>

      <input
        type="text"
        placeholder="Поиск по имени или email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 bg-white shadow-sm border rounded-md"
          >
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.id}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
            <button
              onClick={() => {
                if (user.role === 'user') return giveAdmin({id: user.id, role: 'moder'})
                giveAdmin({id: user.id, role: 'user'})
              }}
              className="text-gray-600 hover:text-blue-800 font-medium transition"
            >
                {user.role === "user" ? "выдать право на модерацию" : "отнять право на модерацию"}
            </button>
          </li>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center">Пользователи не найдены</p>
        )}
      </ul>
    </div>
  );
}

