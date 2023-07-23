import { Model, Schema, model, models } from "mongoose";
import { IGameServer } from "@/interfaces";
import { hostings, attacks } from "@/utils";

const GameServerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    urlWebsite: { type: String, required: true, unique: true },
    host: {
        type: String,
        required: true,
        enum: {
            values: hostings,
            message: '{VALUE} Invalid host'
        }
    },
    vulnerabilities: [{
        type: String,
        enum: {
            values: attacks
            , message: '{VALUE} Invalid vuln'
        }
    }],
    game: {
        type: String,
        enum: {
            values: ['Mu Online', 'Cabal Online', 'Lineage 2', 'World of Warcraft', 'Aion Online'],
            message: '{VALUE} Invalid server'
        }
    },
    posted: {
        type: String,
        default: 'pending',
        enum: {
            values: ['posted', 'pending']
        }
    }
}, {
    timestamps: true
})

const GameServer: Model<IGameServer> = models.GameServer || model('GameServer', GameServerSchema);

export default GameServer;