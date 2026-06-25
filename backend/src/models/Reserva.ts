import mongoose, {Schema, Document} from 'mongoose';

export interface IReserva extends Document{
    quarto: mongoose.Types.ObjectId; //conecta com o ID do quarto
    numero_hospedes: number;
    data_entrada: Date;
    data_saida: Date; 
    valor_total:number;
}

const ReservaSchema: Schema = new Schema(
    {
        quarto:{type:Schema.Types.ObjectId, ref:'Quarto', required:true},
        numero_hospedes:{type: Number, required: true},
        data_entrada:{type:Date, required:true},
        data_saida:{type:Date, required:true},
        valor_total:{type:Number, default:0} //será calculado depois
    },
    {timestamps:true}

);

export default mongoose.model<IReserva>('Reserva', ReservaSchema);