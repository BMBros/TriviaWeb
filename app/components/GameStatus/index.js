/**
* @flow
* GameStatus
*
*/

import React from 'react';
import _ from 'lodash';
import {
  LOBBY,
  IN_PROGRESS_ROUND,
  IN_PROGRESS_QUESTION,
  SHOW_SCORES,
  COMPLETE,
} from '../../types/FirebaseTypes';
import type {
  Game,
  ScoreMap,
  PlayerMap,
  Answer,
 } from '../../types/FirebaseTypes';

export type GameStatusScore = {
  playerKey: string,
  playerName: string,
  points: number | string,
  lastAnswerCorrect: boolean,
}

type Props = {
  game: Game,
  // renderLobby: (playerCount?: number) => void,
  // renderInProgress: (playerCount?: number, lastRound?: boolean) => void,
  // renderGameOver: () => void,
  renderLobby: Function,
  renderInProgressRound: Function,
  renderInProgressQuestion: Function,
  renderShowScores?: Function,
  renderGameOver: Function,
}

const getPlayerCount = (players) => players ? Object.keys(players).length : 0;

function getScores(players: PlayerMap, scores?: ScoreMap, displayScores?: boolean): ?Array<GameStatusScore> {
  if (!scores) {
    return undefined;
  }
  const playerScores = [];
  let lastAnswerCorrect = false;
  Object.keys(scores).forEach((key) => {
    let points = 0;
    const player = _.get(scores, key);
    player.forEach((answer: Answer) => {
      if (answer.isCorrect || answer.isCorrectAdminOverride) {
        points += 1;
        lastAnswerCorrect = true;
      } else {
        lastAnswerCorrect = false;
      }
    });
    const playerName = players[key].playerName;
    playerScores.push({
      playerKey: key,
      playerName,
      points: displayScores ? points : '?',
      lastAnswerCorrect,
    });
  });

  return _.chain(playerScores).sortBy((value) => value.points).reverse().value();
}

const getSubmittedCount = (scores?: ScoreMap, round?: number) => {
  let submitted = 0;

  if (scores && round !== undefined) {
    const roundString = round.toString(10);
    Object.keys(scores).forEach((key) => {
      const playerResponse = _.get(scores, [key, roundString]);
      if (!_.isEmpty(playerResponse)) {
        submitted += 1;
      }
    });
  }
  return submitted;
};

class GameStatus extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function

  props: Props;

  render() {
    if (!this.props.game) {
      return null;
    }
    switch (this.props.game.status) {
      case LOBBY: {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        return this.props.renderLobby(playerCount);
      }
      case IN_PROGRESS_ROUND: {
        const { game } = this.props;
        const lastRound = game.questions.length === (game.round + 1);
        const scores = getScores(this.props.game.players, this.props.game.scores, this.props.game.displayScoresOnProjector);

        return this.props.renderInProgressRound(scores, lastRound);
      }
      case IN_PROGRESS_QUESTION: {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        const lastRound = game.questions.length === (game.round + 1);
        const submittedCount = getSubmittedCount(game.scores, game.round);

        return this.props.renderInProgressQuestion(playerCount, submittedCount, lastRound);
      }
      case SHOW_SCORES: {
        if (this.props.renderShowScores) {
          const scores = getScores(this.props.game.players, this.props.game.scores, this.props.game.displayScoresOnProjector);
          return this.props.renderShowScores && this.props.renderShowScores(scores);
        }
        return this.props.renderGameOver();
      }
      case COMPLETE:
        return this.props.renderGameOver();
      default:
        return this.props.renderGameOver();
    }
  }
}

GameStatus.propTypes = {

};

export default GameStatus;
