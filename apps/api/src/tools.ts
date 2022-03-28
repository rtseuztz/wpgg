//var sqlFile = require('./sql');
//var sql = require('mssql');
import _ = require('lodash');
import needle = require('needle');
//var tar = require('tar-stream');
//var fs = require('fs');
//var zlib = require('zlib');
import path = require('path');
//var NodeCache = require('node-cache');
//var JSONStream = require('JSONStream');
//var es = require('event-stream');
//var loadJsonFile = require('load-json-file');
//var { loadJsonFile } = require('load-json-file');
const key: string = process.env.API_KEY;
console.log(key);
const t = {
    processGet: async function (req: Req) {
        const query: Query = req.query
    switch (query.action) {
            case "getUser":
                return this.getUser(query);
            case "getGames":
                return this.getGamesNew(query);
            case "onLoad":
                return this.onLoad();
            default:
                return "";
        }
    },
    getUser: function (query: Query) {
        const name = query.name;
        const queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + key;
        return new Promise(function (resolve, reject) {
            needle.get(queryString, function (error, res) {
                if (error || res.statusCode != 200) {
                    resolve("");
                } else {
                    resolve(res.body);
                }
            })
        })
    },
    getGamesNew: async function (query: Query) {
        const gameArr = await getGameIDs(query)
            .then(idList => getGamesInfo(idList))
            .then((gameList) => {
                return gameList
            })
            .catch(val => {
                console.log(val);
                return "";
            })
        return gameArr;
    },
    onLoad: function () {
        //sqlFile.requireSql([sql]);
        //sqlFile.connectSql();
    }
}
export {t}
async function Get(queryString:string): Promise<object> {
    return needle('get', queryString)
        .then(res => {
            return res.body;
        })
        .catch(res => {
            return "";
        })
}
async function getGameInfo(gameID: string): Promise<object> {
    const queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + gameID + "?api_key=" + key;
    return needle('get', queryString)
        .then(async res => {
            if (res.statusCode != 200) {
                /*await delay(5000); //THIS DOES NOT WORK!
                return getGameInfo(gameID)*/
                return ""
            }
            else {
                return res.body;
            }
        })
        .catch(res => {
            return "";
        })
}
/*
 * Retrieve a list of gameIDs
 */
function getGameIDs(query: Query) {
    const puuid = query.puuid;
    const queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=19&api_key=" + key;
    return Get(queryString);
}
async function getGamesInfo(idList) {
    const promiseList = [];
    let newGameArr = [];
    for (const i in idList) {
        const gameID = idList[i];
        const newGame = getGameInfo(gameID)
            .then(game => {
                return game;
            })
        promiseList.push(newGame);
    }
    newGameArr = await Promise.all(promiseList);
    newGameArr = _.filter(newGameArr, (game) => {
        return game != "";
    })
    return newGameArr;
}
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*----------Objects--------*/

//tools
export interface Req {
    query: Query
}
export interface Query {
    action: string;
    name?: string;
    puuid?: string;
}