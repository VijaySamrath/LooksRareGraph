import { Transfer, User, Ask, Bid} from "../generated/schema";
import { OwnershipTransferred, RoyaltyPayment, TakerBid, TakerAsk} from "../generated/Transfer/LooksRare";

export function handleTransfer(event: OwnershipTransferred) : void{
    let transfer = Transfer.load(event.transaction.hash.toHex());
    if(transfer == null){
        transfer = new Transfer(event.transaction.hash.toHex());
    }
    transfer.block = event.block.number;
    transfer.previousOwner = event.params.previousOwner.toHex();
    transfer.newOwner = event.params.newOwner.toHex();

    transfer.save();
}

export function handleRoyalty(event: RoyaltyPayment) : void{
    let royalty = User.load(event.transaction.hash.toHex());
    if(royalty == null){
        royalty = new User(event.transaction.hash.toHex());
    }
    royalty.block = event.block.number;
    royalty.collection = event.params.collection.toHex();
    royalty.tokenId = event.params.tokenId;
    royalty.royaltyRecipient = event.params.royaltyRecipient.toHex();
    royalty.amount = event.params.amount;

    royalty.save();
}

export function handleTakerAsk(event: TakerAsk) : void{
    let takerAsk = Ask.load(event.transaction.hash.toHex());
    if(takerAsk == null){
        takerAsk = new Ask(event.transaction.hash.toHex());
    }
    takerAsk.block = event.block.number;
    takerAsk.taker = event.params.taker.toHex();
    takerAsk.maker = event.params.maker.toHex();
    takerAsk.strategy = event.params.strategy.toHex();

    takerAsk.save();
}


export function handleTakerBid(event: TakerBid) : void{
    let takerBid = Bid.load(event.transaction.hash.toHex());
    if(takerBid == null){
        takerBid = new Bid(event.transaction.hash.toHex());
    }
    takerBid.block = event.block.number;
    takerBid.taker = event.params.taker.toHex();
    takerBid.maker = event.params.maker.toHex();
    takerBid.strategy = event.params.strategy.toHex();

    takerBid.save();
}