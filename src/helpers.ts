import { Bytes } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";

export function createUser(address: Bytes): void {
    let userAddress = address.toHexString();

    let user = User.load(userAddress);

    if (user == null) {
        user = new User(userAddress);
        user.address = address;
        user.save();
    }
}
