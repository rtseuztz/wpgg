import React, {Component} from 'react';
import {images} from './images/champion/index'
type GameProps =  {
    participantsComponent: ParticipantList
}
class Game extends Component<GameProps, {
    gameName: string
}> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            gameName: "",
        }
    }
    override render() {
        return (
            <div className="gameBox">
                <div className="participantsBox">{this.props.participantsComponent}</div>
            </div>
        );
    }
}
enum Win {
    Win = "win",
    Lose = "lose"
} 
type GameFacadeProps = {
    win: Win,
    gameStats: JSX.Element,
    gameDate: string,
    gameBox: JSX.Element,
    championIcon: string
}
class GameFacade extends Component<GameFacadeProps, {
    expand: string
}> {
    constructor(props: GameFacadeProps) {
        super(props);
        this.state = {
            expand: ""
        }
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e: any) {
        switch (e.target.className) {
            case "fullScreen":
                console.log("full");
                break;
            default:
                if (this.state.expand === " expand") {
                    this.setState({
                        expand: ""
                    })
                } else {
                    this.setState({
                        expand: " expand"
                    })
                }
        }
    }
    override render() {
        return (
            <div className={"gameFacade " + this.props.win + this.state.expand} onClick={this.handleClick}>
                <div className="gameDisplay">
                    <img 
                        alt=""
                        className="championIcon" 
                        src={images[this.props.championIcon + ".png"]} 
                        />
                    <div className="gameStats">{this.props.gameStats}</div>
                    <div className="gameDate">{this.props.gameDate}</div>
                    <div className='fullScreen'>
                        O
                    </div>
                </div>
                {this.props.gameBox}
            </div>
        );
    }
}
type ParticipantListProps = {
    team1: any[]
    team2: any[]
}
class ParticipantList extends Component<ParticipantListProps> {
    constructor(props: ParticipantListProps) {
        super(props);
        this.state = {
        }
    }

    override render() {
        return (
            <div className="participantList">
                <ul className="team1">{this.props.team1}</ul>
                <ul className="team2">{this.props.team2}</ul>
            </div>
        );
    }
}
enum Side {
    Left = "participantLeft",
    Right = "participantRight"
} 
type ParticipantProps = {
    side: Side
    championIcon: string,
    summonerName: string,
}
class Participant extends Component<ParticipantProps> {
    constructor(props: ParticipantProps) {
        super(props);
        this.state = {
        }
    }

    override render() {
        return (
            <div className={this.props.side}>
                <img alt="" className="championIcon" src={images[this.props.championIcon + ".png"]} />
                <div className="summonerName">{this.props.summonerName}</div>
            </div>
        );
    }
}
type GameStatsProps = {
    kda: string,
    longkda: string,
    score: number
}
class GameStats extends Component<GameStatsProps> {
    constructor(props: GameStatsProps) {
        super(props);
        this.state = {
        }
    }

    override render() {
        return (
            <div className="gameStats">
                <div className="kda">{this.props.kda}</div>
                <div className="longKDA">{this.props.longkda}</div>
                <div className="score">{this.props.score}</div>
            </div>

        );
    }
}
export {Game, GameFacade, ParticipantList, Participant, GameStats, Side, Win}
    //export default GameModule.Game