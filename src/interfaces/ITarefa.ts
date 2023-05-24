import IProjetos from "./IProjeto";

export default interface ITarefa{
    descricao: string,
    duracaoEmSegundos: number,
    projeto: IProjetos,
    id: number
}