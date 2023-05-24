import { TipoNotificacao } from "@/interfaces/INotificaco"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/mutacoes"

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto:string)=>void
}

export default ( ): Notificador =>{
   const notificar =  ( tipo: TipoNotificacao, titulo: string, texto: string): void =>{
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }
    return {
        notificar
    }
}