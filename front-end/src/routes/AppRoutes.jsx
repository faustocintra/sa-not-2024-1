import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
import { UserForm } from '../pages/UserForm'
import BruteForce from './BruteForce'

export default function AppRoutes() {
  const guarderUserList = (
    <AuthGuard userLevel={2}>
      <UserList />
    </AuthGuard>
  )

  const guarderUserForm = (
    <AuthGuard userLevel={2}>
      <UserForm />
    </AuthGuard>
  )

  const guarderBruteForce = (
    <AuthGuard userLevel={1}>
      <BruteForce />
    </AuthGuard>
  )
  return <Routes>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/login" element={ <LoginPage /> } />
    <Route path="/users" element={ guarderUserList } />
    <Route path="/users/:id" element={ guarderUserForm } />
    <Route path="/brute-force" element={ guarderBruteForce } />
  </Routes>
}