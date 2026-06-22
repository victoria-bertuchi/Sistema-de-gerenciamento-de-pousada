import mongoose, {Schema, Document} from "mongoose";

//Interface para reconhecer o formato do dado
export interface IUsuario extends Document{
    nome: string;
    email: string;
    senha: string;
    cargo: 'administrador'|'funcionario';
}

//Schema com as regras do banco
const UsuarioSchema: Schema = new Schema ({
    nome:{type: String, required: [true, 'O nome de usuário é obrigatório']},
    email:{type:String, required: [true, 'O e-mail é obrigatório'], unique:true},
    senha:{type: String, required: [true, 'A senha é obrigatória']},
    cargo:{type: String, enum:['administrador', 'funcionario'], required:[true, 'O cargo deve ser administrador ou funcionário']}
}, {
    timestamps: true //cria automaticamente datas de createdAT e updatedAt
});

//mongoose cria uma coleção chamada usuários
export default 
mongoose.model<IUsuario>('Usuario', UsuarioSchema);