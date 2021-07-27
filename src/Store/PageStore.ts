import { PersonInfo, TeamInfo } from "../Model/PageModel";
import { action, computed, makeObservable, observable } from 'mobx';

export class PageStore {

    @observable public loadingStauts: boolean = false;
    @observable public infoArray: PersonInfo[] = new Array<PersonInfo>();;

    constructor() {
        makeObservable(this);
    }

    @computed
    get getTeamInfoArr(): TeamInfo[] {
        let teamInfoArray: TeamInfo[] = new Array<TeamInfo>();
        let teamInfoMap: Map<String, PersonInfo[]> = new Map();
        this.infoArray.forEach((personInfo) => {
            if (!teamInfoMap.has(personInfo.Team)) {
                teamInfoMap.set(personInfo.Team, new Array<PersonInfo>());
            }
            teamInfoMap.get(personInfo.Team)?.push(personInfo);
        });

        teamInfoMap.forEach((personArr, teamName) => {
            teamInfoArray.push({
                TeamName: teamName.toString(), 
                Persons: personArr
            });
        });
        return teamInfoArray;
    }

    @action
    public async queryData() {
        let [result1] = await Promise.all([this.queryPersonInfo()]);
        this.loadingStauts = true;
        return result1;
    }

    @action
    public async queryPersonInfo() {
        const result = {isSucceed: true, errorInfo: ""};
        try {
            this.infoArray = [
                {"Name": "Tom", "Team": "Tom & Jerry", "Sex": "male"},
                {"Name": "Lei Li", "Team": "English Learning", "Sex": "male"},
                {"Name": "Meimei Han", "Team": "English Learning", "Sex": "female"},
                {"Name": "Jerry", "Team": "Tom & Jerry", "Sex": "male"}
            ];
        } catch (e) {
            result.isSucceed = false;
            result.errorInfo = e.toString();
        }
        return result;
    }


}