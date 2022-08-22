export class Contato {
    private _nome : string;
    private _telefone : number;

    constructor(nome : string, telefone : number){
        this._nome = nome;
        this._telefone = telefone;
    }

    public get nome() : string{
        return this._nome;
    }

    public get telefone () : number{
        return this._telefone;
    }

    public set nome(nome : string){
        this._nome = nome;
    }

    public set telefone(telefone : number){
        this._telefone = telefone;
    }
}

