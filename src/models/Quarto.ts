import mongoose,{Schema, Document}  from "mongoose";

export interface IQuarto extends Document{
    numero:string;
    preco:number;
    capacidade_maxima: number;
    status:'disponivel'| 'ocupado' | 'aguardando_limpeza';
}

const QuartoSchema: Schema = new Schema(
    {
        numero:{type: String, required: true, unique: true},
        preco:{type: Number, required: true},
        capacidade_maxima:{type:Number, required:true },
        status:{
            type:String,
            enum:['disponivel', 'ocupado', 'aguardando_limpeza' ], default: 'disponivel'
        }
    }, 
    {timestamps: true}
);

export default mongoose.model<IQuarto>('Quarto', QuartoSchema);