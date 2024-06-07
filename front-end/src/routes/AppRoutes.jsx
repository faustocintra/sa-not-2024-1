import React from 'react'
import { Routes, Route } from 'react-router-dom'

<<<<<<< HEAD
import AuthGuard from './AuthGuard'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
import UserForm from '../pages/UserForm'
import BruteForce from '../pages/BruteForce'

// Rotas protegidas por AuthGuard
const guardedUserList = (
  <AuthGuard userLevel={2}>
    <UserList />
  </AuthGuard>
)
const guardedUserForm = (
  <AuthGuard userLevel={2}>
    <UserForm />
  </AuthGuard>
)
const guardedBruteForce = (
  <AuthGuard userLevel={1}>
    <BruteForce />
  </AuthGuard>
)
=======
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserList from '../pages/UserList'
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/login" element={ <LoginPage /> } />
<<<<<<< HEAD
    <Route path="/users" element={ guardedUserList } />
    <Route path="/users/new" element={ guardedUserForm } />
    <Route path="/users/:id" element={ guardedUserForm } />
    <Route path="/brute-force" element={ guardedBruteForce } /> 
=======
    <Route path="/users" element={ <UserList /> } />
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
  </Routes>
}