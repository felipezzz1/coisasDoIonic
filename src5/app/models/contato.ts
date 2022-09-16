export class Contato {
    private _id : string;
    private _nome : string;
    private _telefone : number;
    private _genero : string;
    private _dataNascimento : string;

    constructor(nome : string, telefone : number, genero : string, dataNascimento : string){
        this._nome = nome;
        this._telefone = telefone;
        this._genero = genero;
        this._dataNascimento = dataNascimento;
    }

    public get id() : string{
        return this._id;
    }

    public get nome() : string{
        return this._nome;
    }

    public get telefone () : number{
        return this._telefone;
    }

    public get genero() : string{
        return this._genero;
    }

    public get dataNascimento() : string{
        return this._dataNascimento;
    }

    public set nome(nome : string){
        this._nome = nome;
    }

    public set telefone(telefone : number){
        this._telefone = telefone;
    }

    public set genero(genero : string){
        this._genero = genero;
    }

    public set dataNascimento(dataNascimento : string){
        this._dataNascimento = dataNascimento;
    }
}

