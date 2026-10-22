export class CredencialesDTO{
    constructor(data = {}){
        this.username = String(data.username ?? "");
        this.password = String(data.password ?? "");
    // Descarta cualquier intento de inyección como admin: true o role: "root".
    };
};

export class PerfilcazadorDTO{
    constructor(cazador={}){
        this.id=String(cazador.id ?? cazador.id ?? "");
        this.username= cazador.username;
        this.name=cazador.name;
        this.rango = cazador.rango ?? "B";
        this.admin = Boolean (cazador.admin ?? false)
    };
        // Nunca expone el campo password en las respuestas JSON.
};

export class CrearRecompensasDTO{
    constructor(data={}){
        this.mision = String(cazador.mision ?? "").trim();
        this.cristales=Number(data.cristales ?? 0);
    };
};