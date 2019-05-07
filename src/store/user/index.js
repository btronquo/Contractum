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
              email: user.email
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
              email: user.email
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
              email: user.email
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
        email: payload.email
      })
      dispatch('readProfile')
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

      state.user = {
        ...state.user,
          createdAt: Date.now(),
          rank: 'user',
          scUsername: null,
          biography: null,
          avatar: null
           }

      fb.usersCollection.doc(state.user.id).set(state.user).then(function() {
        dispatch('readProfile')
      }).catch(err => {
          console.log(err)
      })
    },
    readProfile({ state, dispatch }) {
      fb.usersCollection.doc(state.user.id).get().then(function(doc) {
        if (doc.exists) {
            state.user = {
              ...state.user,
                scUsername: doc.data().scUsername,
                createdAt: doc.data().createdAt,
                rank: doc.data().rank,
                avatar: doc.data().avatar,
                biography: doc.data().biography
            }
        }else {
          dispatch('createProfile')
        }
      }).catch(err => {
          console.log(err)
      })
    },
    updateProfile({ state, dispatch }, data) {
      console.log(typeof(data))
      fb.usersCollection.doc(state.user.id).update(
        data
      ).then(function() {
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
