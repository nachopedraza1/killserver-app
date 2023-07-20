import { Model, Schema, model, models } from "mongoose";
import { IGameServer } from "@/interfaces";

const GameServerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    urlWebsite: { type: String, required: true, unique: true },
    vulnerabilities: {
        type: String,
        enum: {
            values: ['Cross-site request', 'Cross-site scripting', 'SQLI', 'DDOS', 'Loggin Buffer']
        }
    },
    game: {
        type: String,
        enum: {
            values: ['Mu Online', 'Cabal Online', 'Lineage 2', 'World of Warcraft', 'Aion Online'],
            message: '{VALUE} No es un Server válido.'
        }
    }
}, {
    timestamps: true
})

const GameServer: Model<IGameServer> = models.GameServer || model('GameServer', GameServerSchema);

export default GameServer;