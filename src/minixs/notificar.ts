import { TipoNotificacao } from "@/interfaces/INotificaco"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/mutacoes"

export const notificacaoMixin = {
    methods: { notificar( tipo: TipoNotificacao, titulo: string, texto: string): void{
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }}
}