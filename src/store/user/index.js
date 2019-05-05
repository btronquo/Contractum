import * as firebase from 'firebase/app'
import 'firebase/auth';

const fb = require('../../fb.js')

import router from '@/router';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload
    }
  },
  actions: {
    // --- login
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            commit('setIsAuthenticated', true)
            this._vm.$toasted.show('Welcome, Citizen')
          }
        )
        .catch(
          error => {
            commit('setUser', null)
            commit('setIsAuthenticated', false)
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            commit('setIsAuthenticated', true)
            this._vm.$toasted.show('Welcome, Citizen')
          }
        )
        .catch(
          error => {
            commit('setUser', null)
            commit('setIsAuthenticated', false)
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            commit('setIsAuthenticated', true);
            this._vm.$toasted.show('Welcome, Citizen')
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit, dispatch}, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
      dispatch('readProfile')
      router.push('/dashboard')
    },
    resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          commit('setLoading', false)
          this._vm.$toasted.show('A reset password has been sent to the provided email.')
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    logout ({commit}) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          router.push('/')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          router.push('/')
        })
    },
    // --- profile
    createProfile({ state, dispatch }) {
      fb.usersCollection.doc(state.user.id).set(state.user).then(function() {
        dispatch('readProfile')
      }).catch(err => {
          console.log(err)
      })
    },
    readProfile({ state, dispatch }) {

      fb.usersCollection.doc(state.user.id).get().then(function(doc) {
        if (doc.exists) {
          if(doc.data().scUsername){
            state.user = { ...state.user, scUsername: doc.data().scUsername }
          }else{
            state.user = { ...state.user, scUsername: false }
          }

        }else {
          console.log('creation du profile')
          dispatch('createProfile')
        }
      }).catch(err => {
          console.log(err)
      })
    },
    updateProfile({ state, dispatch }, data) {
      let scUsername = data.scUsername
      fb.usersCollection.doc(state.user.id).update({ scUsername: scUsername }).then(function() {
        dispatch('readProfile')
      }).catch(err => {
          console.log(err)
      })
    },
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
}
