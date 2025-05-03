import { Avatar, InitialAvatar } from "./avatar";

export interface Players {
    P1: Avatar;
    P2: Avatar;
}

export const InitialPlayers: Players = {
    P1: InitialAvatar("P1"),
    P2: InitialAvatar("P2")
}

