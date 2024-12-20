export enum RoleEnum {
    Top = '탑',
    Jungle = '정글',
    Mid = '미드',
    ADCarry = '원딜',
    Support = '서폿'
}

export type Teams = 'team1' | 'team2'

export interface User {
    player: string;
    role: RoleEnum;
}

export interface TeamRoles {
    team1: User[];
    team2: User[];
}

export interface SameBalancePlayers {
    player1: string;
    player2: string;
}