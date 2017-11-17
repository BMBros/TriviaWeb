// @flow

export const firebase = {
  FIREBASE_UPDATE_REQUESTED: 'FIREBASE_UPDATE_REQUESTED',
  FIREBASE_UPDATE_FULFILLED: 'FIREBASE_UPDATE_FULFILLED',
  FIREBASE_UPDATE_REJECTED: 'FIREBASE_UPDATE_REJECTED',

  FIREBASE_REMOVE_REQUESTED: 'FIREBASE_REMOVE_REQUESTED',
  FIREBASE_REMOVE_FULFILLED: 'FIREBASE_REMOVE_FULFILLED',
  FIREBASE_REMOVE_REJECTED: 'FIREBASE_REMOVE_REJECTED',

  FIREBASE_LISTEN_REQUESTED: 'FIREBASE_LISTEN_REQUESTED',
  FIREBASE_LISTEN_FULFILLED: 'FIREBASE_LISTEN_FULFILLED',
  FIREBASE_LISTEN_REJECTED: 'FIREBASE_LISTEN_REJECTED',
  FIREBASE_LISTEN_CHILD_ADDED: 'FIREBASE_LISTEN_CHILD_ADDED',
  FIREBASE_LISTEN_CHILD_CHANGED: 'FIREBASE_LISTEN_CHILD_CHANGED',
  FIREBASE_LISTEN_CHILD_REMOVED: 'FIREBASE_LISTEN_CHILD_REMOVED',
  FIREBASE_LISTEN_REMOVED: 'FIREBASE_LISTEN_REMOVED',

  FIREBASE_REMOVE_LISTENER_REQUESTED: 'FIREBASE_REMOVE_LISTENER_REQUESTED',
  FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED:
    'FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED',
};

export const metaTypes = {
  messages: 'messages',
  userContacts: 'userContacts',
  game: 'game',
  allGames: 'allGames',
};

export const eventTypes = {
  CHILD_ADDED: 'CHILD_ADDED',
  CHILD_REMOVED: 'CHILD_REMOVED',
  CHILD_CHANGED: 'CHILD_CHANGED',
};
