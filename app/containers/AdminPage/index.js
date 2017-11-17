/**
 * @flow
 * AdminPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';
import {
  Page,
  Toolbar,
  Button,
} from 'react-onsenui';

import makeSelectAdminPage, { getAllGames } from './selectors';
import reducer from './reducer';
import saga from './saga';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import GameTable from '../../components/GameTable';
import * as firebaseActions from '../Firebase/actions';
import type { GameMap } from '../../types/FirebaseTypes';

type Props = {
  firebaseActions: typeof firebaseActions,
  allGames?: GameMap,
}

export class AdminPage extends React.PureComponent<Props> { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.firebaseActions.listenToAllGames();
  }

  props: Props;

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Admin Portal</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <Button
            onClick={
            () => {
              // this.props.homeActions.joinGame(this.state.roomCode, this.state.teamName);
            }
          }
          >Create Game</Button>
          <GameTable
            games={this.props.allGames}
            onClick={(roomCode) => {
              // TODO Story/Issue #11
              // eslint-disable-next-line
              console.log('Pressed game with roomCode: ', roomCode);
            }}
          />
        </section>
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  adminpage: makeSelectAdminPage(),
  allGames: getAllGames(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminPage', reducer });
const withSaga = injectSaga({ key: 'adminPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminPage);