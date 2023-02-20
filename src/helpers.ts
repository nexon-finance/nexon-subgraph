import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { State, User } from "../generated/schema";

export function createUser(address: Bytes): void {
    let userAddress = address.toHexString();

    let user = User.load(userAddress);

    if (user == null) {
        user = new User(userAddress);
        user.address = address;
        user.save();

        let state = State.load("state");
        if (state == null) {
            state = initalizeState();
        }
        state.totalAddresses = state.totalAddresses
            .plus(BigInt.fromI32(1));
        state.save();
    }
}

export function addTransaction(): void {
    let state = State.load("state");
    if (state == null) {
        state = initalizeState();
    }
    state.totalTransactions = state.totalTransactions
        .plus(BigInt.fromI32(1));
    state.save();
}

function initalizeState(): State {
    let state = new State("state");
    state.totalAddresses = BigInt.fromI32(0);
    state.totalTransactions = BigInt.fromI32(0);
    return state;
}