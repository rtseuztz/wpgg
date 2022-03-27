import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
type GameFacadeProps = {
    win: boolean,
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

    handleClick() {
        //let inputName = event.target.value
        if (this.state.expand == " expand") {
            this.setState({
                expand: ""
            })
        } else {
            this.setState({
                expand: " expand"
            })
        }

    }
    override render() {
        return (
            <div className={"gameFacade " + this.props.win + this.state.expand} onClick={this.handleClick}>
                <div className="gameDisplay">
                    <img 
                        alt="championNameHere"
                        className="championIcon" 
                        src={"champion/" + this.props.championIcon + ".png"} 
                        />
                    <div className="gameStats">{this.props.gameStats}</div>
                    <div className="gameDate">{this.props.gameDate}</div>
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
    Right = "participantLeft"
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
                <img alt="" className="championIcon" src={"champion/" + this.props.championIcon + ".png"} />
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
export {Game, GameFacade, ParticipantList, Participant, GameStats, Side}
    //export default GameModule.Game