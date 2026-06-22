import mongoose, {Schema, Document } from "mongoose";

export interface IEscala extends Document{
    funcionario: mongoose.Types.ObjectId; //conecta com o ID do usuario 
    data_turno: Date;
    quartos_limpeza: mongoose.Types.ObjectId[]; //lista de quarto q ira limpar
}

const EscalaSchema: Schema = new Schema(
    {
        funcionario: {type:Schema.Types.ObjectId, ref:'Usuario', required: true },
        data:{type:Date, required:true},
        quartos_limpeza:[{type:Schema.Types.ObjectId, ref:'Quarto'}]
    },
    {timestamps: true}
);

export default mongoose.model<IEscala>('Escala', EscalaSchema);