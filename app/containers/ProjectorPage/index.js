/**
 * @flow
 * ProjectorPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';

import TeamStatus from '../../components/TeamStatus';
import type { GameStatusScore } from '../../components/GameStatus';
import {
  getRoomCode,
  getGame,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import GameStatus from '../../components/GameStatus';
import Question from '../../components/Question';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import * as firebaseActions from '../Firebase/actions';
import type {
  Game,
 } from '../../types/FirebaseTypes';

type Props = {
  roomCode: string,
  firebaseActions: typeof firebaseActions,
  game: Game,
}

type State = {
  width: number,
  height: number,
}
export class ProjectorPage extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    (this: any).renderLobby = this.renderLobby.bind(this);
    (this: any).renderInProgressQuestion = this.renderInProgressQuestion.bind(this);
    (this: any).renderInProgressRound = this.renderInProgressRound.bind(this);
    (this: any).renderShowScores = this.renderShowScores.bind(this);
    (this: any).renderGameOver = this.renderGameOver.bind(this);
    (this: any).updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const playerKey = localStorage.getItem('playerKey') || undefined;
    this.props.firebaseActions.listenToGame(this.props.roomCode);
    this.props.firebaseActions.listenToScore(this.props.roomCode, playerKey);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  props: Props;

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  renderLobby(playerCount: number) {
    return (
      <div>
        <p style={{ fontSize: 40 }}>Go to </p>
        <p style={{ fontSize: 80 }}>bmbros-trivia.firebaseapp.com</p>
        <p style={{ fontSize: 40 }}>on your mobile device to join in using room code</p>
        <p style={{ fontSize: 80 }}>{this.props.roomCode}</p>
        <p>Teams: {playerCount}</p>
        <TeamStatus
          style={{ width: '50%' }}
          players={this.props.game.players}
        />
      </div>
    );
  }

  renderInProgressRound(scores: Array<Object>) {
    return (
      <div>
        <p style={{ fontSize: 100 }}>Question {this.props.game.round + 1}</p>
        <TeamStatus
          style={{ width: '50%' }}
          players={this.props.game.players}
          scorePoints={scores}
          displayScoresOnProjector={this.props.game.displayScoresOnProjector}
        />
      </div>
    );
  }
  renderInProgressQuestion(playerCount: boolean, submittedCount: boolean) {
    return (
      <div>
        <Question
          style={{ textAlign: 'center' }}
          game={this.props.game}
        />
        <p style={{ fontSize: 30 }}>Teams ready: {submittedCount}/{playerCount}</p>
        <TeamStatus
          players={this.props.game.players}
          round={this.props.game.round}
          scores={this.props.game.scores}
        />
      </div>
    );
  }

  renderShowScores(scores: Array<GameStatusScore>) {
    return (
      <div style={{ fontSize: 40 }}>
        <p style={{ fontSize: 80 }}>Final Scores</p>
        <TeamStatus
          style={{ width: '50%' }}
          players={this.props.game.players}
          scorePoints={scores}
          displayScoresOnProjector={this.props.game.displayScoresOnProjector}
        />
      </div>
    );
  }
  renderGameOver() {
    return (
      <div>
        <p
          style={{
            fontSize: 80,
          }}
        >Game Over
        </p>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          ...container,
          height: this.state.height,
        }}
      >
        <section >
          <GameStatus
            game={this.props.game}
            renderLobby={this.renderLobby}
            renderInProgressQuestion={this.renderInProgressQuestion}
            renderInProgressRound={this.renderInProgressRound}
            renderShowScores={this.renderShowScores}
            renderGameOver={this.renderGameOver}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  roomCode: getRoomCode(),
  game: getGame(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'projectorPage', reducer });
const withSaga = injectSaga({ key: 'projectorPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectorPage);

const container = {
  textAlign: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
};
