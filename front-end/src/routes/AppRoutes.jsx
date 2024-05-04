import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
import UserForm from '../pages/UserForm'
import AuthGuard from './AuthGuard'
import BruteForce from '../pages/BruteForce'

export default function AppRoutes() {

  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/users" element={<AuthGuard userLevel={2}>
      <UserList />
    </AuthGuard>} />
    <Route path="/users/:id" element={<AuthGuard userLevel={2}>
      <UserForm />
    </AuthGuard>} />
    <Route path="/brute-force" element={<AuthGuard userLevel={1}>
      <BruteForce />
    </AuthGuard>} />
  </Routes>
}