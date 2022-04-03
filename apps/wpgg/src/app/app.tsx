import * as GameClass from './GameClasses'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
// function importAll(r: any): any {
//     const image: any = {};
//     _.each(r.keys(), item => {
//         images[item.replace('./', '')] = r(item)
//     })
//     return images;
// }

// // eslint-disable-next-line no-useless-escape
// const images = importAll(require.context('./images', false, /\.png/));


type user = {
  name: string,
  puuid: string,
  summonerLevel: number
}
type game = {
  info: any,

}
type LOLPalProps = {
  string: never
}
class App extends Component<{}, {
  name: string,
  inputName: string,
  level: number,
  games: game[],
  user: user
}> {
    constructor(props: {}) {

        super(props);
        this.state = {
            name: "",
            inputName: "",
            level: 0,
            games: [],
            user: {
              name: "",
              puuid: "",
              summonerLevel: 0
            }
        };
        this.searchUser = this.searchUser.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUser = this.getUser.bind(this);
        this.loadGames = this.loadGames.bind(this);
        this.getGameRows = this.getGameRows.bind(this);
        //this.getLeftTab = this.getLeftTab.bind(this);
        this.getParticipants = this.getParticipants.bind(this);
        this.findChampion = this.findChampion.bind(this);
        this.getGameBox = this.getGameBox.bind(this);
    }
    override componentDidMount() {
        //let t = this;
        $.get({
            url: '/api',
            data: {
                action: "onLoad"
            }, success: function (championsObj) {
                /*t.setState({
                    champions: championsObj,
                })*/
            }
        })
    }
    getUser(inputName: string, callback: (user: user) => any) {
        $.get({
            url: '/api',
            data: {
                action: "getUser",
                name: inputName
            },
            success: function (result) {
                if (result == "Error") {
                    callback(result);
                }
                //let user = JSON.parse(result);
                const user = result;
                console.log(user);
                callback(user);
            }
        })
    }
    loadGames(puuid: string, callback: (gameList: game[]) => any): void {
        $.ajax({
            type: "GET",
            url: "/api",
            data: {
                action: "getGames",
                puuid: puuid
            },
            success: function (result) {
                if (result == "Error") {
                    callback(result);
                }
                //let gameList = JSON.parse(result);
                const gameList = result;
                console.log(gameList);
                callback(gameList);
            }
        })
    }
    handleClick(e: any) {
        this.searchUser();
    }
    handleKeyDown(event: { key: string; }) {
        if (event.key == 'Enter') {
            this.searchUser();
        }
    }
    searchUser() {
        //let inputName = event.target.value
        const inputName:string = this.state.inputName;
        this.getUser(inputName,  (user: user) => {
            if (user) {
              let currentGames = [];
              this.loadGames(user.puuid,  (gameList: game[]) => {
                console.log(!gameList)  
                if (gameList && gameList.length > 0) {
                    currentGames = gameList;
                    console.log("ISWORKING!! !");
                    this.setState({
                        user: user,
                        name: user.name,
                        level: user.summonerLevel,
                        games: currentGames,
                    })
                  }
              });
            }
        });
    }
    handleChange(event: { target: { value: any; }; }) {
        this.setState({
            inputName: event.target.value
        });
    }
    getGameRows() {
        const games = this.state.games;

        const gameList: JSX.Element[] = []

        const gameArr = games ? _.sortBy(games, (game) => {
            return -game.info.gameCreation
        }) : [];
        console.log(games.length);
        for (const i in gameArr) {
            const game = gameArr[i];
            if (game !== undefined) {
                console.log("147");

                const participants = game.info.participants
                const user = _.find(participants, (x) => {
                    return x.summonerName === this.state.name;

                });
                const champion = user.championName;
                const gameDate = new Date(game.info.gameCreation).toLocaleDateString();
                const gameStats = <GameClass.GameStats
                    kda={((user.kills + user.assists) / user.deaths).toFixed(2)}
                    longkda={user.kills + "/" + user.deaths + "/" + user.assists}
                    score={4}
                />//user.kills + "/" + user.deaths + "/" + user.assists;
                const participantsComponent: JSX.Element = this.getParticipants(participants);
                const gameBox: JSX.Element = this.getGameBox(participantsComponent);
                const win = user.win? GameClass.Win.Win : GameClass.Win.Lose

                gameList[i] = <GameClass.GameFacade
                    key={i}
                    win={win}
                    gameBox={gameBox}
                    championIcon={champion}
                    gameStats={gameStats}
                    gameDate={gameDate}


                />;
            }
        }
        return <ol className="gameList">{gameList}</ol>;
    }
    getGameBox(participantsComponent: any) {
        return <GameClass.Game
        participantsComponent={participantsComponent}
         />
    }
    getParticipants(participants: { [x: string]: any; }) {
        let team1: any[] = [];
        let team2: any[]  = [];
        for (const p in participants) {
            const player = participants[p];
            player.teamId == '100'
                ? team1.push(player)
                : team2.push(player);
        }
        team1 = _.map(team1, (p) => {
            return <GameClass.Participant
                side={GameClass.Side.Left}
                key={p.summonerName}
                summonerName={p.summonerName}
                championIcon={p.championName}
            />
        });
        team2 = _.map(team2, (p) => {
            return <GameClass.Participant
                side={GameClass.Side.Right}
                key={p.summonerName}
                summonerName={p.summonerName}
                championIcon={p.championName}
            />
        });
        return (
            <div>
                <GameClass.ParticipantList
                    team1={team1}
                    team2={team2}
                />
            </div>
        )

    }
    findChampion() {
        console.log("X");
    }
    override render() {

        return (
            <div className="contentBox">
                <header id="header">LOLPal{/*
                    <div htmlFor="summoner_name_input" id="summoner_name_input_label">Enter your summoner name</div>*/}
                    <input id="summoner_name_input" name="summonerNameInput" placeholder="Search for a player..." onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.handleClick}>
                        <Link to={"banana"}></Link>
                        Search
                    </button>
                    
                </header>
                <Outlet/>
                {this.getGameRows()}
            </div>
        );
    }
}

export default App;
